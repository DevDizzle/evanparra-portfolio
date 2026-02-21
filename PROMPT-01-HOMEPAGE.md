# PROMPT-01: Rebuild Homepage as Fractional AI Engineer Funnel

## Context
We're pivoting evanparra.ai from an ML portfolio site to a single-offer fractional AI engineer site. One offer: $4,500/month, no contract, cancel anytime. Every page drives to one action: book a 15-minute intro call.

## Copy Rules (apply to ALL text)
- Write for the buyer. They don't care about your tech stack. They care about problems going away.
- No em dashes. Use periods or commas.
- Contractions always. Short sentences. Punchy.
- Never say: "leverage," "robust," "game-changer," "cutting-edge," "innovative solutions," "AI Native Operating System"
- Lead with outcomes, not architecture
- Specificity sells: real numbers, real examples

## Google Calendar Link (used for ALL booking CTAs)
```
https://calendar.app.google/CjhZR1dr31gkfhCQ8
```

---

## Task 1: Update SiteHeader Navigation

**File:** `src/components/SiteHeader.astro`

Replace the navItems array with:
```typescript
const navItems: NavItem[] = [
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'About', href: '/about' },
  { label: 'For Partners', href: '/partners' },
];
```

Change the header brand text:
- From: `Evan Parra` | `ML Engineer`
- To: `Evan Parra` | `Fractional AI Engineer`

Change the CTA button:
- From: `Work With Me` linking to `/contact`
- To: `Book a Call` linking to `/book`

Keep the phone number link. Keep mobile menu functionality.

---

## Task 2: Rebuild Homepage

**File:** `src/pages/index.astro`

Replace the entire file with:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import ChatWidget from '../components/ChatWidget';

const title = "Fractional AI Engineer | $4,500/mo | Evan Parra";
const description = "Your fractional AI engineer. $4,500/month. No contract. I embed in your business and build the automations you need. Cancel anytime.";

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Evan Parra — Fractional AI Engineer',
  url: 'https://evanparra.ai',
  logo: 'https://evanparra.ai/assets/evan-parra-headshot.png',
  description: description,
  priceRange: '$4,500/month',
  founder: {
    '@type': 'Person',
    name: 'Evan Parra',
    jobTitle: 'Fractional AI Engineer',
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'Florida Atlantic University' }
    ],
    hasCredential: [
      { '@type': 'EducationalOccupationalCredential', credentialCategory: 'degree', name: 'MS in Artificial Intelligence' },
      { '@type': 'EducationalOccupationalCredential', credentialCategory: 'certificate', name: 'Google Certified Professional Machine Learning Engineer' }
    ]
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-904-615-6418',
    contactType: 'sales',
    areaServed: 'US',
    availableLanguage: 'en'
  },
  areaServed: [
    { '@type': 'Country', name: 'United States' },
    { '@type': 'State', name: 'Florida' }
  ],
  sameAs: [
    'https://www.linkedin.com/in/evanparra',
    'https://github.com/DevDizzle',
    'https://x.com/ParraEvan'
  ]
};
---

