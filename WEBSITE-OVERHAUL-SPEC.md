# WEBSITE-OVERHAUL-SPEC.md — EvanParra.ai Fractional AI Engineer Site

*Created: 2026-02-21*
*Goal: Convert evanparra.ai from ML portfolio site to single-funnel fractional AI engineer site*
*Timeline: 2-3 days max. Evan needs 7+ days to sell.*
*Conversion action: Book a 15-minute intro call via Google Calendar*

---

## The One Clear Promise

**"Your fractional AI engineer. $4,500/month. No contract. I show up and build whatever you need."**

Every page ladders up to this. Every section ends with "Book a call." Nothing else matters.

---

## Copywriting Rules (Applied Everywhere)

Adapted from Brian Moran's 7 Rules:

1. **Write for the buyer, not yourself.** The client doesn't care about your stack. They care about their problems going away.
2. **Kill generic language.** No "cutting-edge," "innovative," "solutions." Specifics only.
3. **Make them feel what it's like to work with you.** Paint the picture. Month 1 feels like X. Month 3 feels like Y.
4. **Put the most important information first.** Price, offer, CTA. Then proof. Then details.
5. **Use your customer's actual words.** "I need someone to automate this" not "intelligent process optimization."
6. **Don't describe the architecture.** Describe the outcome. NEVER mention AI Native OS, six layers, knowledge layer, etc.
7. **One offer, one clear promise.** $4,500/month. I build whatever you need. Book a call.

**Voice rules:**
- Contractions always. "I'll" not "I will." "You're" not "You are."
- No em dashes. Use periods or commas.
- Short sentences. Punchy paragraphs.
- Human, direct, confident. Not corporate. Not salesy.
- Specificity sells: "saved 40 hours/month" beats "improved efficiency."
- Never say: "leverage," "robust," "game-changer," "cutting-edge," "innovative solutions"

---

## New Site Structure

### Pages to BUILD

| Page | Route | Purpose |
|------|-------|---------|
| **Home** | `/` | Single funnel page. Hero, value props, how it works, mini case studies, CTA |
| **Case Studies** | `/case-studies` | 4 detailed case studies. Proof the offer works. |
| **About** | `/about` | Evan's story reframed for fractional model. Credibility. |
| **For Sales Reps** | `/partners` | Dedicated landing for referral partners. Commission structure. |
| **Book a Call** | `/book` | Google Calendar embed. The conversion page. |
| **Privacy** | `/privacy` | Keep existing, minor updates |
| **Terms** | `/terms` | Keep existing, minor updates |

### Pages/Routes to KILL

| Route | Why |
|-------|-----|
| `/projects` | Portfolio showcase. Not relevant to fractional offer. |
| `/services/*` (all 6 pages) | Old service tiers are dead. One offer now. |
| `/blog/*` | Deprioritized. Can add back later. |
| `/st-augustine-ai-consulting` | Old local SEO page. Replaced by new home. |
| `/contact` | Replaced by `/book` (calendar) + chat widget |

### Components to KEEP
- `ChatWidget.tsx` — Update prompt, keep the widget
- `BaseLayout.astro` — Update structured data
- `SiteHeader.astro` — Update nav links
- `Footer.astro` — Update links and tagline
- `BookingSection.astro` — Repurpose for calendar embed

### Components to KILL
- `VisionPlayground.tsx` — Tech demo, not relevant
- `ProjectGrid.tsx` — Portfolio grid, not relevant
- `ServicesSection.astro` — Old service tiers
- `CaseStudyCarousel.tsx` — Replace with new case studies page
- `CaseStudiesSection.astro` — Replace
- `LocalWins.astro` — Old local proof section
- `ContactForm.astro` — Replaced by calendar
- `BookingForm.tsx` — Replaced by calendar
- `AgentBookingChat.tsx` — Replaced by ChatWidget updates
- `BlogList.tsx` / `BlogPostViewer.tsx` — Blog killed for now
- `PostCaseStudiesCta.astro` — Old CTA

### Components to CREATE
- `HeroFractional.astro` — New hero section
- `ValueProps.astro` — 3 value prop cards
- `HowItWorks.astro` — 3-step process
- `MiniCaseStudies.astro` — Homepage case study cards
- `CalendarEmbed.astro` — Google Calendar embed component
- `FinalCta.astro` — Reusable bottom CTA section

### Data Files to UPDATE
- `src/data/caseStudies.ts` — Rewrite with new case studies
- `src/data/services.ts` — Delete or empty (no more service tiers)

### Files to ARCHIVE (move to `src/pages/_archive/`)
- All `/services/*.astro` pages
- `/projects/index.astro`
- `/st-augustine-ai-consulting.astro`
- `/blog/index.astro`, `/blog/[...slug].astro`, `/blog/view.astro`
- `/contact.astro`

---

## SEO Strategy

Even though this is outreach/referral driven, basic SEO costs nothing:

**Target keywords:**
- "fractional AI engineer"
- "fractional AI engineer Florida"
- "AI automation for small business"
- "hire AI engineer monthly"

**Implementation:**
- Meta title: "Fractional AI Engineer | $4,500/mo | Evan Parra"
- Meta description: "Your fractional AI engineer. $4,500/month. No contract. I embed in your business and build the automations you need. Cancel anytime."
- Structured data: Update from ProfessionalService to Person + Service
- H1: Contains primary keyword naturally
- Alt tags on images
- Local business schema (South Florida)

---

## Chat Widget Updates

Update `functions/src/agent.ts` system prompt:
- New identity: "Evan's AI assistant" (not "AI Receptionist")
- Sells the fractional offer
- Knows case studies
- Drives toward booking a call
- Answers objections (cost, commitment, scope)
- Never discusses technical architecture or AI Native OS
- Google Calendar link: https://calendar.app.google/CjhZR1dr31gkfhCQ8

---

## Google Calendar Link

Used everywhere as the conversion action:
```
https://calendar.app.google/CjhZR1dr31gkfhCQ8
```

---

## ABOUT_EVAN.md Updates

This file powers the chat agent's knowledge base. Must reflect:
- Fractional AI engineer model ($4,500/mo, no contract)
- PhD researcher at FAU (Dr. Fernando Koch, multi-agent systems)
- Updated case studies
- No more hourly rates or tier-based pricing

---

## Prompt Execution Order

Run these in sequence with Firebase agent:

1. `PROMPT-01-HOMEPAGE.md` — Homepage + nav + hero + funnel page
2. `PROMPT-02-CASE-STUDIES.md` — Case studies page
3. `PROMPT-03-ABOUT-AND-BOOKING.md` — About page + Book page + ABOUT_EVAN.md
4. `PROMPT-04-SALES-REP-PAGE.md` — Partners/sales rep page
5. `PROMPT-05-CHAT-AGENT-UPDATE.md` — Chat widget system prompt

Each prompt is self-contained. Firebase agent can execute them independently.

---

*Ship it. 10 days. 10 deals.*
