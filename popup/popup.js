// Popup: upload file (<=500KB) + target picker + convert
// Excel -> upload to server, poll, fetch `questions`, download xlsx
// Other targets -> open examparser.com (no suffix)
const TARGETS = ['Excel', 'Google Form', 'CSV', 'Canvas', 'Moodle', 'Blackboard', 'Brightspace', 'Kahoot', 'Other'];
const DEFAULT_TARGET = 'Excel';
const DEFAULT_URL = 'https://examparser.com';
const API_BASE = 'https://web.examparser.com';
const MAX_SIZE = 500 * 1024; // 500KB
let selected = DEFAULT_TARGET;
let fileObj = null;

const trigger = document.getElementById('trigger');
const optionsEl = document.getElementById('options');
const currentEl = document.getElementById('current');
const fileInput = document.getElementById('file');
const fileNameEl = document.getElementById('fileName');
const msgEl = document.getElementById('msg');
const convertBtn = document.getElementById('convert');

const WEB_HINT = 'Large file? Use the web version at <a class="lnk" href="' + DEFAULT_URL + '" target="_blank" rel="noopener">' + DEFAULT_URL + '</a>';
const KEEP_OPEN = 'Keep this window open to receive results, or use the web version at <a class="lnk" href="' + DEFAULT_URL + '" target="_blank" rel="noopener">' + DEFAULT_URL + '</a>';

function setMsg(t, isErr) {
  msgEl.innerHTML = t || '';
  msgEl.className = 'hint' + (isErr ? ' err' : '');
}

function setBusy(b) {
  convertBtn.disabled = b;
  convertBtn.textContent = b ? 'Processing…' : 'Convert';
}

function renderOptions() {
  optionsEl.innerHTML = '';
  TARGETS.forEach((t) => {
    const div = document.createElement('div');
    div.className = 'option' + (t === selected ? ' sel' : '');
    div.innerHTML =
      `<span>${t}</span>` +
      `<svg class="tick" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`;
    div.addEventListener('click', () => {
      selected = t;
      currentEl.textContent = t;
      renderOptions();
      closeMenu();
    });
    optionsEl.appendChild(div);
  });
}

function openMenu() { trigger.classList.add('open'); optionsEl.classList.add('show'); }
function closeMenu() { trigger.classList.remove('open'); optionsEl.classList.remove('show'); }

trigger.addEventListener('click', (e) => {
  e.stopPropagation();
  optionsEl.classList.contains('show') ? closeMenu() : openMenu();
});
document.addEventListener('click', closeMenu);

fileInput.addEventListener('change', () => {
  const f = fileInput.files[0];
  if (!f) { fileObj = null; fileNameEl.textContent = 'Click to upload a file (txt, csv, xlsx, docx · ≤ 500KB)'; return; }
  if (f.size > MAX_SIZE) {
    fileObj = null;
    fileNameEl.textContent = 'Click to upload a file (txt, csv, xlsx, docx · ≤ 500KB)';
    setMsg(WEB_HINT, true);
    return;
  }
  fileObj = f;
  fileNameEl.textContent = f.name;
  setMsg('');
});

convertBtn.addEventListener('click', () => {
  if (selected !== 'Excel') {
    chrome.tabs.create({ url: DEFAULT_URL });
    return;
  }
  if (!fileObj) { setMsg('Please upload a file first', true); return; }
  if (fileObj.size > MAX_SIZE) { setMsg(WEB_HINT, true); return; }
  serverFlow(fileObj);
});

// ---------- backend flow: upload -> poll -> text -> excel ----------
async function serverFlow(file) {
  setBusy(true);
  setMsg('Uploading “' + file.name + '” …');
  const fd = new FormData();
  fd.append('file', file);
  fd.append('fmts', JSON.stringify(['canvas_qti']));
  let taskId;
  try {
    const r = await fetch(API_BASE + '/canvas/word', { method: 'POST', body: fd });
    const txt = await r.text();
    let body = {};
    try { body = JSON.parse(txt); } catch (e) {}
    if (!r.ok) throw new Error((body && body.error) ? body.error : ('HTTP ' + r.status));
    if (!body || !body.task_id) throw new Error('Backend did not return task_id');
    taskId = body.task_id;
  } catch (e) {
    setBusy(false);
    setMsg('Upload failed: ' + e.message, true);
    return;
  }
  pollStatus(taskId, file.name);
}

