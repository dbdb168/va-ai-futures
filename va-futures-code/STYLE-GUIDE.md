# BuildFirst Research Publication — Brand & Style Guide

> Reusable design system for all BuildFirst research publications. Clone this file and the associated design tokens for any new report.

---

## Design Tokens

```css
:root {
  --bg-page:           #FAFAF7;
  --bg-sidebar:        #0F0F0F;
  --bg-sidebar-active: #1F1F1F;
  --border-gray:       #E0E0E0;
  --accent-crimson:    #C41E3A;
  --text-primary:      #0F0F0F;
  --text-secondary:    #666666;
  --text-tertiary:     #999999;
  --text-on-dark:      #FAFAF7;
  --success:           #22C55E;
  --info:              #3B82F6;
}
```

---

## Typography

### Fonts
- **Headings**: Cormorant Garamond (serif) — Google Fonts
- **Body / UI**: Inter (sans-serif) — Google Fonts
- **Web-safe fallbacks**: Georgia (serif), system-ui/Arial (sans)

```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Type Scale

| Element | Font | Size | Weight | Color | Line-height | Letter-spacing |
|---------|------|------|--------|-------|-------------|----------------|
| Page title (dark header) | Cormorant Garamond | 64px (36px mobile) | 500 | --text-on-dark | 1.0 | -2px |
| Section heading | Cormorant Garamond | 28px | 500 | --text-primary | 1.2 | -1px |
| Body copy | Inter | 16px | 400 | --text-primary | 1.7 | — |
| Callout title | Inter | 13px | 600 | --text-primary | 1.4 | — |
| Callout body | Inter | 13px | 400 | --text-secondary | 1.6 | — |
| Card title | Inter | 14px | 600 | --text-primary | — | — |
| Card body | Inter | 13px | 400 | --text-secondary | 1.5 | — |
| Chapter label | Inter | 11px | 600 | --accent-crimson | — | 1px |
| Section label | Inter | 11px | 500 | --text-tertiary | — | 0.5px |
| Footer | Inter | 12px | 400 | --text-tertiary | — | — |
| CTA button | Inter | 13px | 500 | --text-on-dark | — | — |
| Pull quote | Cormorant Garamond | 36px (28px mobile) | 400 italic | --text-primary | 1.4 | — |
| Stat callout number | Cormorant Garamond | 56-80px | 500 | --accent-crimson | 1.0 | -1 to -2px |

---

## Layout System

### Page Shell
```
┌──────────────────────────────────────────────┐
│ Sidebar (72px) │ Content Area (flex-1)        │
│                │                              │
│  VF logo       │  [Dark Header - full width]  │
│  Nav icons     │  [Content - centered]        │
│                │                              │
└──────────────────────────────────────────────┘
```

### Content Container
- **Max width**: 1104px
- **Centering**: `max-w-[1104px] mx-auto`
- **Horizontal padding**: 32px (`px-8`), mobile 24px (`px-6`)
- **Vertical padding**: 40px top/bottom (chapters), 60px (ch4/dashboard)
- **Section gap**: 40px (`space-y-10`)

### Two-Column Layout (Body + Callout)
```
┌─────────────────────────────┬──────────────┐
│ Body Column (flex-1)        │ Callout      │
│ ~776px at 1104px container  │ 280px fixed  │
│                             │ shrink-0     │
│ Inter 16px, line-height 1.7 │ 13px, 1.6    │
│                             │ Crimson left │
│                             │ border 3px   │
└─────────────────────────────┴──────────────┘
Gap: 48px (gap-12)
```

- Body column: `flex-1`
- Callout column: `w-[280px] shrink-0` (standard) or `w-[380px]` (when body text is short, e.g. Ch1)
- Callout border: `border-left: 3px solid #C41E3A` — wraps only the callout content, NOT the full column height
- Stacks vertically on mobile: `flex-col md:flex-row`

### Home Page Layout
- Top spacer: `30vh` (10vh mobile) pushes content to lower half
- Body text max-width: not constrained by container — uses flex-1 naturally
- Shell callout: `w-[280px]` positioned with `padding-top: 140px` to align with first paragraph
- Footer: no divider, generous top padding (80px)

---

## Dark Chapter Headers

```
Height: 360px (auto on mobile)
Background: --bg-sidebar (#0F0F0F)
Padding: 60px 80px (reduced on mobile)
Layout: flex column, items-center, justify-center, text-center, gap 16px

Content:
  1. Chapter label: "CHAPTER 01" — crimson, 11px, 600 weight, 1px tracking
  2. Title: Cormorant Garamond 64px, --text-on-dark
  3. Subtitle: Inter 16px, --text-tertiary, max-width 800px, line-height 1.5
```

