# Traxn — Landing site

Public marketing site at [traxn.in](https://traxn.in) for the Traxn product
family. The **TraxnCargo** product landing lives at
[traxn.in/cargo](https://traxn.in/cargo).

## Routes
| URL | File | Purpose |
| --- | --- | --- |
| `/` | `index.html` | Tiny landing shell — redirects to `/cargo`. Reserved for a future master Traxn page. |
| `/cargo` | `cargo/index.html` | **TraxnCargo** product landing (hero, modules, "see inside" mockups, use cases, differentiation, demo modal). |
| `/assets/*` | `assets/` | Shared static assets — logo, favicon. |

## Stack
Single-file static HTML per route, Tailwind via CDN. No build step. Modal
submits straight to Firestore (`cargologic-saas → /leads`) via the Firebase
JS modular CDN; Super Admin sees new leads live.

## Deploy
Vercel auto-deploys `main`. Domains `traxn.in` + `www.traxn.in` attach to
this project; root requests redirect to `/cargo`.

## Preview locally
```sh
python3 -m http.server -d . 8000
# /          -> redirect to /cargo
# /cargo     -> product landing
```

## Edit
- TraxnCargo product page: `cargo/index.html` — sections commented
  (NAV · HERO · TRUST STRIP · MODULES · SEE INSIDE · USE CASES · DIFFERENTIATION · CTA · FOOTER).
- Logo / favicon: `assets/`.