function pollStatus(taskId, fname) {
  let tries = 0;
  const maxTries = 360;
  let finished = false;
  let timer = null;
  function stop() { finished = true; if (timer) clearInterval(timer); setBusy(false); }
  async function check() {
    tries++;
    try {
      const r = await fetch(API_BASE + '/status/' + taskId, { cache: 'no-store' });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      let j = {};
      try { j = await r.json(); } catch (e) { throw new Error('bad-json:' + (await r.text()).slice(0, 160)); }
      const st = String(j.status || '').toLowerCase();
      if (st === 'processing' || st === 'pending') {
        const prog = (st === 'pending' && j.progress != null) ? (' · ' + j.progress + '%') : '';
        setMsg(KEEP_OPEN + ' (' + tries + ' min elapsed' + prog + ')');
        if (tries >= maxTries) { stop(); setMsg('Processing timed out. Please retry later.', true); }
        return;
      }
      if (st === 'failed' || st === 'error') { stop(); setMsg('Parsing failed: ' + (j.error || 'unknown error'), true); return; }
      if (st === 'done') {
        const d = j.data || {};
        const qs = Array.isArray(d.questions) ? d.questions
                 : Array.isArray(d.text) ? d.text
                 : Array.isArray(d.xhtml) ? d.xhtml : null;
        if (!qs || !qs.length) { stop(); setMsg('No questions detected.', true); return; }
        const base = (d.filename ? d.filename : (fname || 'examparser')).replace(/\.docx$/i, '') || 'examparser';
        stop();
        buildAndDownloadExcel(base, qs);
        setMsg('Excel ready (' + qs.length + ' questions), downloading…');
        return;
      }
      // unrecognized status: surface the raw value for diagnosis
      stop();
      setMsg('Unexpected status: “' + j.status + '”. ' + KEEP_OPEN, true);
    } catch (err) {
      if (/^HTTP /.test(err.message)) { stop(); setMsg('Server error: ' + err.message, true); return; }
      if (/^bad-json:/.test(err.message)) { stop(); setMsg('Bad server response: ' + err.message.replace('bad-json:', ''), true); return; }
      // transient network blip: keep polling
      setMsg(KEEP_OPEN + ' (' + tries + ' min elapsed)');
    }
  }
  check();
  timer = setInterval(check, 60000);
}

function stripTextMarkers(s) {
  return (s == null ? '' : String(s)).replace(/\[\[[^\]]*\]\]/g, '');
}

function textRows(questions) {
  const header = ['Question Type', 'Question', 'Option A', 'Option B', 'Option C', 'Option D', 'Option E', 'Correct Answer'];
  const rows = [header];
  (questions || []).forEach((q) => {
    if (typeof q === 'string') {
      rows.push(['', stripTextMarkers(q), '', '', '', '', '', '']);
      return;
    }
    if (q && typeof q === 'object') {
      const opts = ['A', 'B', 'C', 'D', 'E'].map((L) => stripTextMarkers(q[L]));
      const ans = (Array.isArray(q.answer) ? q.answer : (q.answer != null ? [q.answer] : [])).join(',');
      rows.push([
        q.type != null ? q.type : '',
        stripTextMarkers(q.stem != null ? q.stem : q.question),
        opts[0], opts[1], opts[2], opts[3], opts[4],
        ans
      ]);
      return;
    }
    rows.push([String(q), '', '', '', '', '', '', '']);
  });
  return rows;
}

function bufToBase64(buf) {
  const bytes = new Uint8Array(buf);
  let bin = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
  }
  return 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + btoa(bin);
}

function buildAndDownloadExcel(baseName, questions) {
  const rows = textRows(questions);
  const ws = XLSX.utils.aoa_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Questions');
  const buf = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });
  const dataUrl = bufToBase64(buf);
  chrome.downloads.download(
    { url: dataUrl, filename: baseName + '-examparser.xlsx', saveAs: false },
    () => {
      if (chrome.runtime.lastError) {
        setMsg('Download blocked by Chrome: ' + chrome.runtime.lastError.message + '. ' + WEB_HINT, true);
      }
    }
  );
}

renderOptions();