---

## Sidebar

### Desktop (md+)
- Width: 72px, fixed, dark background
- Logo: 40px × 40px crimson rounded square (8px radius) with "VF" in Cormorant Garamond 18px white
- Nav icons: 40px × 40px, 8px radius, Lucide icons at 20px
- Active state: crimson icon color + left accent bar (3px crimson) + dark active background
- Inactive: --text-tertiary icons, hover shows --bg-sidebar-active

### Hover Tooltip
- Position: absolute, left of icon + 52px, vertically centered
- Card: #2A2A2A background, rounded-lg, 220px wide
- Left accent: 3px crimson bar inside the card
- Content padding: 14px 16px
- Line 1: Subtitle (e.g. "CHAPTER 01") — 10px, 600 weight, crimson, uppercase, 1px tracking
- Line 2: Full title — 14px, 500 weight, white, margin-top 4px

### Mobile (below md)
- Desktop sidebar hidden
- Fixed bottom nav bar: 64px height, #0F0F0F background
- Shows 4 quick-access icons + hamburger menu
- Hamburger opens full-screen overlay with all nav items (same subtitle + title pattern)
- All pages get `pb-[72px] md:pb-0` for bottom nav clearance

---

## Components

### CTA Button
```
Background: --accent-crimson
Color: --text-on-dark (white)
Font: Inter 13px, 500 weight
Padding: 8px 16px
Border-radius: 20px (pill shape)
Hover: opacity 90%
Position: flex justify-end at top of content area
```

### Pull Quote
```
Container: padding 40px 0, border-top and border-bottom 1px --border-gray
Text: Cormorant Garamond 36px (28px mobile), italic, 400 weight
Color: --text-primary
Alignment: centered, max-width 800-900px, mx-auto
```

### Stat Callout
```
Container: padding 48px 0, centered, border-top/bottom 1px --border-gray (or no borders)
Number: Cormorant Garamond 56-80px, 500 weight, --accent-crimson, letter-spacing -1 to -2px
Label: Inter 14px, --text-secondary, centered, max-width 600px
```

### Structural Driver Cards (side by side)
```
Layout: flex gap-24, each card flex-1
Border: 1px solid --border-gray
Padding: 32px
Gap: 12px between title and body
Title: Inter 14px, 600 weight, --text-primary
Body: Inter 13px, 400 weight, --text-secondary, line-height 1.5
```

### Scenario Matrix (Ch4 specific)
```
Container: 1104px × 552px, position relative
Horizontal axis: y:276, full width, 1px --border-gray
Vertical axis: x:552, starts y:36, height 480px, 1px --border-gray
Axis labels: Inter 9px, 600 weight, --text-tertiary, 1.5px tracking

Cards: 540px × 216px, absolute positioned, 24px gap at crossing
  - Top-left: y:36, x:0
  - Top-right: y:36, x:564
  - Bottom-left: y:300, x:0
  - Bottom-right: y:300, x:564

Card content:
  1. Badge: crimson background, white text, 10px 600 weight, 0.5px tracking
  2. Title: Cormorant Garamond 24px, 500 weight, curly quotes
  3. Description: Inter 13px, --text-secondary, line-height 1.5
  4. CTA: "Read this scenario →" Inter 14px, --accent-crimson

Mobile: hidden, replaced with stacked grid-cols-1 cards
```

### Interactive Regional Analysis (Ch3)
- Accordion-style clickable region list
- 3 gauge bars per region: Peer Network Density, Early Adopter Proximity, Institutional Support
- Gauge: 8px height, rounded-full, #E0E0E0 background with colored fill
  - High (70-100%): #22C55E green
  - Medium (40-69%): #D4A020 gold
  - Low (0-39%): #C41E3A crimson
- Recommendation: crimson left border callout, Inter 14px, --text-secondary
- Sources footnote: Inter 11px, --text-tertiary

---

## Dividers & Spacing

- Section divider: `1px solid --border-gray` (use `<hr>` or `div` with `h-px bg-border-gray`)
- No divider above footer
- No divider between bottom navigation and footer
- Bottom navigation: `border-top: 1px solid --border-gray`, `padding-top: 32px`
- Previous chapter link: --text-secondary (grey)
- Next chapter link: --accent-crimson

---

## Footer

```
Layout: flex justify-between items-center
Padding: top 24px
Font: Inter 12px, --text-tertiary

Left: Privacy (link to /privacy) | Legal (link to /legal) | buildfirst.io (external link)
Right: "Virginia AI Futures is a BuildFirst research project"

Mobile: stacks vertically (flex-col md:flex-row)
No divider above footer.
```

