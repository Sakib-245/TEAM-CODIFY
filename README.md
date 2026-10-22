# Eventify — Unified Event Management Platform

> A community-driven, frontend-only web platform connecting **event organizers**, **attendees**, and **volunteers** across India. Built by **Team Codify** as part of a collaborative multi-branch development workflow.

---

## Table of Contents

- [Overview](#overview)
- [Live Features](#live-features)
- [Branch Architecture](#branch-architecture)
- [Pages & Modules](#pages--modules)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Contributors](#contributors)

---

## Overview

Eventify is a centralized platform that showcases campaigns and events related to **Cleanliness**, **Hackathons**, **Social Awareness**, **Health**, **Education**, **NGO/Org**, and more. Users can discover events near them, register as attendees or volunteers, review past events, and report concerns — all from a single unified interface.

Key design principles:
- **100% frontend** — no backend server required, runs directly in any browser
- **localStorage-based state** — registrations, calendar bookmarks, and login sessions persist across page reloads
- **Mobile-first responsive** — full hamburger nav and adaptive grid layouts
- **SDG Gamification** — events earn sustainability scores based on impact criteria

---

## Live Features

| Feature | Description |
|---|---|
| Hero Slider | Auto-advancing image carousel with manual prev/next controls |
| Category Browse | 8 category cards that deep-link directly into filtered Find Events view |
| Event Cards | Rich cards with image zoom modal, PDF brochure download, contact info, Google Maps link |
| Find Events | Search + category filter + URL param pre-filtering from homepage |
| Register for Events | Demo login modal → localStorage-persisted registration state |
| Add to Calendar | One-click Google Calendar event creation with correct IST timezone |
| Volunteer Apply | Separate volunteer event listing with apply flow and Google Form redirect |
| Nearby Events | Geolocation API + Google Maps SDK — shows Blood Donation, Vaccine, Women-Only events within 50 km |
| Create Event | Full event submission form with Google Maps location picker, file validation, SDG score calculator |
| Admin Console | Dashboard with Chart.js doughnut + bar charts, reported events moderation queue |
| Community Page | Review and report cards with star ratings, image lightbox, read-more toggle |
| Review/Report Form | Tabbed form with star rating, image upload (max 3, dedup), character counter, toast notification |
| AI Chatbot | Dialogflow CX messenger embedded on Index and Create Events pages |
| Event Detail Pages | Per-event detail view with stats dashboard, weekly registration chart, Greener Mobility modal |
| SDG Badge | Certificate icon awarded to events scoring 100+ SDG points |
| Report Event | Kebab menu → radio-option report modal on Find Events and Volunteer pages |
| FAQ Accordion | Smooth max-height animated accordion on all major pages |

---

## Branch Architecture

The project was developed using a **feature-branch workflow**. Each branch owns a specific page or feature module.

| Branch | Owner | Scope |
|---|---|---|
| `main` | Sakib-245 | Integration base, README |
| `Index-page` | Atreya187 | Landing page (`index.html`, `style.css`, `script.js`) |
| `Chatbot(on-Index-page)` | Sakib-245 | Dialogflow CX chatbot integration on index page |
| `Find-Events` | Kapil_Sorte | Event discovery page with search, filters, modals |
| `Create-Events` | gayatrikarkhile | Event submission form with map picker and SDG scoring |
| `Volunteer` | Jiya Shahadivan | Volunteer event listing and apply flow |
| `Nearby_events` | N_ARYA | Geolocation + Google Maps nearby events |
| `Admin-Panel` | Jiya Shahadivan | Admin console with Chart.js analytics and moderation |
| `Community-page` | Atreya187 | Community reviews and reports display |
| `Review-Report-Form` | Kapil_Sorte | Tabbed review/report submission form |
| `Event-card-click(user)` | Sakib-245 | Event detail page — attendee view |
| `Event-card-click(volunteer)` | N_ARYA | Event detail page — volunteer view |

---

## Pages & Modules

### `index.html` — Landing Page
- Responsive navbar with sticky positioning and mobile hamburger menu
- 3-slide auto-advancing hero image slider (10s interval)
- Events Preview section — 3 featured event cards with zoom, brochure, location
- Browse by Categories — 8 clickable cards that navigate to filtered Find Events
- User & Organisation Control Flow sections
- FAQ accordion
- Footer with social links (Facebook, Instagram, LinkedIn, GitHub)
- Dialogflow CX chatbot widget (`agent-id: 1f801ece-cde6-4cb8-b578-15b7e608266e`)

### `find-events.html` — Find Events
- Search bar (name, city, category)
- Category filter buttons: All, Students, Exhibition, Social, NGO/Org, Health, Education, Marketing, Political, Other, Registered
- URL parameter `?category=` pre-selects filter from homepage category cards
- Dynamically rendered event cards from inline JS data array
- Register button → demo login modal → localStorage persistence
- Add to Calendar → Google Calendar URL with IST timezone
- Image zoom modal
- Kebab menu → Report modal with radio options
- SDG badge (certificate icon) for events scoring ≥ 100
- Nearby Me nav link → type selection modal → geolocation → `nearby-events.html`

### `create-event.html` — Create Events
- Links to `event-form.html` for full event submission
- Displays created events grid (demo data, flip card for volunteer view)
- Card flip animation for events with volunteer requirements
- Edit modal (name + org fields)
- Delete with fade-out animation
- SDG badge modal
- Dialogflow CX chatbot widget

### `event-form.html` — Event Submission Form
- Organizer details, event metadata, category selector
- Google Maps Places Autocomplete + draggable marker for location
- Reverse geocoding fills address and city fields automatically
- File upload validation: image (max 1 MB, JPG/PNG), brochure (max 5 MB, PDF)
- Conditional volunteer fields (slots, form link, banner, brochure)
- SDG Impact Score calculator — radio + checkbox inputs with live score display
- Character counter on description textarea (max 5000)
- Edit mode via `?edit=<id>` URL parameter

### `volunteer.html` — Volunteer
- 13 volunteer events across Exhibition, Marketing, Health, NGO/Org, Students, Political categories
- Apply button → demo login modal → Google Form redirect on success
- Applied state persisted in localStorage (`demo_vol_applications`)
- Calendar add, zoom modal, SDG badge, report modal — same UX as Find Events

### `nearby-events.html` — Nearby Events
- Google Maps SDK with user geolocation (cached via `sessionStorage`)
- Filters events within 50 km radius using `google.maps.geometry.spherical.computeDistanceBetween`
- 3 event types: Blood Donation Camp, Vaccine Camp, Women Only Events (4 events each)
- Map markers with info windows showing distance
- Fallback to Pune center (18.5204, 73.8567) if location denied
- Search filter on rendered cards

### `admin.html` — Admin Console
- Sidebar navigation: Dashboard, Events, Reports, Users, Settings
- Stats grid: Total Registrations (20,456), View Count (33,514), Events Created (1,251), Volunteers (4,415)
- Chart.js doughnut chart — event distribution by category with center text plugin
- Chart.js bar chart — monthly user engagement (Jan–Jun)
- Reported events cards with issue description, View Details link, Delete button
- Image zoom modal on reported event cards

### `Community.html` — Community
- Search bar + filter tabs: All, Reviews, Reports
- Review cards: star rating, reviewer name, email, date attended, read-more toggle, image gallery lightbox
- Report cards: category badge, incident datetime, email, description, evidence images
- Mobile horizontal scroll gallery for images
- Image lightbox modal (full-screen click-to-open)

### `Review-Report-Form.html` — Review / Report Form
- Tab switcher: ⭐ Review / 🚨 Report
- Review: event name, optional name/email, date attended, 5-star rating, textarea (2000 chars), up to 3 image uploads
- Report: event name, issue category dropdown (with "Other" text input), email, datetime, description, evidence images
- Accumulative image upload — deduplication by name+size, max 3 per form
- Image preview grid with individual remove buttons
- Submit validation — all required fields must be filled before button enables
- Toast notification on successful submission

### `Event-card-click(2)findevents.html` — Event Detail (Find Events)
- Full-page hero banner image
- Event title, organizer box with stats (events count, established year)
- Add to Calendar, Save as PDF (print), Bookmark (localStorage)
- Register button with disabled state after click
- Stats dashboard: Total Registrations, View Count, Weekly Registrations, Volunteers (animated counters)
- Chart.js bar chart — weekly registration trends (last 7 days)
- Embedded Google Maps iframe for venue location
- Greener Mobility modal — compares Car, Bus, Bicycle, Walking with CO₂ emissions and smartphone charge equivalent

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (CSS Variables, Grid, Flexbox, Media Queries) |
| Scripting | Vanilla JavaScript (ES6+) |
| Icons | Font Awesome 6.4.0 (CDN) |
| Charts | Chart.js (CDN) |
| Maps | Google Maps JavaScript API + Places + Geometry libraries |
| AI Chatbot | Dialogflow CX Messenger (Eventify Assistant) |
| State | `localStorage` + `sessionStorage` (no backend) |
| Fonts | Segoe UI (system), Plus Jakarta Sans (Review form) |

---

## Project Structure

```
Eventify/
├── index.html                        # Landing page
├── style.css                         # Global styles (navbar, hero, cards, footer)
├── script.js                         # Landing page JS (slider, FAQ, zoom, calendar)
│
├── find-events.html                  # Event discovery
├── Find-events.css
├── Find-events.js
│
├── create-event.html                 # Organizer dashboard
├── create-event.css
├── create-event.js
│
├── event-form.html                   # Event submission form
├── event-form.css
├── event-form.js
│
├── Volunteer.html                    # Volunteer listings
├── Volunteer.css
├── Volunteer.js
│
├── nearby-events.html                # Geolocation-based nearby events
├── nearby-events.css
├── nearby-events.js
│
├── admin.html                        # Admin console
├── admin.css
├── admin.js
│
├── Community.html                    # Community reviews & reports
├── Community.css
├── Community.js
│
├── Review-Report-Form.html           # Submit review or report
├── Review-Report-Form.css
├── Review-Report-Form.js
│
├── Event-card-click(2)findevents.html  # Event detail — attendee view
├── Event-card-click(2)findevents.css
├── Event-card-click(2)findevents.js
│
├── Event-card-click(1).html          # Event detail — Summer Jazz Festival
├── Event-card-click(1).css
├── Event-card-click(1).js
│
├── Event-card-click(2).html          # Event detail — Global Web3 Summit
├── Event-card-click(2).css
├── Event-card-click(2).js
│
├── Event-card-click(3).html          # Event detail — Community Voices Rally
├── Event-card-click(3).css
├── Event-card-click(3).js
│
├── Event-card-click(4).html          # Event detail — Tech Startup Mixer
├── Event-card-click(4).css
├── Event-card-click(4).js
│
└── assets/
    ├── images/                       # All event and UI images
    └── demo/
        └── Demo Brochure.pdf         # Sample brochure for download
```

---

## Getting Started

No build tools or server required. Open directly in a browser:

```bash
# Clone the repository
git clone https://github.com/Sakib-245/TEAM-CODIFY.git
cd TEAM-CODIFY

# Open the landing page
start index.html        # Windows
open index.html         # macOS
xdg-open index.html     # Linux
```

> **Note:** The Google Maps features (`event-form.html`, `nearby-events.html`) require a valid Google Maps API key with the **Maps JavaScript API**, **Places API**, and **Geometry library** enabled. Replace the key in the `<script>` src URLs if needed.

### Exploring individual branches

```bash
# View a specific feature branch
git checkout Find-Events
git checkout Admin-Panel
git checkout "Chatbot(on-Index-page)"
# etc.
```

---

## Contributors

| GitHub Handle | Name | Branches Owned |
|---|---|---|
| [Sakib-245](https://github.com/Sakib-245) | Sakib | `main`, `Chatbot(on-Index-page)`, `Event-card-click(user)` |
| [Atreya187](https://github.com/Atreya187) | Atreya | `Index-page`, `Community-page` |
| [Kapil_Sorte](https://github.com/Kapilks123k) | Kapil | `Find-Events`, `Review-Report-Form` |
| [gayatrikarkhile](https://github.com/gayatrikarkhile) | Gayatri | `Create-Events` |
| [Jiya Shahadivan](https://github.com/jiyashahadivan) | Jiya | `Volunteer`, `Admin-Panel` |
| [N_ARYA](https://github.com/N-ARYA) | Arya | `Nearby_events`, `Event-card-click(volunteer)` |

---

## Contact
- Email: [codify502@gmail.com](mailto:codify502@gmail.com)
- GitHub: [Sakib-245/TEAM-CODIFY](https://github.com/Sakib-245/TEAM-CODIFY)
