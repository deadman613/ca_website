# Delhi CA School

Website for Delhi CA School, with course, faculty, study resource, and blog pages
for CA aspirants.

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Site URL

Set `NEXT_PUBLIC_SITE_URL` to the canonical deployed URL (for example,
`https://your-domain.example`) in the deployment environment. This is used for
Open Graph metadata, `robots.txt`, and the generated sitemap. Until it is set,
the site does not publish a sitemap URL.

## Blog access and administration

The blog backend uses Prisma with PostgreSQL (the current project can use its
Supabase Postgres database). Supabase Auth remains the existing sign-in system.
Copy `env.example` to `.env.local` and set the Supabase project URL and anon
key, a **rotated** pooled PostgreSQL connection string as `DATABASE_URL`, a
rotated direct or session-pooled PostgreSQL connection string as `DIRECT_URL`,
the canonical site URL, and `BLOG_ADMIN_EMAIL`. For Supabase, use its pooler
connection strings from the dashboard; the transaction-pooler URL is for
`DATABASE_URL`, while the direct or session-pooler URL is for `DIRECT_URL`.
Keep both variables server-only and never use a `NEXT_PUBLIC_` prefix. Do not
reuse a database password or key that has been exposed.

1. Install dependencies and generate the Prisma client with `npm install` and
   `npm run db:generate`.
2. Apply the schema migration to the configured PostgreSQL database with
   `npm run db:migrate`.
3. Disable public sign-ups in Supabase Authentication settings. Provision
   member accounts and the configured admin account through Supabase; the site
   intentionally has no public registration form.
4. Import the existing articles with `npm run seed:blogs`.
5. Sign in at `/login`, then manage posts at `/admin/blogpanel`. Admin status is
   checked against the verified Supabase account email and `BLOG_ADMIN_EMAIL`.
   New posts default to Published and appear at `/blogs`; choose Draft or
   Scheduled when a post should not be published immediately.

The Prisma database connection is used only by server-side code. Blog metadata
and full article bodies are stored separately. Public visitors can read
published public posts; login-required article bodies are fetched only after a
valid Supabase user session is verified. Drafts and future scheduled posts are
hidden from regular visitors. Scheduled posts become visible at their publish
date without a browser-side check or background job.

After changing credentials or environment variables, restart the app.
