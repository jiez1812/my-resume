# My Resume

A JSON-driven resume web app built with Next.js, React, TypeScript, and Tailwind CSS.

The resume content lives in `data/data.json`, so most updates do not require editing React components. Update the JSON file, run the app, and the website renders the latest resume sections automatically.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- pnpm

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Updating Resume Data

Edit the resume content in:

```text
data/data.json
```

The JSON structure is typed in:

```text
app/types/resume.ts
```

Main sections:

- `basics`: name, title, contact details, summary, location, and social profiles
- `work`: professional experience timeline
- `education`: academic history
- `skills`: grouped technical and professional skills
- `projects`: project highlights
- `certificates`: certifications
- `languages`: spoken languages and fluency

Dates should generally use `YYYY-MM-DD`. For a current role, `endDate` can be set to `Present`.

Some text fields support simple markdown-style bold text, for example:

```json
"**Key Achievement:** Built an internal application from scratch."
```

## Project Structure

```text
app/
  components/          Reusable resume UI sections
  lib/                 Formatting and markdown helpers
  types/resume.ts      TypeScript types for resume data
  page.tsx             Main page that loads data/data.json
data/
  data.json            Resume content source
public/
  static assets
```

## Available Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
```

## Build

Create a production build:

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```

## Printing

The app includes a print-friendly resume view and a floating print/download button. Use the browser print dialog to save the resume as a PDF.
