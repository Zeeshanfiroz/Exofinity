# Exofinity

**Where former members unite for an infinite future.**

The official community website for **Team Exofinity** — a community for former members who unite around AI, Web Development, and emerging technologies.

> **Motto:** Beyond limits. Infinite growth.
> **Quote:** "Alone we learn, together we create the future."

🔗 **Live site:** [exofinity.vercel.app](https://exofinity.vercel.app)

---

## Tech Stack

| Layer          | Tech                                    |
| -------------- | ---------------------------------------- |
| Framework      | [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) |
| Styling        | [Tailwind CSS v4](https://tailwindcss.com/) (via `@tailwindcss/vite`) |
| Routing        | [React Router v7](https://reactrouter.com/) |
| Animation      | [GSAP](https://gsap.com/) + ScrollTrigger |
| Linting        | ESLint 10                                |
| Deployment     | [Vercel](https://vercel.com/)            |

No backend / CMS for v1 — content lives in static data files under `src/data/`, and forms use direct WhatsApp/mailto links.

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) 18+
- npm (comes with Node)

### Installation

```bash
git clone https://github.com/Zeeshanfiroz/Exofinity.git
cd Exofinity
npm install
```

### Development

```bash
npm run dev
```
Starts the Vite dev server (default: `http://localhost:5173`) with hot module reload.

### Production build

```bash
npm run build
```
Outputs an optimized build to `dist/`.

### Preview the production build locally

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Project Structure

```
Exofinity/
├── public/                    # Static files served as-is (favicon, icon sprite)
├── src/
│   ├── assets/
│   │   └── images/             # Imported images (team photos, etc.)
│   ├── components/
│   │   ├── layout/             # Navbar, Footer
│   │   ├── sections/           # Homepage sections (Hero, Stats, CoreFocusStrip,
│   │   │                       #   MottoBanner, UpcomingEventsPreview, StarsBackground)
│   │   └── ui/                 # Reusable primitives (Button, Card, SectionHeading)
│   ├── data/                   # Static content: team.js, events.js, coreFocus.js, stats.js
│   ├── lib/                    # Small shared utilities (date formatting, GSAP helpers)
│   ├── pages/                  # One file per route (Home, About, Team, Events, Join, Contact, NotFound)
│   ├── App.jsx                 # Route definitions
│   ├── main.jsx                # App entry point
│   └── index.css               # Tailwind import + design tokens (@theme)
├── index.html
├── vite.config.js
└── package.json
```

---

## Pages

| Route       | Description                                                  |
| ----------- | -------------------------------------------------------------- |
| `/`         | Homepage — hero, stats, core focus areas, upcoming events preview, motto banner |
| `/about`    | Mission, core focus areas in detail, community goals            |
| `/team`     | Team member cards (flip-to-reveal bio, socials, open roles)     |
| `/events`   | Upcoming + past events                                         |
| `/join`     | How to join the community                                      |
| `/contact`  | Contact info, FAQ, socials                                     |

---

## Design System

Design tokens are defined once in `src/index.css` under Tailwind's `@theme`:

- **Background:** near-black (`#0a0e14`)
- **Accent:** violet (`#8B5CF6`) with a cyan highlight (`#06B6D4`)
- **Headings:** Space Grotesk
- **Body:** Inter
- **Radius / shadow tokens:** `--radius-xl2`, `--shadow-glow`

Reusable UI primitives (`Button`, `Card`, `SectionHeading`) enforce consistency across pages — extend these rather than writing one-off styles.

---

## Content Updates

Most day-to-day content lives in `src/data/`:

- **`team.js`** — team members (photo, name, skills, experience, quote, socials — capped at 3 socials per person) and `openRoles`
- **`events.js`** — upcoming/past events. Use `date: "TBA"` for events without a confirmed date instead of leaving it blank.
- **`coreFocus.js`** — the 5 focus-area cards on the homepage
- **`stats.js`** — homepage stats strip

Editing these files updates the site — no code changes needed for routine content updates.

---

## Deployment

The site auto-deploys to [Vercel](https://vercel.com/) on push to `main`. To deploy manually:

```bash
npm run build
```
then upload/connect the `dist/` folder via the Vercel dashboard or CLI.

---

## Contributing

1. Create a branch from `main`
2. Make your changes
3. Run `npm run lint` and `npm run build` to confirm nothing's broken
4. Open a PR

---

## License

© Team Exofinity. All rights reserved.