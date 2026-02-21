# PROMPT-03: About Page + Booking Page + ABOUT_EVAN.md Update

## Context
EvanParra.ai is a fractional AI engineer site. $4,500/month, no contract. This prompt covers three things: the About page, the Book a Call page, and updating the ABOUT_EVAN.md knowledge base file that powers the chat agent.

## Copy Rules
- Human story. Not a resume.
- Contractions. Short sentences. No em dashes.
- Lead with what matters to the buyer: credibility, track record, real person.
- No corporate speak. No "passionate about leveraging AI."

## Google Calendar Link
```
https://calendar.app.google/CjhZR1dr31gkfhCQ8
```

---

## Task 1: Rebuild About Page

**File:** `src/pages/about.astro`

Replace entire file with:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';

const title = "About Evan Parra | Fractional AI Engineer";
const description = "ML engineer, PhD researcher, Google certified. I stopped building AI for slide decks and started installing it in real businesses.";

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Evan Parra',
  jobTitle: 'Fractional AI Engineer',
  url: 'https://evanparra.ai/about',
  image: 'https://evanparra.ai/assets/evan-parra-headshot.png',
  sameAs: [
    'https://www.linkedin.com/in/evanparra',
    'https://github.com/DevDizzle',
    'https://x.com/ParraEvan'
  ],
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Florida Atlantic University', description: 'MS in Artificial Intelligence' },
    { '@type': 'CollegeOrUniversity', name: 'Florida International University', description: 'BA Economics' }
  ],
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    name: 'Google Certified Professional Machine Learning Engineer'
  },
  knowsAbout: ['Machine Learning', 'AI Agents', 'Data Engineering', 'Computer Vision', 'GCP', 'Python']
};
---

