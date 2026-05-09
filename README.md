# My Resume

A JSON-driven resume web app built with Next.js, React, TypeScript, and Tailwind CSS.

The resume content lives in `data/data.json`, so most updates do not require editing React components. Update the JSON file, run the app, and the website renders the latest resume sections automatically.

## Slug system — multiple tailored resumes

Each slug maps a URL path to a separate JSON file, so you can maintain one resume per company or role:

| URL | Data file | Env var (production) |
|-----|-----------|----------------------|
| `/` | `data/data.json` | `RESUME_DATA` |
| `/<slug>` | `data/<slug>.json` | `RESUME_DATA_<SLUG>` |

For example, a resume tailored for Google lives at `/google`, backed by `data/google.json` locally or the `RESUME_DATA_GOOGLE` environment variable on Vercel.

### Creating a new slug

1. Copy the commented template:
   ```bash
   cp data/slug.example.json data/<your-slug>.json
   ```
2. Replace all placeholder values with real content. The file contains inline `"//"` comments explaining every field.
3. Start the dev server — the route is available immediately at `http://localhost:3000/<your-slug>`.

Slug names must match `[a-zA-Z0-9_-]+` (letters, digits, hyphens, underscores only).

### Production (Vercel)

Resume JSON is injected at build time via environment variables — data files are never committed. Add one variable per slug in Vercel project settings:

- `RESUME_DATA` — main resume JSON
- `RESUME_DATA_<SLUG>` — per-slug JSON, uppercased (e.g. `RESUME_DATA_GOOGLE` → `/google`)

The prebuild script (`scripts/prebuild.js`) runs automatically before `next build` and writes each env var to the corresponding `data/*.json` file.

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
  [slug]/page.tsx      Dynamic route — serves data/<slug>.json at /<slug>
  components/          Reusable resume UI sections
  lib/                 Formatting and markdown helpers
  types/resume.ts      TypeScript types for resume data
  page.tsx             Main page that loads data/data.json
data/
  data.json            Main resume content (gitignored; use RESUME_DATA env var in prod)
  data.example.json    Commented template for the main resume
  slug.example.json    Commented template for any slug-specific resume
scripts/
  prebuild.js          Writes env var JSON to data/*.json before build
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
