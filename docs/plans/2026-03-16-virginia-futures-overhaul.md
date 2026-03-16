# Virginia Futures Overhaul Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Overhaul Virginia Futures content, structure, and interactivity based on David's feedback. Then build the AI-powered personalized analysis experience.

**Architecture:** Two phases. Phase 1: content/text/structural changes across all HTML files. Phase 2: build the AI-powered URL analysis, interactive inline elements, leading indicators dashboard, and scenario navigation overhaul.

**Tech Stack:** HTML/CSS/JS (static site), Claude API (for personalized analysis), inline interactive tooltips/popovers (vanilla JS)

---

## Chunk 1: Content & Text Changes (All Files)

### Task 1: Remove All Em Dashes Across All Files

Replace every `&mdash;` and literal `—` with grammatically correct alternatives (commas, periods, colons, semicolons, or restructured sentences). 234 instances across 7 HTML files.

**Files:**
- Modify: `virginia-futures.html` (all instances)
- Modify: `scenario-build-it-yourself.html` (all instances)
- Modify: `scenario-software-does-it-for-you.html` (all instances)
- Modify: `scenario-pockets-of-excellence.html` (all instances)
- Modify: `scenario-the-widening-gap.html` (all instances)
- Modify: `virginia-regions-inline.html` (all instances)

**Approach:** Each em dash must be evaluated in context. Most will become:
- Parenthetical asides: replace with commas or parentheses
- Separators between clauses: replace with period, semicolon, or colon
- Attribution in quotes: replace with comma or period
- Ranges: use `&ndash;` (en dash) if not already

- [ ] **Step 1:** Process `virginia-futures.html` - replace all `&mdash;` instances with correct grammar
- [ ] **Step 2:** Process `scenario-build-it-yourself.html`
- [ ] **Step 3:** Process `scenario-software-does-it-for-you.html`
- [ ] **Step 4:** Process `scenario-pockets-of-excellence.html`
- [ ] **Step 5:** Process `scenario-the-widening-gap.html`
- [ ] **Step 6:** Process `virginia-regions-inline.html`
- [ ] **Step 7:** Check hero section meta line (`David Beath &mdash; BuildFirst`) - replace with ` | ` or similar
- [ ] **Step 8:** Verify in browser, commit

---

### Task 2: Fiction Disclaimer Update

Update the disclaimer callout on all scenario pages and the main page.

**Current text:** "These scenarios are works of structured fiction &mdash; not predictions. They are designed to provoke strategic questions for business leaders and policy makers. Elements of each will emerge. No single scenario will materialize as described."

**New text (remove em dash, add "could"):** "These scenarios are works of structured fiction, not predictions. They are designed to provoke strategic questions for business leaders and policy makers. Elements of each could emerge. No single scenario will materialize as described."

**Files:**
- Modify: `virginia-futures.html` (chapter 4 intro paragraph)
- Modify: `scenario-build-it-yourself.html:41`
- Modify: `scenario-software-does-it-for-you.html:41`
- Modify: `scenario-pockets-of-excellence.html:41`
- Modify: `scenario-the-widening-gap.html:41`

- [ ] **Step 1:** Update disclaimer text in all 5 files
- [ ] **Step 2:** Commit

---

### Task 3: GPT Terminology Clarification

The term "GPT" (General Purpose Technology) must not be confused with OpenAI's "GPT" (Generative Pre-trained Transformer) or ChatGPT (consumer product). Add inline interactive clarification.

**Implementation:** Add a tooltip/popover CSS class (`.inline-term`) that reveals a definition on click/hover. This will be an interactive inline element, not in the main paragraph body.

**Files:**
- Modify: `virginia-futures.html` (Chapter 1 opening paragraph and wherever "GPTs" appears)
- Modify: `virginia-futures.css` (add `.inline-term` styles)

**Definitions to include:**
- **GPT (General Purpose Technology):** Economic classification for technologies that reshape entire economies. Defined by Bresnahan & Trajtenberg (1995). Examples: steam engine, electricity, internet, generative AI.
- **GPT (Generative Pre-trained Transformer):** A family of large language models developed by OpenAI (GPT-3, GPT-4, etc.). Not unique to OpenAI; the architecture is used across the industry.
- **ChatGPT:** A consumer product by OpenAI. A chat interface built on top of GPT models. Not synonymous with generative AI itself.