<BaseLayout title={title} description={description}>
  <script type="application/ld+json" set:html={JSON.stringify(structuredData)} slot="head" />

  <!-- Hero -->
  <section class="py-20 bg-slate-900 text-white">
    <div class="container max-w-4xl mx-auto text-center">
      <h1 class="text-4xl md:text-5xl font-bold mb-6">About Evan</h1>
      <p class="text-xl text-slate-400 max-w-2xl mx-auto">
        I got tired of building AI that lived in slide decks. So I started installing it in real businesses.
      </p>
    </div>
  </section>

  <!-- Main Content -->
  <section class="py-16 bg-white">
    <div class="container max-w-4xl mx-auto">
      <div class="grid md:grid-cols-3 gap-12">

        <!-- Bio -->
        <div class="md:col-span-2 prose prose-slate">
          <h2>The Short Version</h2>
          <p>
            I'm Evan Parra. I'm a fractional AI engineer based in South Florida. For $4,500 a month, I embed in your business and build the AI systems you need. Automations, integrations, data pipelines, AI tools for your team. Whatever moves the needle. No contract. Cancel anytime.
          </p>

          <h2>The Longer Version</h2>
          <p>
            I spent years building ML systems for large companies. Predictive models, data warehouses, computer vision systems, ETL pipelines. The kind of work that sounds impressive on a resume but lives in corporate infrastructure nobody sees.
          </p>
          <p>
            Then I built GammaRips. An entire AI-native financial intelligence business from scratch. Automated pipeline that scans 5,000+ stocks every night, generates analysis, and delivers reports. Zero manual intervention. $50/month infrastructure cost. That project taught me something: AI isn't just a tool. It's an operating model.
          </p>
          <p>
            Now I take that same approach and install it in other businesses. Not as a consultant who delivers a PDF. Not as a freelancer who disappears after the project. As a fractional engineer who embeds with your team, learns your operations, and builds systems that get smarter every month.
          </p>

          <h2>Credentials</h2>
          <ul>
            <li><strong>MS in Artificial Intelligence</strong>, Florida Atlantic University (3.73 GPA, 2025)</li>
            <li><strong>PhD Researcher</strong>, FAU Generative Intelligence Lab. Researching multi-agent systems under Dr. Fernando Koch. Focus: how AI agents behave when they work together at scale.</li>
            <li><strong>Google Certified Professional Machine Learning Engineer</strong></li>
            <li><strong>BA Economics</strong>, Florida International University</li>
          </ul>

          <h2>What I've Built</h2>
          <ul>
            <li><strong>GammaRips:</strong> AI-native financial intelligence platform. Autonomous pipeline, multi-agent analysis, automated content delivery.</li>
            <li><strong>Healthcare Data Warehouse:</strong> BigQuery infrastructure unifying Shopify, fulfillment, and marketing data for a $1M+ revenue e-commerce health company.</li>
            <li><strong>Predictive Customer Models:</strong> CLV and churn models for a waste management company with 20+ locations. 60% campaign ROI improvement.</li>
            <li><strong>Computer Vision Systems:</strong> Custom ResNet50, MobileNet, and Vertex AI AutoML deployments for medical image classification.</li>
            <li><strong>Wealth Management Automation:</strong> K-1 processing, portal scraping, Salesforce integration for a $4B AUM advisory firm.</li>
          </ul>

          <h2>Industries</h2>
          <p>
            Healthcare, financial services, e-commerce, waste management, dental (multi-location), wealth management. The common thread: businesses with too much manual work and not enough engineering talent to fix it.
          </p>

          <h2>How I Work</h2>
          <ul>
            <li>$4,500/month. Your fee. Infrastructure costs are separate and transparent.</li>
            <li>On-site once a month. Travel expenses covered by you.</li>
            <li>Available async on Slack or WhatsApp between visits.</li>
            <li>No contract. Month to month. Cancel anytime.</li>
            <li>You own everything I build. Code, docs, infrastructure. Clean handoff if you ever leave.</li>
          </ul>
        </div>

        <!-- Sidebar -->
        <div class="space-y-8">
          <!-- Photo placeholder -->
          <div class="bg-slate-100 rounded-2xl p-1 border border-slate-200">
            <img src="/assets/evan-parra-headshot.png" alt="Evan Parra" class="rounded-xl w-full" />
          </div>

          <!-- Quick Facts -->
          <div class="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <h3 class="font-bold text-slate-900 mb-4">Quick Facts</h3>
            <ul class="space-y-3 text-sm text-slate-600">
              <li><strong>Based:</strong> South Florida</li>
              <li><strong>Education:</strong> MS AI (FAU), BA Econ (FIU)</li>
              <li><strong>Research:</strong> PhD, FAU Gen Intel Lab</li>
              <li><strong>Cert:</strong> Google ML Engineer</li>
              <li><strong>Experience:</strong> 5+ years production AI</li>
              <li><strong>Rate:</strong> $4,500/month</li>
              <li><strong>Contract:</strong> None. Cancel anytime.</li>
            </ul>
          </div>

          <!-- CTA -->
          <div class="bg-primary-600 rounded-2xl p-6 text-white text-center">
            <h3 class="font-bold text-lg mb-3">Let's talk</h3>
            <p class="text-primary-100 text-sm mb-4">15 minutes. No pitch. Just a conversation about what you need.</p>
            <a href="https://calendar.app.google/CjhZR1dr31gkfhCQ8" target="_blank" rel="noopener noreferrer" class="inline-block bg-white text-primary-600 font-semibold px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors w-full">
              Book a Call
            </a>
          </div>
        </div>

      </div>
    </div>
  </section>

</BaseLayout>
```

---

## Task 2: Create Booking Page

**File:** `src/pages/book.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';

const title = "Book a Call | Evan Parra | Fractional AI Engineer";
const description = "Book a free 15-minute intro call. Tell me what's broken, I'll tell you how I'd fix it.";
---

