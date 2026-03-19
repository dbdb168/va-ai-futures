# Virginia AI Futures — BuildFirst Research Publication

A full-stack research publication exploring how AI fluency will reshape Virginia's 780,000 small and mid-size businesses. Built as an interactive web application with scenario planning analysis, AI-powered business assessment, and live data dashboard.

**Live site:** [va-ai-futures.buildfirst.io](https://va-ai-futures.buildfirst.io)

---

## What This Is

A five-chapter research publication using Shell's scenario planning methodology to construct four plausible futures for Virginia's SMB economy. It includes:

- **5 chapters** of original research with designed reading experience
- **4 scenario narratives** with hero images and structured fiction
- **AI fluency assessment** — 10 questions that generate a personalised business analysis using Claude
- **Live dashboard** tracking 20 indicators across four scenarios
- **Interactive regional analysis** with gauge visualisations for 8 Virginia regions
- **2×2 scenario matrix** with crossing axis lines

---

## How It Was Built

This project was built entirely with AI assistance using Claude Code. The entire development process — from design system creation through deployment — was completed in a single extended session.

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + inline styles |
| Fonts | Cormorant Garamond + Inter (Google Fonts) |
| Icons | Lucide React |
| Charts | Chart.js via react-chartjs-2 |
| AI | Claude API (claude-sonnet-4-5) for assessment analysis |
| Database | Neon Postgres (@neondatabase/serverless) |
| Email | Make.com webhook → Gmail |
| Analytics | Vercel Analytics + Google Analytics |
| Deployment | Vercel |

### Architecture

```
Browser → Next.js App Router
              │
              ├── Static pages (chapters, scenarios, home, contact)
              ├── Client components (dashboard charts, regional analysis, sidebar)
              └── API route (/api/analyze)
                    │
                    ├── Claude API → personalised analysis
                    ├── Neon Postgres → store submission
                    └── Make.com webhook → email results
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/dbdb168/va-ai-futures.git
cd va-ai-futures/va-futures-code
npm install
```

### Environment Variables

Create `.env.local` in the `va-futures-code` directory:

```env
ANTHROPIC_API_KEY=your-claude-api-key
VA_FUTURES_WEBHOOK_URL=your-make-com-webhook-url
DATABASE_URL=your-neon-postgres-connection-string
```

| Variable | Required | Purpose |
|----------|----------|---------|
| `ANTHROPIC_API_KEY` | Yes | Claude API for assessment analysis |
| `VA_FUTURES_WEBHOOK_URL` | No | Make.com webhook for email delivery |
| `DATABASE_URL` | No | Neon Postgres for storing assessment data |

The site runs without the webhook and database — assessments will still work, they just won't send emails or persist to the database.

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Building

```bash
npm run build
```

### Database Setup

If using Neon Postgres, initialise the table by visiting:
```
http://localhost:3000/api/db-init
```

---

## Project Structure

```
va-futures-code/
├── public/
│   ├── favicon.svg              # VF crimson square favicon
│   ├── images/                  # Scenario hero images
│   ├── chart-data.json          # Dashboard chart data
│   └── indicators.json          # Dashboard indicator data
├── src/
│   ├── app/
│   │   ├── page.tsx             # Home page
│   │   ├── layout.tsx           # Root layout (fonts, analytics)
│   │   ├── ch1–5/page.tsx       # Chapter pages
│   │   ├── scenarios/           # 4 scenario narrative pages
│   │   ├── dashboard/           # Live data dashboard
│   │   ├── assess/              # Assessment flow (4 pages)
│   │   ├── contact/page.tsx     # Contact form
│   │   ├── privacy/page.tsx     # Privacy policy
│   │   ├── legal/page.tsx       # Terms of use
│   │   └── api/
│   │       ├── analyze/route.ts # Claude API + webhook + database
│   │       └── db-init/route.ts # Database table creation
│   ├── components/
│   │   ├── Sidebar.tsx          # Desktop sidebar + mobile bottom nav
│   │   ├── ScenarioPage.tsx     # Shared scenario page template
│   │   ├── DashboardCharts.tsx  # Chart.js components
│   │   └── RegionalAnalysis.tsx # Interactive regional gauges
│   ├── lib/
│   │   └── db.ts                # Neon Postgres queries
│   └── styles/
│       └── globals.css          # Tailwind + CSS variables
├── STYLE-GUIDE.md               # Complete design system documentation
├── tailwind.config.ts           # Tailwind with custom design tokens
└── .env.local                   # Environment variables (not committed)
```

---

## Design System

The full design system is documented in [STYLE-GUIDE.md](STYLE-GUIDE.md). Key decisions:

| Element | Spec |
|---------|------|
| Content width | 1104px centered |
| Body text | Inter 16px, line-height 1.7 |
| Headings | Cormorant Garamond |
| Page titles | 64px (36px mobile) |
| Accent colour | #C41E3A (crimson) |
| Two-column layout | flex-1 body + 280px callout, 48px gap |
| Callout border | 3px solid crimson, left side, wraps content only |
| Dark chapter headers | 360px, #0F0F0F background |
| Mobile breakpoint | 768px (md:) |

---

## Assessment Flow

The assessment is a four-step process:

1. **Intake** (`/assess`) — Name, email, website, business description, size, region
2. **Questions** (`/assess/questions`) — 10 questions across 5 dimensions (Current Practice, Delegation, Description, Discernment, Diligence)
3. **Processing** (`/assess/processing`) — Calls Claude API with scores + business context
4. **Results** (`/assess/results`) — Personalised analysis with fluency profile, scenario mapping, and three actions

### What happens on submission:

```
User submits → API route calculates scores
                    → Calls Claude for personalised analysis
                    → Logs to console (backup)
                    → Saves to Neon Postgres (research)
                    → Fires Make.com webhook (email)
                    → Returns results to browser
```

### Scoring Model

Questions map to dimensions in pairs:
- Questions 1, 6 → Current Practice
- Questions 2, 7 → Delegation
- Questions 3, 8 → Description
- Questions 4, 9 → Discernment
- Questions 5, 10 → Diligence

Each answer is scored 1–5. Dimension scores are averaged from their pair. Overall score is the average of the four Ds (excluding practice).

### Claude Prompt

The prompt includes anti-hallucination rules: Claude must not fabricate specific facts about the business that aren't stated or verifiable from their website. Analysis is framed around scores, industry, and region when specific information is limited.

---

## Deployment

### Vercel

1. Import the repo at vercel.com
2. Set **Root Directory** to `va-futures-code`
3. Add environment variables (`ANTHROPIC_API_KEY`, `VA_FUTURES_WEBHOOK_URL`, `DATABASE_URL`)
4. Deploy

### Custom Domain

The site uses a subdomain: `va-ai-futures.buildfirst.io`

DNS setup (Cloudflare):
- Type: CNAME
- Name: `va-ai-futures`
- Target: `cname.vercel-dns.com`
- Proxy status: DNS only (grey cloud)

### Email (Make.com)

The webhook fires assessment data to Make.com, which sends a formatted HTML email via Gmail. The webhook payload includes all scores, Claude's analysis, and the three personalised actions.

---

## Reusing This for a New Report

This project is designed to be cloneable. See [STYLE-GUIDE.md](STYLE-GUIDE.md) for the complete design system.

1. Copy the `va-futures-code` directory
2. Update content in chapter page files
3. Update `layout.tsx` metadata
4. Update `Sidebar.tsx` navigation items
5. Update `tailwind.config.ts` if changing colours
6. Set new environment variables
7. Deploy to Vercel

The layout patterns (dark headers, two-column body+callout, scenario pages, assessment flow) are all reusable without modification.

---

## Credits

- **Research & writing:** David Beath, BuildFirst
- **AI Fluency Framework (Four Ds):** Rick Dakan, Joseph Feller, Anthropic (2025). CC BY-NC-SA 4.0.
- **Scenario methodology:** Shell scenario planning (Pierre Wack, Ted Newland, 1970s)
- **Development:** Built with Claude Code (Anthropic)

---

## License

Content is copyright BuildFirst 2026. The AI Fluency Framework (Four Ds) is used under CC BY-NC-SA 4.0 license from Anthropic. Code structure may be reused for similar projects.