- [ ] **Step 1:** Add `.inline-term` and `.inline-term-popover` CSS styles to `virginia-futures.css`
- [ ] **Step 2:** Wrap first "GPTs" mention in Chapter 1 with interactive markup
- [ ] **Step 3:** Add JS for popover toggle behavior
- [ ] **Step 4:** Test interaction, commit

---

### Task 4: Restructure Chapter 1 (Harvard/NBER Paragraph + Structural Drivers)

**Current flow:** The Harvard/NBER paragraph runs long, mixing the stat with the structural reasons.

**New flow:**
1. End the paragraph at: "GenAI is compressing that timeline further, for two structural reasons."
2. Immediately follow with the "Structural Drivers of Accelerated Adoption" callout card (already exists but may be positioned wrong)
3. Remove the redundant "Defining Characteristics" section that repeats the 39.4% figure

**Files:**
- Modify: `virginia-futures.html:85-108` (Chapter 1 content)

- [ ] **Step 1:** Split the Harvard/NBER paragraph at "for two structural reasons."
- [ ] **Step 2:** Move/verify the Structural Drivers callout card immediately after
- [ ] **Step 3:** Remove redundant "Defining Characteristics" h4 and paragraph (lines ~94-96) since the callout already covers this
- [ ] **Step 4:** Verify flow reads cleanly, commit

---

### Task 5: Three Layers Visual + Move to End of Chapter 1

The three layers (Passive Exposure, Active Adoption, Business-Specific Innovation) are a natural segue from the electricity parallel. Move them to the end of Chapter 1, and illustrate them visually rather than just text.

**Design:** A stacked visual inspired by the electricity metaphor. Three concentric or stacked layers, like building levels, using the existing color palette. CSS-only illustration within the site's style.

**Files:**
- Modify: `virginia-futures.html` (move layers-diagram from Chapter 2 to end of Chapter 1)
- Modify: `virginia-futures.css` (enhance `.layers-diagram` with visual treatment)

- [ ] **Step 1:** Cut the `.layers-diagram` HTML block from Chapter 2 (lines ~133-155)
- [ ] **Step 2:** Paste it at the end of Chapter 1, after the pull quote about fluency vs adoption
- [ ] **Step 3:** Add visual CSS treatment: stacked boxes with increasing intensity (tan -> mid-green -> dark-green), electricity metaphor iconography
- [ ] **Step 4:** Add a transitional sentence connecting electricity parallel to the three layers
- [ ] **Step 5:** Test layout, commit

---

### Task 6: Restructure Chapter 2 Opening

**Current problems:**
1. Chapter title says "Four Levels of AI Engagement" but opens with "three distinct layers" (confusing)
2. Critical variable (fluency not adoption) is buried at end of Chapter 1 instead of leading Chapter 2
3. Four As are presented as a "progressive framework" with numbers, but they are modalities

**Changes:**
1. Rename chapter: "Four Levels of AI Engagement" -> "The Fluency Variable"
2. Open with: "The critical variable is not adoption. It is fluency." (move from Chapter 1 pull quote)
3. Remove the three layers from Chapter 2 (already moved to Chapter 1 in Task 5)
4. Add Anthropic's Four Ds fluency framework

**Files:**
- Modify: `virginia-futures.html` (Chapter 2 break + content)
- Modify: sidebar nav label

- [ ] **Step 1:** Change chapter break h2 from "Four Levels of AI Engagement" to "The Fluency Variable"
- [ ] **Step 2:** Update sidebar nav from "Four Levels" to "Fluency"
- [ ] **Step 3:** Open chapter with fluency-vs-adoption framing, pulled up from Chapter 1
- [ ] **Step 4:** Remove the opening paragraph about "three distinct layers" (moved to Ch1)
- [ ] **Step 5:** Verify flow, commit

---

### Task 7: Four As - Modalities Not Levels

Remove all progressive/numbered language. Present as four co-equal modalities of engagement.

**Current:** Numbered 1-4, called "A Progressive Framework," described as "levels"
**New:** Unordered, called "Four Modes of AI Engagement," no numbers, no progression language

**Files:**
- Modify: `virginia-futures.html` (Four As section, ~lines 157-192)
- Modify: `virginia-futures.css` (`.four-as-number` -> `.four-as-letter`, remove sequential styling)

