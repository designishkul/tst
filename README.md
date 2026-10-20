# Designishkul — Netlify Portfolio with Admin Dashboard

A clean, minimal portfolio site (light/dark toggle included) where **everything is editable**
from a dashboard at **`/admin`** — no code needed. Built with Decap CMS + Netlify Identity.

## What's inside
- `index.html`, `styles.css`, `app.js` — the website (content loads from `content.json`)
- `content.json` — ALL editable content: name, hero, stats, about, projects, services, contact, socials
- `admin/` — the dashboard (Decap CMS)
- `netlify.toml` — Netlify settings

## Deploy (one time, ~5 minutes)
The dashboard saves edits by committing to Git, so the site must be connected to a Git repo:

1. **GitHub:** create a free account at github.com → New repository → upload all files from this
   folder (keep the folder structure exactly as-is).
2. **Netlify:** netlify.com → "Add new site" → "Import an existing project" → connect GitHub →
   pick the repository → Deploy. (Build command: empty, Publish directory: `.` — already set
   in `netlify.toml`.)
3. **Turn on the dashboard login:** Netlify site → Site configuration → Identity → **Enable Identity**.
   Then Identity → Services → **Enable Git Gateway**.
4. **Create your login:** Identity tab → Invite users → invite your own email → accept the email
   invite and set a password.
5. **Edit everything:** go to `your-site.netlify.app/admin`, log in, edit any text, project,
   service, price or link → **Publish**. The live site updates in about a minute.

## Notes
- Drag-and-drop deploy on Netlify also works for viewing the site, but the dashboard can only
  save when the site is connected to Git (steps above).
- The light/dark toggle is in the header; each visitor's choice is remembered automatically.
- To add a project: Dashboard → Site Content → Projects → add item (title, subtitle,
  1-letter tile, Behance URL, appreciations) → Publish.