<BaseLayout title={title} description={description}>

  <section class="py-20 bg-slate-900 text-white">
    <div class="container max-w-3xl mx-auto text-center">
      <h1 class="text-4xl md:text-5xl font-bold mb-6">Book a Call</h1>
      <p class="text-xl text-slate-400 max-w-2xl mx-auto">
        15 minutes. No pitch deck. No pressure. Tell me what's eating your team's time and I'll tell you what I'd build first.
      </p>
    </div>
  </section>

  <section class="py-16 bg-white">
    <div class="container max-w-4xl mx-auto">

      <!-- What to expect -->
      <div class="mb-12 max-w-2xl mx-auto">
        <h2 class="text-2xl font-bold text-slate-900 mb-6 text-center">What to Expect</h2>
        <div class="space-y-4 text-slate-600">
          <div class="flex gap-4 items-start">
            <span class="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold text-sm">1</span>
            <p>You tell me about your business and what's taking too much time or costing too much money.</p>
          </div>
          <div class="flex gap-4 items-start">
            <span class="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold text-sm">2</span>
            <p>I tell you what I'd automate first and how quickly I can get it done.</p>
          </div>
          <div class="flex gap-4 items-start">
            <span class="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold text-sm">3</span>
            <p>If it's a fit, we start with a 2-week trial sprint. If not, no hard feelings.</p>
          </div>
        </div>
      </div>

      <!-- Calendar Embed -->
      <div class="bg-slate-50 rounded-2xl p-4 border border-slate-200">
        <iframe
          src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0-CjhZR1dr31gkfhCQ8?gv=true"
          style="border: 0"
          width="100%"
          height="600"
          frameborder="0"
          loading="lazy"
        ></iframe>
      </div>

      <!-- Fallback -->
      <div class="mt-8 text-center">
        <p class="text-slate-500 mb-2">Calendar not loading?</p>
        <a href="https://calendar.app.google/CjhZR1dr31gkfhCQ8" target="_blank" rel="noopener noreferrer" class="text-primary-600 font-semibold hover:underline">
          Open booking link directly →
        </a>
        <p class="mt-4 text-slate-400 text-sm">
          Or call: <a href="tel:9046156418" class="text-primary-600 hover:underline">(904) 615-6418</a>
          · Email: <a href="mailto:admin@evanparra.ai" class="text-primary-600 hover:underline">admin@evanparra.ai</a>
        </p>
      </div>

    </div>
  </section>

</BaseLayout>
```

**Note:** The iframe `src` URL may need adjustment. Google Calendar appointment scheduling embeds use a specific URL format. If the iframe doesn't render correctly, replace with a simple centered link/button to the booking URL instead:

```html
<div class="text-center py-12">
  <a href="https://calendar.app.google/CjhZR1dr31gkfhCQ8" target="_blank" rel="noopener noreferrer"
     class="inline-flex items-center justify-center bg-primary-600 text-white px-10 py-4 rounded-xl font-semibold hover:bg-primary-500 transition-all shadow-lg text-lg">
    Choose a Time on Google Calendar
  </a>
</div>
```

---

## Task 3: Update ABOUT_EVAN.md

**File:** `ABOUT_EVAN.md`

Replace the entire file with:

```markdown
# About Evan Parra — Agent Knowledge Base

## Bio
Evan Parra is a Fractional AI Engineer based in South Florida. For $4,500/month, he embeds in your business and builds AI systems, automations, integrations, and tools. No contract. Cancel anytime. 5+ years of experience turning complex problems into production systems that run themselves.

## Background
- MS in Artificial Intelligence (Florida Atlantic University, 2025, 3.73 GPA)
- PhD Researcher at FAU's Generative Intelligence Lab (advisor: Dr. Fernando Koch). Researching multi-agent systems and how AI agents behave at scale.
- Google Certified Professional Machine Learning Engineer
- BA Economics (Florida International University)
- Production experience: ML pipelines, autonomous agents, data warehouses, computer vision, RAG systems
- GCP specialist: BigQuery, Vertex AI, Cloud Run, Cloud Functions, Pub/Sub
- Industries: healthcare, financial services, e-commerce, waste management, dental, wealth management
- Full-stack: Python, TypeScript, Next.js, FastAPI, Docker