- [ ] **Step 1:** Change h4 from "The Four As: A Progressive Framework" to "The Four As: Modes of Engagement"
- [ ] **Step 2:** Change subtitle from "Four levels of AI engagement, from information retrieval to autonomous operation." to "Four modes of AI engagement. Not sequential. Not hierarchical. Any business can enter at any point."
- [ ] **Step 3:** Replace numbered spans with letter "A" spans (already using `.four-as-letter` in HTML but CSS has `.four-as-number`)
- [ ] **Step 4:** Remove "The majority of Virginia's SMBs operate between Asking and Automating" paragraph (implies progression)
- [ ] **Step 5:** Rewrite the connecting text to emphasize modalities
- [ ] **Step 6:** Commit

---

### Task 8: Add Anthropic's Four Ds Fluency Framework

Add the Anthropic framework (Delegation, Description, Discernment, Diligence) to Chapter 2. This is essential context for the fluency argument.

**Source:** Anthropic AI Fluency Framework (Dakan, Feller & Anthropic, 2025). Already used in BuildFirst site.

**Files:**
- Modify: `virginia-futures.html` (add after Four As section in Chapter 2)

- [ ] **Step 1:** Add a new section after the Four As: "Measuring Fluency: The Four Ds"
- [ ] **Step 2:** Create a visual card layout for the 4 Ds:
  - **Delegation** — Knowing what to hand off to AI and what to keep
  - **Description** — Communicating what you need with clarity and precision
  - **Discernment** — Evaluating AI output: good, mediocre, or dangerous
  - **Diligence** — Verifying, governing, and building the trust layer
- [ ] **Step 3:** Add credit line: "From Anthropic's AI Fluency Framework (Dakan, Feller & Anthropic, 2025)"
- [ ] **Step 4:** Connect the Four As (what you do with AI) to the Four Ds (how well you do it). The As are modes; the Ds measure fluency within each mode.
- [ ] **Step 5:** Commit

---

### Task 9: Inoculation Effect Rewrite (Scenario 2)

**Current (lines 55-67 of scenario-software-does-it-for-you.html):**
```html
<blockquote class="inline-quote fade-in">
  <p>&ldquo;She has tried AI. It is filed.&rdquo;</p>
  <cite>&mdash; The inoculation effect</cite>
</blockquote>
<p class="fade-in">She does not try Claude. She does not explore what else AI can do. She has tried AI. It is filed.</p>
```

**Problem:** "It is filed the inoculation effect" is unclear. The intent: she tried AI, found it helpful but not transformative, and mentally filed it away as "done." The reader has to work too hard.

**New version:**
```html
<p class="fade-in">Lisa does not try Claude. She does not explore what else AI can do. The Toast features were helpful, genuinely useful, and entirely unremarkable. She has encountered AI. In her mind, she now knows what it does. The door to deeper curiosity closed the moment a mediocre experience answered the question she did not know she was asking.</p>

<div class="callout-card fade-in">
  <h4>The Inoculation Effect</h4>
  <p>When a business owner's first AI encounter is a vendor-shipped feature that works but does not transform, it satisfies curiosity without revealing capability. The experience is good enough to close the question ("I've tried AI") but not good enough to open the next one ("What else could it do?"). A mediocre first encounter kills exploration more effectively than no encounter at all.</p>
</div>
```

**Files:**
- Modify: `scenario-software-does-it-for-you.html:55-67`
- Modify: `virginia-futures.html` (same section in the inline scenario)

- [ ] **Step 1:** Replace the quote + paragraph in both files with the new version
- [ ] **Step 2:** Update the figcaption below to match
- [ ] **Step 3:** Commit

---

### Task 10: Scenario 1 - Remove "The Positive Scenario" Label

**Current:** `<p>The positive scenario. AI fluency spreads broadly...</p>`
**New:** Remove "The positive scenario." entirely. Or: "A scenario where AI fluency spreads broadly..."

**Files:**
- Modify: `virginia-futures.html` (scenario 1 break, ~line 292)
- Modify: `scenario-build-it-yourself.html:35`

- [ ] **Step 1:** Change both instances from "The positive scenario." to just the description
- [ ] **Step 2:** Commit

---

### Task 11: Remove the Virginia Map

Remove the SVG map and its container. Keep the Weldon Cooper Center demographic taxonomy reference.

**Files:**
- Modify: `virginia-futures.html` (remove `#virginia-map-container` usage, keep Weldon Cooper text)
- Note: `virginia-regions.svg` and `virginia-regions-inline.html` can remain as files but should not be referenced

