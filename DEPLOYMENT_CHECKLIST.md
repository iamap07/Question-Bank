# Deployment checklist

1. `npm install`
2. `npm run typecheck`
3. `npm run build`
4. Push to GitHub
5. Add Vercel environment variables from `.env.example`
6. Run `supabase/schema.sql`
7. Keep `SUPABASE_SERVICE_ROLE_KEY` server-only
8. Test Upload → Preview → Import → Search → Filters → `/questions/[id]` → Analytics → Export

The source brief uploaded for this build describes the application requirements; it does not contain the actual raw question Excel/CSV dataset. Upload the real file from the **Upload Data** screen.