## The Offer
- **Price:** $4,500/month (Evan's fee only)
- **Infrastructure:** Client pays providers directly (cloud, APIs, tokens). No markup. Evan recommends the cheapest effective stack.
- **Contract:** None. Month-to-month. Cancel anytime.
- **On-site:** 1 visit/month (client covers travel + expenses)
- **Async:** Available via Slack, WhatsApp, or email between visits
- **Scope:** Whatever the business needs. Automations, integrations, AI tools, data pipelines.
- **Ownership:** Client owns all code, docs, and infrastructure. Nothing held hostage.
- **Trial:** 2-week trial sprint on highest-impact project before committing to ongoing.

## Notable Work
- **GammaRips:** Autonomous AI-native financial intelligence platform. Scans 5,000+ stocks nightly, generates trade analysis, delivers reports. Zero manual intervention. $50/mo infrastructure cost.
- **Wealth Management ($4B AUM):** Automating K-1 document processing, fund portal scraping, Salesforce integration, and building AI assistants for every advisor.
- **Diamond Braces (40+ locations):** AI automation for patient communication, scheduling optimization, and operational intelligence across all locations.
- **Chisme Lifestyle:** AI content automation. Product photo to published social media post in under 2 minutes. On-brand copy + lifestyle imagery.
- **Healthcare Data Warehouse:** BigQuery infrastructure unifying Shopify + fulfillment + marketing for $1M+ annual revenue company.
- **Predictive Models:** CLV/churn models for waste management company (20+ locations). 60% campaign ROI improvement.
- **Computer Vision:** ResNet50, MobileNet, Vertex AI AutoML for medical image classification (maculacutis.com).

## Why Hire Evan Instead Of...
- **A full-time hire:** $6-8K/mo for a junior. $12-15K for senior. Evan is $4,500 with senior skills and no HR overhead.
- **A consulting firm:** They deliver a PDF for $50-100K. Evan delivers working systems for $4,500/mo.
- **A freelancer:** They disappear after the project. Evan stays embedded and the system keeps getting smarter.
- **SaaS tools:** Zapier breaks on edge cases. Evan builds systems that handle complexity and exercise judgment.

## Availability
- Currently accepting new clients
- Typical start: 2-week trial sprint within 1-2 weeks of intro call
- Available via Slack/WhatsApp async between monthly on-site visits

## Contact
- Email: admin@evanparra.ai
- Phone: (904) 615-6418
- Booking: https://calendar.app.google/CjhZR1dr31gkfhCQ8
- Location: South Florida (travels to clients monthly)

## What I Don't Do
- Staff augmentation or body shop contracts
- Projects without clear business impact
- "AI strategy" decks without implementation
- Work where I can't own the technical execution
- 24/7 on-call support (this is engineering, not an SLA)

## Booking Instructions
If someone wants to book a call:
1. Direct them to the booking link: https://calendar.app.google/CjhZR1dr31gkfhCQ8
2. It's a free 15-minute intro call
3. They describe their business and biggest pain points
4. Evan tells them what he'd automate first and how fast
5. If it's a fit, they start with a 2-week trial sprint

## Objection Handling
- "That's expensive." → It's cheaper than hiring. A junior dev costs $6-8K loaded. A senior AI engineer? $12-15K. And there's no contract. Cancel anytime.
- "What if it doesn't work?" → That's what the 2-week trial sprint is for. You see real results before committing to anything ongoing.
- "Can you do [specific thing]?" → Probably yes. Evan has built ML pipelines, data warehouses, computer vision systems, automated content engines, document processors, CRM integrations, and AI assistants. If it involves data or AI, he can build it.
- "We're not sure what we need." → That's normal. The intro call is exactly for that. Evan will map your workflows and tell you where the biggest wins are.
- "Do you work remotely?" → Mostly yes. One on-site visit per month (you cover travel). Available on Slack/WhatsApp the rest of the time.
```