- [ ] **Step 1:** Remove map container div from the HTML
- [ ] **Step 2:** Keep the Weldon Cooper Center reference paragraph
- [ ] **Step 3:** Commit

---

## Chunk 2: Navigation & Interactive UI

### Task 12: Scenario Page Navigation - Hamburger/Sidebar

Replace the horizontal header nav on scenario pages with a hamburger menu or slide-out sidebar. The current `site-header-nav` with inline links looks crowded with 4 scenario names.

**Design:** Hamburger icon (top right) that opens a slide-out panel with all scenarios listed vertically. Clean, minimal, matches the Marginalia aesthetic.

**Files:**
- Modify: `scenario-build-it-yourself.html` (replace header nav)
- Modify: `scenario-software-does-it-for-you.html`
- Modify: `scenario-pockets-of-excellence.html`
- Modify: `scenario-the-widening-gap.html`
- Modify: `virginia-futures.css` (add hamburger + slide-out styles)

- [ ] **Step 1:** Add hamburger icon markup to each scenario page header (replace inline nav links)
- [ ] **Step 2:** Add slide-out overlay panel HTML with all scenario links + "Main Report" link
- [ ] **Step 3:** Add CSS for hamburger icon, overlay, slide animation
- [ ] **Step 4:** Add JS toggle behavior
- [ ] **Step 5:** Test on mobile and desktop
- [ ] **Step 6:** Commit

---

### Task 13: Shell Methodology - Inline Interactive Reference

The Shell methodology reference should be interactive and inline, not just a passing mention. Readers should be able to learn about it without leaving the page.

**Implementation:** Expandable inline card. When the user sees "Shell methodology" or "Shell's scenario planning methodology," they can click to expand a brief explanation.

**Content for the expandable:**
> Shell's scenario planning methodology was developed at Royal Dutch Shell in the early 1970s by Pierre Wack and Ted Newland. Rather than forecasting a single future, the method identifies critical uncertainties and constructs multiple plausible futures. The goal is not prediction but preparation: making strategic decisions that perform well across different outcomes. The method has been refined through five decades of corporate and government application.

**Files:**
- Modify: `virginia-futures.html` (hero section, Chapter 4 intro)
- Modify: `virginia-futures.css` (add `.inline-expandable` styles)

- [ ] **Step 1:** Add `.inline-expandable` CSS (underline, expand animation)
- [ ] **Step 2:** Wrap "Shell methodology" text in hero with expandable markup
- [ ] **Step 3:** Wrap "Shell's scenario planning methodology" in Chapter 4 similarly
- [ ] **Step 4:** Add JS for expand/collapse
- [ ] **Step 5:** Commit

---

### Task 14: Methodology & Data Sources - Inline Interactive

Move methodology and data sources from the footer into inline interactive elements throughout the text. The footer versions can remain as a fallback, but the primary experience should be contextual.

**Files:**
- Modify: `virginia-futures.html`
- Modify: all scenario pages (footer section)

- [ ] **Step 1:** Add inline expandable data source references where stats are cited (e.g., "39.4% adoption" links to source)
- [ ] **Step 2:** Add inline expandable methodology references where methodology is mentioned
- [ ] **Step 3:** Keep footer as summary/fallback
- [ ] **Step 4:** Commit

---

## Chunk 3: AI-Powered Personalized Analysis (The Big Build)

### Task 15: Design the Personalized Analysis Experience

The user enters a URL (their business website) and receives a tailored scenario analysis based on:
- Industry classification (derived from website content)
- Regional context (Virginia geography)
- Business size/type indicators
- Which scenario elements are most relevant to their business

**Architecture:**
- Frontend: Form on virginia-futures.html (replace the "Coming Soon" callout)
- Backend: Claude API call via a lightweight serverless function (or client-side with API key for MVP)
- Output: Rendered inline on the page, styled to match the Marginalia design

