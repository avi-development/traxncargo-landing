# TraxnCargo — Landing Page

The marketing landing page for **TraxnCargo** (the app at [app.traxn.in](https://app.traxn.in)),
served at [traxn.in](https://traxn.in).

## Stack
Single self-contained static `index.html` with Tailwind via CDN. No build step,
no dependencies. Drop the file on any static host.

## Deploy to Vercel
1. **vercel.com → Add New → Project → Import** `avi-development/traxncargo-landing`.
2. Framework preset: **Other** (Vercel auto-detects static).
3. Deploy.
4. In **Project Settings → Domains**, add `traxn.in` and `www.traxn.in`. Because
   your DNS lives at Vercel they auto-configure.

## Edit
Open `index.html`. Sections are commented:
- NAV · HERO · TRUST STRIP · MODULES · USE CASES · DIFFERENTIATION · CTA · FOOTER

To preview locally: `python3 -m http.server 8000` and open `http://localhost:8000`.
