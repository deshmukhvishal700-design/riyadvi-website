# Riyadvi Software Technologies — Website Revamp

A full-stack, multi-page corporate website rebuild for Riyadvi Software Technologies, built as a
Full Stack Developer interview assignment. React (Vite) frontend with an interactive 3D hero and
scroll-driven storytelling, Django REST Framework backend, MySQL database.

---

## 1. Project overview

The goal was to position Riyadvi as a **technology & digital solutions partner** rather than a plain
software vendor — a dynamic, multi-page site (not a landing page) with real routing, reusable
templates for content that grows over time (services, portfolio, blog, careers), functional
lead-capture forms backed by a real database, and a premium, interactive visual language built
around the brand's gold (`#D4AF37`) and black palette.

## 2. Features

- **Homepage** — interactive 3D hero (rotating node-sphere built with React Three Fiber), a
  scroll-driven "Business Challenge → Growth" storytelling section (GSAP + ScrollTrigger), smooth
  scrolling site-wide (Lenis), and a services preview.
- **Services** — 6 services, each rendered from **one reusable template** (`/services/:slug`) driven
  by a single data source — adding a 7th service means adding a data entry, not a new page.
- **Portfolio** — 10 case studies, same reusable-template pattern (`/portfolio/:slug`), including a
  flag for case studies that get an interactive/3D presentation treatment.
- **Blog** — featured article, category filter, search, individual article pages, related articles —
  architecture is intentionally content-as-data so it can be swapped for a real CMS/API later
  without touching the page components.
- **Careers** — job listings pulled live from the Django API, with department filtering, individual
  job pages, and a working application form with **resume file upload**.
- **About** — company story, vision, mission, values, and a scroll-animated milestone timeline.
- **Contact / Business Health Checkup / Software Project Planning Guide** — three real,
  backend-connected lead-capture forms (not fake forms): a standard contact form, a 5-step
  multi-step health-checkup form, and a lead-magnet download form.
- **Admin dashboard** — Django's built-in admin, customized with list filters, search, and readonly
  timestamps, covering every lead type plus jobs/applications — this is the "basic admin dashboard"
  requirement.

## 3. Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 19 (Vite), React Router, Tailwind CSS v4 |
| 3D | React Three Fiber + Three.js (custom node-sphere hero) |
| Animation | GSAP + ScrollTrigger, Lenis (smooth scroll) |
| Backend | Django 5.1 + Django REST Framework |
| Database | MySQL |
| HTTP client | Axios |
| Deployment (planned) | Vercel (frontend), Render/Railway (backend) |

## 4. Installation instructions

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux
pip install -r requirements.txt
```

Create a MySQL database:

```sql
CREATE DATABASE riyadvi_db CHARACTER SET utf8mb4;
```

Copy `.env.example` to `.env` and fill in your real values (see Environment Variables below), then:

```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Backend runs at `http://127.0.0.1:8000/`. Admin at `/admin/`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173/` (Vite will pick the next free port if that one's busy —
check the terminal output and make sure it matches `CORS_ALLOWED_ORIGINS` in the backend `.env`).

## 5. Environment variables

**`backend/.env`**

```
SECRET_KEY=your-django-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

DB_NAME=riyadvi_db
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
DB_PORT=3306

CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

**`frontend/.env`**

```
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

## 6. Database setup

MySQL, `riyadvi_db`, `utf8mb4` charset. Django apps and what they own:

- **`leads`** — `ContactEnquiry`, `ConsultationRequest`, `HealthCheckupLead`, `LeadMagnetLead`
- **`careers`** — `Job`, `Application` (with resume file upload)
- **`content`** — reserved for moving Services/Portfolio/Blog from static data files into the
  database via API, without a frontend rewrite (see Future Improvements)

Run `python manage.py migrate` after configuring `.env` to create all tables.

## 7. API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/contact/` | Contact form submission |
| POST | `/api/consultation/` | Consultation request |
| POST | `/api/health-checkup/` | Business Health Checkup submission |
| POST | `/api/lead-magnet/` | Project Planning Guide download lead |
| GET | `/api/careers/jobs/` | List active jobs (supports `?department=` and `?experience_level=`) |
| GET | `/api/careers/jobs/<slug>/` | Single job detail |
| POST | `/api/careers/applications/` | Submit a job application (multipart, includes resume) |

All POST endpoints validate input via DRF serializers and return a consistent
`{ success, message, data }` shape on `201`, or field-level errors on `400`. Anonymous requests are
throttled to 30/minute per endpoint to guard against spam submissions.

## 8. AI tools used

This project was built with **Claude (Anthropic)** as the primary AI development partner, used
conversationally throughout the build rather than as a one-shot generator — plans and code were
reviewed, tested, and debugged interactively at each stage.

**Tool:** Claude
**Purpose:** Full-stack scaffolding, backend architecture (models/serializers/views), the 3D hero
component, GSAP scroll animations, and debugging real setup errors as they came up (Django version
mismatches, MySQL auth errors, CORS misconfiguration, `.env` parsing issues).