<BaseLayout title={title} description={description}>
  <script type="application/ld+json" set:html={JSON.stringify(structuredData)} slot="head" />

  <!-- HERO -->
  <section class="bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 text-white relative overflow-hidden">
    <div class="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
    <div class="container py-24 md:py-32 relative z-10">
      <div class="max-w-4xl mx-auto text-center">
        <p class="text-primary-400 font-mono text-sm mb-6 tracking-wider uppercase">
          Fractional AI Engineer
        </p>
        <h1 class="text-4xl md:text-7xl font-bold leading-tight tracking-tight mb-8">
          Your AI Engineer.<br/>
          <span class="text-primary-400">$4,500/month.</span><br/>
          No Contract.
        </h1>
        <p class="mt-6 text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          I embed in your business and build the automations, tools, and AI workflows you need. Cancel anytime. You own everything I build.
        </p>
        <div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://calendar.app.google/CjhZR1dr31gkfhCQ8" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-500 transition-all shadow-lg shadow-primary-900/20 text-lg">
            Book a 15-Min Intro Call
          </a>
        </div>
        <p class="mt-6 text-sm text-slate-500">No pitch deck. No pressure. Just a conversation about what you need.</p>
      </div>
    </div>
  </section>

  <!-- VALUE PROPS -->
  <section class="py-20 bg-white">
    <div class="container">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-4">Why businesses hire me instead of...</h2>
        <div class="grid md:grid-cols-3 gap-8 mt-12">

          <div class="bg-slate-50 rounded-2xl p-8 border border-slate-200">
            <div class="text-4xl mb-4">💰</div>
            <h3 class="text-xl font-bold text-slate-900 mb-3">Cheaper Than Hiring</h3>
            <p class="text-slate-600 leading-relaxed">
              A junior dev costs $6-8K/month loaded. A senior AI engineer? $12-15K. You get senior talent for $4,500. No recruiting fees. No benefits overhead. No HR drama.
            </p>
          </div>

          <div class="bg-slate-50 rounded-2xl p-8 border border-slate-200">
            <div class="text-4xl mb-4">🔓</div>
            <h3 class="text-xl font-bold text-slate-900 mb-3">Zero Risk</h3>
            <p class="text-slate-600 leading-relaxed">
              No contract. No commitment. If you don't see value, cancel anytime. You own all the code, all the docs, all the infrastructure. Nothing held hostage.
            </p>
          </div>

          <div class="bg-slate-50 rounded-2xl p-8 border border-slate-200">
            <div class="text-4xl mb-4">🔧</div>
            <h3 class="text-xl font-bold text-slate-900 mb-3">I Build Whatever You Need</h3>
            <p class="text-slate-600 leading-relaxed">
              No SOWs. No change orders. No scope negotiations. You tell me the problem, I build the solution. Automations, integrations, AI tools, data pipelines. Whatever moves the needle.
            </p>
          </div>

        </div>
      </div>
    </div>
  </section>

  <!-- HOW IT WORKS -->
  <section class="py-20 bg-slate-50 border-y border-slate-200">
    <div class="container">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-4">How It Works</h2>
        <p class="text-center text-slate-500 mb-12 text-lg">Three steps. No complexity.</p>

        <div class="space-y-8">
          <div class="flex gap-6 items-start">
            <div class="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">1</div>
            <div>
              <h3 class="text-xl font-bold text-slate-900 mb-2">We Talk (15 minutes)</h3>
              <p class="text-slate-600">You tell me what's eating your team's time. I tell you what I'd automate first and how fast I can do it. If it's not a fit, no hard feelings.</p>
            </div>
          </div>

          <div class="flex gap-6 items-start">
            <div class="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">2</div>
            <div>
              <h3 class="text-xl font-bold text-slate-900 mb-2">Trial Sprint (2 weeks)</h3>
              <p class="text-slate-600">I start with your highest-impact problem and deliver a working solution. You see real results before you commit to anything ongoing.</p>
            </div>
          </div>

          <div class="flex gap-6 items-start">
            <div class="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">3</div>
            <div>
              <h3 class="text-xl font-bold text-slate-900 mb-2">Ongoing ($4,500/month)</h3>
              <p class="text-slate-600">If you see the value, we keep going. I visit on-site once a month. Available on Slack or WhatsApp the rest of the time. The system gets smarter every month. You'll wonder how you ran without it.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- MINI CASE STUDIES -->
  <section class="py-20 bg-white">
    <div class="container">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-4">What I've Built</h2>
        <p class="text-center text-slate-500 mb-12 text-lg">Real businesses. Real results.</p>

        <div class="grid md:grid-cols-2 gap-8">

          <a href="/case-studies#gammarips" class="block bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:border-primary-300 hover:shadow-lg transition-all">
            <p class="text-sm font-mono text-primary-600 mb-2 uppercase tracking-wider">Financial Intelligence</p>
            <h3 class="text-xl font-bold text-slate-900 mb-3">GammaRips</h3>
            <p class="text-slate-600">Built an AI-native financial intelligence platform from zero. Scans 5,000+ stocks nightly, generates trade analysis, and delivers reports automatically. $50/month infrastructure cost.</p>
            <p class="mt-4 text-primary-600 font-semibold text-sm">Read the full story →</p>
          </a>

          <a href="/case-studies#wealth-management" class="block bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:border-primary-300 hover:shadow-lg transition-all">
            <p class="text-sm font-mono text-primary-600 mb-2 uppercase tracking-wider">Wealth Management</p>
            <h3 class="text-xl font-bold text-slate-900 mb-3">$4B AUM Advisory Firm</h3>
            <p class="text-slate-600">Automating K-1 document processing, fund portal scraping, and Salesforce integration. Giving every advisor an AI assistant that knows the firm's policies and clients.</p>
            <p class="mt-4 text-primary-600 font-semibold text-sm">Read the full story →</p>
          </a>

          <a href="/case-studies#diamond-braces" class="block bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:border-primary-300 hover:shadow-lg transition-all">
            <p class="text-sm font-mono text-primary-600 mb-2 uppercase tracking-wider">Healthcare</p>
            <h3 class="text-xl font-bold text-slate-900 mb-3">Diamond Braces (40+ Locations)</h3>
            <p class="text-slate-600">Building AI automation across 40+ dental locations. Patient communication, scheduling optimization, and operational intelligence that scales with the business.</p>
            <p class="mt-4 text-primary-600 font-semibold text-sm">Read the full story →</p>
          </a>

          <a href="/case-studies#chisme" class="block bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:border-primary-300 hover:shadow-lg transition-all">
            <p class="text-sm font-mono text-primary-600 mb-2 uppercase tracking-wider">E-Commerce</p>
            <h3 class="text-xl font-bold text-slate-900 mb-3">Chisme Lifestyle</h3>
            <p class="text-slate-600">AI scraped the brand's website, understood the aesthetic, wrote on-brand copy, attached a lifestyle image, and posted to social media. Under 2 minutes.</p>
            <p class="mt-4 text-primary-600 font-semibold text-sm">Read the full story →</p>
          </a>

        </div>
      </div>
    </div>
  </section>

  <!-- SOCIAL PROOF STATS -->
  <section class="py-16 bg-slate-900 text-white">
    <div class="container">
      <div class="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-12 md:gap-20">
        <div class="text-center">
          <p class="text-3xl md:text-4xl font-bold text-primary-400">5+</p>
          <p class="text-sm text-slate-400 mt-1">Years Production AI</p>
        </div>
        <div class="text-center">
          <p class="text-3xl md:text-4xl font-bold text-primary-400">MS + PhD</p>
          <p class="text-sm text-slate-400 mt-1">AI Research (FAU)</p>
        </div>
        <div class="text-center">
          <p class="text-3xl md:text-4xl font-bold text-primary-400">Google</p>
          <p class="text-sm text-slate-400 mt-1">Certified ML Engineer</p>
        </div>
        <div class="text-center">
          <p class="text-3xl md:text-4xl font-bold text-primary-400">$4,500</p>
          <p class="text-sm text-slate-400 mt-1">/mo. No Contract.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- FINAL CTA -->
  <section class="py-20 bg-white">
    <div class="container">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Ready to stop hiring and start building?</h2>
        <p class="text-xl text-slate-500 mb-8">
          15 minutes. No pitch deck. Just tell me what's broken and I'll tell you how I'd fix it.
        </p>
        <a href="https://calendar.app.google/CjhZR1dr31gkfhCQ8" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center bg-primary-600 text-white px-10 py-4 rounded-xl font-semibold hover:bg-primary-500 transition-all shadow-lg shadow-primary-900/20 text-lg">
          Book Your Intro Call
        </a>
        <p class="mt-4 text-sm text-slate-400">Or call directly: <a href="tel:9046156418" class="text-primary-600 hover:underline">(904) 615-6418</a></p>
      </div>
    </div>
  </section>