---

## Assessment Flow

### Intake Form
- Centered card layout, max-width 600px
- Fields: Name, Email, Website (with https:// prompt), Business Description, Company Size (select), Region (select)
- Title: Cormorant Garamond 32px

### Questions Page
- No sidebar — full-width centered layout
- Progress bar: fixed top, full width, 4px, --accent-crimson
- Max-width 700px centered
- Title: "Your Business's AI Fluency" — Cormorant Garamond 36px
- Questions: Cormorant Garamond 22px title + radio option list
- Dimension badge: colored pill (11px, rounded-full)
- Selected option: crimson border + light crimson background

### Results Page
- Sidebar + centered content max-width 700px
- Sections separated by --border-gray dividers with 48px vertical padding
- Score bars: 2-column grid on desktop, 1-column mobile
- Scenario cards: 2-column grid with relevance-based backgrounds
- Actions: numbered with crimson left border, Cormorant Garamond numbers
- CTA block: #F5F5F0 background, centered, green button

---

## Responsive Breakpoints

| Breakpoint | Width | Changes |
|-----------|-------|---------|
| Mobile | < 768px | Sidebar → bottom nav, columns stack, titles 36px, reduced padding |
| Desktop | ≥ 768px (md:) | Full sidebar, two-column layouts, titles 64px, standard padding |

### Key responsive patterns:
- `flex-col md:flex-row` — stack columns on mobile
- `text-[36px] md:text-[64px]` — responsive title sizes
- `px-6 md:px-8` — responsive horizontal padding
- `w-full md:w-[280px]` — callout full-width on mobile, fixed on desktop
- `grid-cols-1 md:grid-cols-2` — grids single-column on mobile
- `hidden md:block` / `md:hidden` — show/hide elements by breakpoint
- `pb-[72px] md:pb-0` — bottom nav clearance on mobile

---

## Favicon

- SVG format: crimson rounded square (#C41E3A, 6px radius) with white "VF" in Georgia 18px 600 weight
- Set in layout.tsx metadata: `icons: { icon: "/favicon.svg" }`

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + inline styles for precise control
- **Fonts**: Google Fonts (Cormorant Garamond + Inter)
- **Icons**: Lucide React
- **Charts**: Chart.js via react-chartjs-2 (dynamic import, SSR disabled)
- **Analytics**: Vercel Analytics
- **Database**: Neon Postgres via @neondatabase/serverless
- **API**: Claude API (claude-sonnet-4-5-20250929) for assessment analysis
- **Webhook**: Make.com for email delivery
- **Deployment**: Vercel

---

## File Structure

```
src/
  app/
    page.tsx              # Home page (hero + Shell callout)
    layout.tsx            # Root layout (fonts, analytics, favicon)
    ch1-5/page.tsx        # Chapter pages (dark header + content)
    scenarios/*/page.tsx  # Scenario pages (use ScenarioPage component)
    dashboard/            # Dashboard (page.tsx + DashboardClient.tsx)
    assess/               # Assessment flow (intake, questions, processing, results)
    contact/page.tsx      # Contact form
    privacy/page.tsx      # Privacy policy
    legal/page.tsx        # Terms of use
    api/analyze/route.ts  # Claude API + webhook + database
    api/db-init/route.ts  # Database table initialization
  components/
    Sidebar.tsx           # Desktop sidebar + mobile bottom nav
    ScenarioPage.tsx      # Shared scenario page template
    DashboardCharts.tsx   # Chart.js chart components
    RegionalAnalysis.tsx  # Ch3 interactive regional gauges
  lib/
    db.ts                 # Neon Postgres connection + queries
  styles/
    globals.css           # Tailwind directives + CSS variables
public/
    favicon.svg           # Site favicon
    images/               # Scenario hero images
    chart-data.json       # Dashboard chart data
    indicators.json       # Dashboard indicator data
```

---

## Cloning This for a New Report

1. Copy the entire `va-futures-code` directory
2. Update `tailwind.config.ts` if changing the color palette
3. Update `globals.css` CSS variables
4. Update `layout.tsx` metadata (title, description)
5. Replace page content — keep the layout patterns:
   - Dark headers for chapter pages
   - Two-column body + callout for text-heavy sections
   - ScenarioPage component for narrative pages
   - Assessment flow structure
6. Update Sidebar.tsx nav items for new chapters
7. Set environment variables: `ANTHROPIC_API_KEY`, `VA_FUTURES_WEBHOOK_URL`, `DATABASE_URL`