**Example prompts used:**
- *"Recommend a 3D approach for the hero given a 3–5 day window — balance effort against the
  evaluation weight."*
- *"Build the Django models for ContactEnquiry, ConsultationRequest, HealthCheckupLead, and
  LeadMagnetLead, plus serializers, views, and admin registration."*
- *"Build an interactive digital sphere for the hero using React Three Fiber — nodes connected by
  lines, reacts to cursor movement, with a static/reduced-motion fallback for mobile."*
- *"CORS is blocking the contact form submission — here's the browser console error, what's wrong?"*

**What was generated:** Initial Django app structure (`leads`, `careers`, `content`), model/
serializer/view/admin code, the React Router route tree, the `TechSphere`/`Hero3D` 3D components,
the GSAP ScrollTrigger-driven transformation section, and the multi-step health-checkup form logic.

**What was manually changed/verified:** Every piece of generated code was run and tested end-to-end
by hand — MySQL was set up and connected manually, migrations were run and checked in the admin UI,
every form was submitted manually and cross-checked against the database, the CORS/`.env`/Django
version issues that came up during local setup were diagnosed from real terminal output and fixed
based on the actual environment (Python 3.11, Windows), not assumed. Copy, content data (services,
portfolio, blog), and page-level UI decisions were reviewed and adjusted to fit the Riyadvi brand.

**Why this tool was selected:** Claude was used for its ability to hold the full project context
(backend + frontend + prior debugging steps) across a long, iterative build, and to explain *why* a
given approach was suggested — which mattered for being able to defend architectural decisions in
the technical walkthrough, not just paste working code.

## 9. 3D libraries used

- **Three.js** + **React Three Fiber** — the homepage hero (`TechSphere.jsx`): ~140 nodes distributed
  on a sphere via a Fibonacci-sphere algorithm, connected by proximity-based line segments, with a
  rotating wireframe icosahedron core. Responds to cursor position; node count and pixel ratio drop
  on mobile; a static gradient circle renders instead when `prefers-reduced-motion` is set.

## 10. Animation libraries used

- **GSAP + ScrollTrigger** — the homepage's "Business Challenge → Strategy → Design → Technology →
  Launch → Growth" section (scroll-scrubbed reveal with a filling progress line), and the About
  page's milestone timeline (scroll-triggered fade/slide-in).
- **Lenis** — smooth scrolling across the whole site, synced to GSAP's ticker so ScrollTrigger stays
  accurate.

## 11. Third-party assets

No stock photography or third-party icon packs are used — all visuals are code-generated (CSS
gradients, SVG, and the R3F 3D scene) to keep the bundle light and avoid licensing questions.

## 12. Performance optimization

- 3D node count and renderer pixel ratio scale down on mobile (`viewport.width < 6` / `window.innerWidth < 768`).
- A fully static, non-WebGL fallback renders under `prefers-reduced-motion`, avoiding an animation
  loop entirely for users who've opted out of motion.
- Lenis + GSAP ticker are torn down on unmount to avoid leaking scroll listeners between route changes.
- DRF anonymous throttling (30/min) protects lead endpoints from being spammed.

**Known gap:** the production JS bundle currently exceeds Vite's 500KB chunk-size warning threshold
(Three.js is the main contributor). Code-splitting the 3D hero behind `React.lazy()` is the next
performance step — see Future Improvements.

## 13. Known limitations

- Services, portfolio, and blog content currently live in static JS data files (`src/data/`), not
  the database — by design, to hit the 3–5 day window, but the `content` Django app is scaffolded
  and ready to take over that role.
- Only one interactive 3D piece exists (the homepage hero); the brief's "3+ sections with meaningful
  interactive visuals" goal is partially met via GSAP scroll sections rather than additional 3D scenes.
- Email notifications on form submission are not yet wired up (Django's console email backend is
  configured as a placeholder).
- No automated tests yet.

## 14. Future improvements

- Move Services/Portfolio/Blog into the `content` Django app and swap the frontend's static data
  imports for API calls — the page components already read from a single data source per type, so
  this is a source swap, not a rewrite.
- Code-split the Three.js hero with `React.lazy()` / `Suspense` to shrink the main bundle.
- Add a second R3F scene for the Technology Ecosystem section (orbiting tech logos).
- Wire up real email notifications (SendGrid/SMTP) on lead submission.
- Add automated tests for the API endpoints (DRF's `APITestCase`).

## 15. Deployment

- **Frontend:** Vercel — https://riyadvi-website-olive.vercel.app
- **Backend + Admin:** Railway — https://riyadvi-website-production.up.railway.app
  - Admin dashboard: https://riyadvi-website-production.up.railway.app/admin/
- **Database:** MySQL, hosted on Railway

Live URLs:
- Website: https://riyadvi-website-olive.vercel.app
- Backend API base: https://riyadvi-website-production.up.railway.app/api
- Admin dashboard: https://riyadvi-website-production.up.railway.app/admin/
