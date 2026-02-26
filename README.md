<div align="center">

# Brand Style Generator

**Build your brand style in minutes, not weeks.**

Pick colors, fonts, and tone — see your brand come alive on real product mockups.
Export to CSS, Tailwind, or Figma tokens. Free and open source.

<br>

### https://brandstylegenerator.com

<br>

[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL_3.0-blue.svg)](LICENSE)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Deployed on Cloudflare Workers](https://img.shields.io/badge/Deployed_on-Cloudflare_Workers-f38020?logo=cloudflare&logoColor=white)](https://workers.cloudflare.com)

[Report Bug](https://github.com/SchalaVentures/brand-style-generator/issues) · [Request Feature](https://github.com/SchalaVentures/brand-style-generator/issues)

</div>

---

## Why

Every side project, startup, and indie product needs a brand — but hiring a designer or spending days in Figma isn't always an option. Brand Style Generator gives you a complete brand style system in minutes: curated color palettes, pre-paired fonts, tone of voice, and five realistic mockups that show your brand on actual product UIs.

No design experience required. No account needed. Just pick what feels right.

---

## Features

### Build

| | |
|---|---|
| **160 curated color shades** | 8 color families (reds, pinks, oranges, yellows, greens, blues, purples, neutrals) + 13 gradient presets |
| **70 pre-paired font combinations** | 8 categories — Modern, Bold, Classic, Playful, Minimal, Elegant, Warm, Technical |
| **8 tone & voice presets** | Full copywriting examples — Confident, Playful, Clinical, Bold, Minimal, Warm, Professional, Rebellious |

### Preview

| | |
|---|---|
| **5 realistic mockup previews** | Dashboard · Landing Page · Mobile App · Login Page · Brand Guide |
| **Light & dark mode** | Toggle between themes and preview both instantly |
| **Live updates** | Every change reflects across all mockups in real time |

### Export & Share

| Format | Details |
|--------|---------|
| **CSS variables** | Copy-paste into any project |
| **Tailwind config** | Drop into your `tailwind.config.ts` |
| **Figma tokens** | Import with the Figma tokens plugin |
| **PDF brand guide** | A professional deliverable you can share with clients |
| **Shareable links** | Anyone can view your brand on all mockups, with dynamic OG images |

### Save & Manage

- **Auto-save** — changes sync automatically for signed-in users
- **Project management** — save, load, and organize multiple brands
- **No account required** — the full builder works without auth via localStorage

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org) · App Router |
| UI | [React 19](https://react.dev) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| State | [Zustand 5](https://zustand.docs.pmnd.rs) · persisted to localStorage |
| Backend | [Nhost](https://nhost.io) · PostgreSQL + Hasura + Auth |
| Color Math | [culori](https://culorijs.org) · OKLCH palette generation + WCAG contrast |
| PDF | [@react-pdf/renderer](https://react-pdf.org) · lazy-loaded |
| Icons | [Lucide React](https://lucide.dev) |
| Deployment | [Cloudflare Workers](https://workers.cloudflare.com) via [OpenNext](https://opennext.js.org) |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 22+
- [pnpm](https://pnpm.io) 9+
- [Nhost CLI](https://docs.nhost.io/development/cli) _(optional — for auth & project saving)_

### Quick Start

```bash
# Clone the repo
git clone https://github.com/SchalaVentures/brand-style-generator.git
cd brand-style-generator

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Start the dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) — the builder works immediately without any backend setup.

### With Nhost Backend _(optional)_

To enable authentication and project saving:

```bash
# Starts PostgreSQL, Hasura, Auth + applies migrations automatically
nhost up
```

Set `NHOST_SUBDOMAIN=local` and `NHOST_REGION=local` in `.env.local`.

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NHOST_SUBDOMAIN` | Nhost project subdomain | For auth/save features |
| `NHOST_REGION` | Nhost project region | For auth/save features |

### Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Lint with oxlint
pnpm typecheck    # TypeScript type checking
```

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── create/               # Brand builder
│   ├── projects/             # User's saved projects
│   ├── share/[id]/           # Public share view
│   ├── api/share/route.ts    # Share link API
│   ├── privacy/, terms/, contact/
│   ├── reset-password/
│   ├── robots.ts, sitemap.ts
│   └── layout.tsx
├── components/
│   ├── ui/                   # Base UI (button, modal, tabs, suspense-fallback, ...)
│   ├── auth/                 # AuthModal, UpgradeBanner
│   ├── builder/              # BuilderLayout, WizardPanel, steps, HeaderBar, ...
│   ├── preview/              # Mockup frames and previews
│   ├── landing/              # Landing page sections
│   ├── projects/             # ProjectCard, ProjectsClient
│   ├── shared/               # SharedViewClient
│   └── AuthInitializer.tsx
├── hooks/
│   ├── use-auth.ts           # Auth state + signIn/signOut actions
│   ├── use-auth-state.ts     # Polling auth state
│   ├── use-auth-init.ts      # Email verification URL redirect handler
│   ├── use-auto-save.ts      # Debounced auto-save to brand_projects
│   ├── use-active-palette.ts # Palette with overrides applied
│   └── use-scroll-reveal.ts  # Intersection observer animation
├── lib/
│   ├── nhost.ts              # Nhost client, gqlRequest, session helpers
│   ├── nhost-server.ts       # Server-side Nhost client (cookie session)
│   ├── utils.ts              # cn(), truncate(), formatDate(), getErrorMessage()
│   ├── projects.ts           # GraphQL CRUD for brand_projects
│   ├── share.ts              # Shared link fetch + view count
│   ├── palette.ts            # OKLCH palette generation (light/dark)
│   ├── contrast.ts           # WCAG contrast ratio (culori)
│   ├── fonts.ts              # Google Fonts loading + font stacks
│   ├── export-css.ts         # CSS custom properties export
│   ├── export-tailwind.ts    # Tailwind config TS export
│   ├── export-figma.ts       # Figma tokens JSON export
│   └── export-pdf.tsx        # PDF brand guide (@react-pdf/renderer)
├── store/
│   ├── brand-store.ts        # Zustand store — brand state (persisted, versioned)
│   └── ui-store.ts           # Zustand store — UI state
├── types/
│   ├── brand.ts              # BrandState, core domain types
│   ├── colors.ts             # Color-related types
│   ├── fonts.ts              # Font-related types
│   ├── tones.ts              # Tone types
│   └── culori.d.ts           # Culori ambient declarations
└── data/                     # Static data (color families, font pairs, tones, ...)
nhost/
├── migrations/               # PostgreSQL migrations
└── metadata/                 # Hasura metadata (permissions, relationships)
```

---

## Deployment

### Cloudflare Workers

```bash
pnpm build
npx @opennextjs/cloudflare build
npx wrangler deploy
```

Set `NHOST_SUBDOMAIN` and `NHOST_REGION` in the Cloudflare dashboard under **Settings → Environment Variables**.

---

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for setup instructions and guidelines.

---

## License

[AGPL-3.0](LICENSE) — free to use, modify, and self-host. If you deploy a modified version publicly, you must open-source your changes.
