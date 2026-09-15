# Question Backend

A production-ready internal question-bank CMS for Excel/CSV question backend data.

## Features

- Excel/CSV upload (`.xlsx`, `.xls`, `.csv`) using SheetJS + PapaParse
- JSON-aware normalization for `content`, `solutions`, `bilingual_options`, `video_urls`, and related fields
- Graceful malformed JSON handling: row retained + warning surfaced
- Global search across QBG ID, English/Hindi question, subject, chapter, topic, subtopic, category, exam, and QCM tag
- Advanced multi-filters with active chips and date filtering
- Question database table with paging, copy QBG ID, and detail route `/questions/[unique_id]`
- Full English/Hindi question, options, answers, solutions, video links, and metadata
- HTML sanitization before rendering
- Dashboard KPIs and Recharts analytics
- Data-quality checks
- Excel export of current filtered results
- Dark mode + responsive layout
- Local/browser mode when Supabase is not configured
- Optional Supabase/PostgreSQL schema + secure server-side import endpoint

## Stack

Next.js 16.3.5, TypeScript, Tailwind CSS, shadcn/ui-compatible components, Lucide, TanStack Table dependency, Recharts, SheetJS, PapaParse, Supabase.

## Local setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000` and go to **Upload Data**.

## Environment variables

Copy `.env.example` to `.env.local`.

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_NAME=Question Backend
```

The app runs in local browser mode without Supabase variables.

## Supabase setup

1. Create a Supabase project.
2. Run [`supabase/schema.sql`](./supabase/schema.sql) in the SQL editor.
3. Add the URL and anon key to the environment.
4. Add the service-role key **only** to the server environment on Vercel. Never expose it client-side.
5. The secure endpoint `POST /api/import` accepts normalized rows and upserts on `unique_id`.

For enterprise/internal authentication, add Supabase Auth and replace the example RLS policies with your organization's authenticated/team policies.

## Import workflow

Upload → parse headers → normalize fields → validate → preview → import.

The first worksheet is parsed for Excel files. CSV parsing uses headers. Missing/null/blank values are preserved as empty normalized fields rather than causing crashes.

## Large datasets

The local browser mode is designed for development/testing. For 10k–100k+ questions, use Supabase/PostgreSQL and move search/pagination to server-side queries. The schema includes indexes for the primary filter fields plus a search GIN index. The UI already pages the visible table rather than rendering the full dataset at once.

## Vercel deployment

1. Push this folder to GitHub.
2. Import the repo into Vercel.
3. Add production environment variables.
4. Build command: `npm run build`.
5. Deploy.

No hardcoded secrets or localhost dependencies are used.

## GitHub

```bash
git init
git add .
git commit -m "Build Question Backend CMS"
git branch -M main
git remote add origin <YOUR_REPO_URL>
git push -u origin main
```

## Notes

The supplied composer attachment contains the implementation specification, not the raw Excel/CSV question bank itself. The app therefore starts empty and is ready to ingest the actual dataset through Upload Data.
