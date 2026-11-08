# Convert PDF to Google Form, Canvas, Moodle & Excel — One Click (Open-Source Chrome Extension)

**Turn any PDF exam paper, worksheet, or questionnaire into a Google Form, Excel, Canvas, Moodle, and more — with a single click.**

[ExamParser](https://examparser.com) is a free, open-source browser extension that converts PDF and other files into the format you actually need. No copy-pasting. No retyping. No paid subscription.

> 🔗 **Convert PDF to Google Form online:** <https://examparser.com/en/googleform_pdf/>  
> 🔗 **All export formats & platforms (Excel, Canvas, Moodle, and more):** <https://examparser.com>

---

## Table of Contents

- [What it does](#what-it-does)
- [Why this exists](#why-this-exists)
- [Key features](#key-features)
- [Install the extension](#install-the-extension)
- [How to use](#how-to-use)
- [Supported input files](#supported-input-files)
- [Supported export platforms](#supported-export-platforms)
- [Try the Google Form converter in your browser](#try-the-google-form-converter-in-your-browser)
- [How it works](#how-it-works)
- [Privacy & data safety](#privacy--data-safety)
- [FAQ](#faq)
- [Contributing](#contributing)
- [License](#license)

---

## What it does

ExamParser solves one painful problem: **Google Forms has no built-in way to import a PDF.** Teachers, HR teams, and researchers are forced to retype every question by hand.

This extension reads your PDF (or Word / image / Excel file), detects each question, its options, and the answer key, then exports it to the platform you choose — **Google Form, Excel, Canvas, Moodle, and any other format you need** — in one click.

Core keyword, one sentence: **PDF to Google Form, Canvas, Moodle & Excel, converted in one click, for free.**

---

## Why this exists

- Google Forms does **not** support PDF import natively.
- Manual retyping of a 30-question test takes 1–2 hours.
- Scanned paper exams and locked PDFs make it even worse.
- Existing SaaS tools are expensive and lock your data in.

ExamParser is **open source** and **privacy-first**: your files are automatically deleted the moment conversion finishes — nothing is kept.

---

## Key features

- ⚡ **One-click conversion** — PDF → Google Form, Excel, Canvas, Moodle, and more.
- 📄 **PDF first** — handles digital PDFs, scanned PDFs (OCR), and fillable forms.
- 🧠 **Smart question detection** — multiple choice, checkboxes, short answer, true/false, grids.
- ✅ **Answer-key preservation** — quizzes keep correct answers and points for auto-grading.
- 🔒 **Privacy by design** — files are **deleted immediately after use** (用完立删); your data is never stored or reused.
- 💸 **Free** — no subscription, no paywall on core conversion.
- 🌐 **Multi-platform export** — Google Form, Excel, Canvas, Moodle, and any format you need.

---

## Install the extension

### Option A — One-click from the Chrome Web Store (recommended)

👉 **<https://chromewebstore.google.com/detail/examparser-document-to-qu/dclokolbphchjknanggfaljfjmbknbgn?hl=en-US\&utm_source=ext_sidebar>**

Click **Add to Chrome** and the extension is installed instantly — no code, no setup.

### Option B — Build from source (open-source)

This is an open-source project, so you can also pull the code and load it into Chrome yourself.

#### Prerequisites

- Google Chrome (or any Chromium-based browser: Edge, Brave, Arc)
- Git

#### Steps

```bash
# 1. Clone the repository to your local machine
git clone https://github.com/Nanshanelectrician/PDFs-to-Google-Forms.git

# 2. Enter the project directory
cd PDFs-to-Google-Forms
```

```text
# 3. Open Chrome and go to the extensions page
chrome://extensions

# 4. Enable "Developer mode" (toggle, top-right corner)

# 5. Click "Load unpacked"

# 6. Select the cloned folder (PDFs-to-Google-Forms/)

# 7. The ExamParser icon now appears in your toolbar — pin it for easy access
```

That's it. The extension is installed and ready to use. No build step required.

> 💡 **Tip:** After pulling updates with `git pull`, return to `chrome://extensions` and click the **reload** icon on the ExamParser card.

Source repository: <https://github.com/Nanshanelectrician/PDFs-to-Google-Forms/tree/main>

---

## How to use

1. Open a PDF exam, worksheet, or survey in your browser (or upload it via the extension popup).
2. Click the **ExamParser** toolbar icon.
3. Choose your target format — **Google Form, Excel, Canvas, Moodle, or any other platform you need**.
4. Review the detected questions (edit if needed).
5. Export. Your Google Form, Excel sheet, or LMS quiz is ready — and your source file is deleted right after.

---

## Supported input files

| Type               | Notes                                |
| ------------------ | ------------------------------------ |
| PDF (digital)      | Selectable text — highest accuracy   |
| PDF (scanned)      | OCR extracts questions from images   |
| PDF (fillable)     | AcroForm fields mapped automatically |
| Word (.docx)       | Common for teacher-made tests        |
| Images (.png/.jpg) | Photos of paper exams                |
| Excel (.xlsx)      | Question banks                       |

---

## Supported export platforms

ExamParser exports to **whatever format you need**, including:

- **Google Form** → <https://examparser.com/en/googleform_pdf/>
- **Excel** → spreadsheet with questions & answer keys
- **Canvas** → ready-to-import quiz
- **Moodle** → QTI / GIFT format
- **And more** → see all supported platforms: <https://examparser.com>

> One source file, many destinations. Convert once, export anywhere.

---

## Try the Google Form converter in your browser

Want to skip the install and convert a PDF to a Google Form right now?

👉 **<https://examparser.com/en/googleform_pdf/>**

Upload a PDF exam, click convert, and get an editable Google Form with questions, options, and answer keys — free.

For every other export format (Excel, Canvas, Moodle, and more), visit the main site:

👉 **<https://examparser.com>**

---

## How it works

1. **Upload** — you send the file through the extension or the web converter.
2. **Parse** — the server reads the file and extracts question structure (stem, options, answer key).
3. **Detect** — AI/OCR classifies each item into the right question type.
4. **Map** — questions are mapped to the target platform's schema (Google Forms fields, Canvas quiz objects, Moodle QTI, Excel rows).
5. **Export** — you download or push the result to the chosen platform.
6. **Delete** — the source file is **automatically deleted immediately after conversion** (用完立删).

---

## Privacy & data safety

Your privacy is the default, not an upsell:

- **用完立删** — files are erased the moment conversion completes; we never store or reuse your documents.
- **No training on your data** — your exam papers and questionnaires are not used to train any model.
- **Minimal footprint** — conversion is stateless; nothing persists after the job ends.

---

## FAQ

**Can Google Forms import a PDF directly?**  
No. Google Forms has no native PDF import. ExamParser bridges that gap — convert PDF to Google Form in one click: <https://examparser.com/en/googleform_pdf/>

**Is there a free way to convert PDF to Google Form?**  
Yes. ExamParser is free and open source. Install it from the Chrome Web Store or use the web converter at <https://examparser.com/en/googleform_pdf/>

**Can it convert a scanned PDF to Google Form?**  
Yes. Built-in OCR reads scanned and photographed paper exams, then rebuilds them as a Google Form.

**Does it export to Canvas and Moodle too?**  
Yes. Beyond Google Form and Excel, ExamParser exports to Canvas, Moodle, and any other format you need. See <https://examparser.com>

**Is my data safe?**  
Yes. Your files are **deleted immediately after use** (用完立删). We do not store, reuse, or train on your documents.

**How do I install the extension?**  
One click from the Chrome Web Store: <https://chromewebstore.google.com/detail/examparser-document-to-qu/dclokolbphchjknanggfaljfjmbknbgn?hl=en-US\&utm_source=ext_sidebar> — or clone the source at <https://github.com/Nanshanelectrician/PDFs-to-Google-Forms.git> and load it as an unpacked extension in `chrome://extensions` (Developer mode).

---

## Contributing

Pull requests are welcome.

1. Fork the repository
2. Create a branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -am 'Add feature'`)
4. Push (`git push origin feature/my-feature`)
5. Open a Pull Request

Please open an issue first for major changes.

---

## License

Released under the MIT License. Free for personal and commercial use.