</BaseLayout>
```

---

## Task 3: Update BaseLayout Structured Data

**File:** `src/layouts/BaseLayout.astro`

In the structuredData object, update:
- `name`: `'Evan Parra — Fractional AI Engineer'`
- `description`: `'Your fractional AI engineer. $4,500/month. No contract. I embed in your business and build the automations you need.'`
- `jobTitle`: `'Fractional AI Engineer'`
- Remove the old `areaServed` array limited to St. Augustine area. Replace with:
```javascript
areaServed: [
  { '@type': 'Country', name: 'United States' },
  { '@type': 'State', name: 'Florida' }
]
```

---

## Task 4: Update Footer

**File:** `src/components/Footer.astro`

Update any tagline from "AI Consulting" or "ML Engineer" to:
```
Fractional AI Engineer | $4,500/mo | No Contract
```

Update footer nav links to match the new site structure:
- Case Studies (`/case-studies`)
- About (`/about`)
- For Partners (`/partners`)
- Book a Call (`/book`)
- Privacy (`/privacy`)
- Terms (`/terms`)

---

## Task 5: Archive Old Pages

Move these files to `src/pages/_archive/`:
- `src/pages/services/ai-advisory.astro`
- `src/pages/services/autonomous-agent-systems.astro`
- `src/pages/services/data-engineering.astro`
- `src/pages/services/index.astro`
- `src/pages/services/local-automation-audits.astro`
- `src/pages/services/ml-pipeline-architecture.astro`
- `src/pages/projects/index.astro`
- `src/pages/st-augustine-ai-consulting.astro`
- `src/pages/blog/index.astro`
- `src/pages/blog/[...slug].astro`
- `src/pages/blog/view.astro`
- `src/pages/contact.astro`

Do NOT delete them. Move to `_archive/` folder so Astro ignores them.