**For MVP (today's build):**
- Client-side Claude API call (API key in a simple proxy or environment variable)
- Scrape the URL content (or have user describe their business if scraping is blocked)
- Send to Claude with a structured prompt that classifies industry, region, and generates scenario-specific insights
- Render the analysis in a styled container

**Files:**
- Create: `analysis.js` (Claude API integration, form handling, rendering)
- Modify: `virginia-futures.html` (replace "Coming Soon" with live form)
- Modify: `virginia-futures.css` (add analysis result styles)

- [ ] **Step 1:** Design the form UI: URL input + optional location dropdown + optional industry dropdown
- [ ] **Step 2:** Design the output template: industry classification, regional context, scenario relevance scores, specific implications
- [ ] **Step 3:** Build the prompt template for Claude:
  ```
  You are analyzing a Virginia business for the Virginia AI Futures scenario analysis.

  Business website content: {scraped_content}
  Location: {location}

  Provide:
  1. Industry classification
  2. Regional context (which Virginia region, Weldon Cooper taxonomy)
  3. For each of the four scenarios, rate relevance (high/medium/low) and provide 2-3 specific implications for this business
  4. The most likely scenario trajectory for this business type
  5. Three specific actions this business should consider

  Use the Four As framework (Asking, Automating, Augmenting, Agency) and Four Ds (Delegation, Description, Discernment, Diligence) where relevant.
  ```
- [ ] **Step 4:** Implement the API proxy (simple Cloudflare Worker or similar)
- [ ] **Step 5:** Build the client-side form submission and loading state
- [ ] **Step 6:** Build the result renderer with Marginalia styling
- [ ] **Step 7:** Test with 3-5 real Virginia business URLs
- [ ] **Step 8:** Commit

---

### Task 16: Leading Indicators Dashboard

Each scenario has a "How You'd Know This Is Happening" section. Build a lightweight dashboard that shows current real-world signals for each indicator.

**Design:** A visual scorecard showing which scenario's leading indicators are currently active. Not real-time data (that would require APIs), but a curated, manually-updated assessment with dates.

**Implementation for MVP:**
- JSON data file with indicator states
- Visual dashboard rendered from the JSON
- Periodically updated (monthly)

**Files:**
- Create: `indicators.json` (indicator data)
- Create: `dashboard.js` (render logic)
- Modify: `virginia-futures.html` (add dashboard section, possibly in Chapter 5 / Implications)
- Modify: `virginia-futures.css` (dashboard styles)

**Indicator structure per scenario:**
```json
{
  "scenario": "Build It Yourself",
  "indicators": [
    {
      "signal": "Chamber conversations shift to 'What are you using?'",
      "status": "emerging",  // not-yet | emerging | active | strong
      "evidence": "Anecdotal reports from Richmond and NoVA chambers",
      "last_updated": "2026-03-16"
    }
  ]
}
```

- [ ] **Step 1:** Extract all leading indicators from the four scenarios' "How You'd Know" sections
- [ ] **Step 2:** Create `indicators.json` with current assessment for each
- [ ] **Step 3:** Build dashboard UI: four scenario columns, indicators as rows with status dots (red/amber/green)
- [ ] **Step 4:** Add the dashboard to the Implications chapter or as a new section
- [ ] **Step 5:** Style to match Marginalia (use existing `.data-row` patterns)
- [ ] **Step 6:** Test and commit

---

## Chunk 4: Industry Reference Data Review

### Task 17: Audit Industry Reference Data

David raised: "I'm not 100% sure of this industry reference data." Before the AI analysis goes live, audit the industry data used in the scenarios.

**Files to audit:**
- `virginia-futures.html` (Chapter 3 industry data, accordion items)
- `virginia-futures-content.md` (source content)

- [ ] **Step 1:** Extract all specific industry claims (firm counts, percentages, revenue figures)
- [ ] **Step 2:** Cross-reference against cited sources (BLS, Virginia Employment Commission, Weldon Cooper)
- [ ] **Step 3:** Flag any claims that cannot be verified
- [ ] **Step 4:** If the AI-powered analysis replaces the need for static industry data, note which sections can be simplified
- [ ] **Step 5:** Document findings, commit

---

## Execution Notes

**Phase 1 (Tasks 1-11):** Content and text changes. Can be executed immediately. These are all modifications to existing HTML files.

**Phase 2 (Tasks 12-14):** Navigation and interactive UI. Requires CSS and JS additions.

**Phase 3 (Tasks 15-16):** AI-powered features. Requires Claude API integration. Task 15 is the priority build for today.

**Phase 4 (Task 17):** Data audit. Can run in parallel with anything.

**Dependencies:**
- Task 5 must complete before Task 6 (layers move affects Chapter 2 restructure)
- Task 6 must complete before Task 8 (Chapter 2 opening must be restructured before adding 4Ds)
- Tasks 1-4 are independent and can run in parallel
- Tasks 12-14 are independent of content changes
- Task 15 depends on Task 8 (4Ds framework must be in place for the analysis prompt)
