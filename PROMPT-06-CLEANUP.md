# PROMPT-06: Cleanup — About Page Fixes + Case Study Detail Pages

## Context
EvanParra.ai is live. This prompt fixes content issues and adds depth. The site is a fractional AI engineer funnel. $4,500/month, no contract. Every page drives to booking a call.

## Copy Rules
- No em dashes. Contractions. Short sentences.
- Lead with outcomes, not architecture.
- Never mention "AI Native Operating System" or internal delivery frameworks.
- Real numbers only. No hallucinated metrics.

## Google Calendar Link
```
https://calendar.app.google/CjhZR1dr31gkfhCQ8
```

---

## IMPORTANT: Language Corrections Across ALL Pages

The following language rules apply to EVERY file touched in this prompt AND any previously created pages:

1. **Wealth Management:** Do NOT say "currently working with" or "$4B AUM." Say "Designed an AI automation system for a wealth advisory firm." Describe the CAPABILITIES (K-1 automation, portal scraping, Salesforce integration, AI assistants for advisors) without implying an active signed client.
2. **Diamond Braces / Multi-Location Healthcare:** Do NOT name "Diamond Braces." Say "a 40+ location healthcare company." Describe the USE CASE (patient communication, scheduling, operations) without implying an active signed client.
3. **PhD:** Do NOT say "PhD Researcher." Say "Collaborating with Dr. Fernando Koch at FAU's Generative Intelligence Lab on multi-agent systems research." Evan is working on a research proposal, not enrolled.
4. **GammaRips, Macula Cutis, Rapid CPAP:** These are REAL, completed projects. Use strong present/past tense. Lean into these hard.

If any previously created pages (index.astro, case-studies.astro, about.astro, partners.astro, book.astro) contain language that violates these rules, fix them in this pass.

Specifically check and fix:
- `src/pages/index.astro` — homepage mini case studies cards (change "$4B AUM Advisory Firm" to "Wealth Management Firm", change "Diamond Braces" to "Multi-Location Healthcare", remove any "In Progress" badges, fix any "currently" language, fix PhD to "Collaborating with" language in stats section)
- `src/pages/case-studies.astro` — same fixes on the main case studies page
- `src/pages/about.astro` — fix PhD reference from "PhD Researcher" to "Collaborating with Dr. Fernando Koch at FAU's Generative Intelligence Lab on multi-agent systems research. Pursuing PhD admission."
- `src/pages/partners.astro` — check for any client claims that imply signed deals

---

## Task 1: Fix About Page Content

**File:** `src/pages/about.astro`

Find the "What I've Built" section (or equivalent list of projects/work) and replace with:

```html
<h2>What I've Built</h2>
<ul>
  <li><strong>GammaRips:</strong> AI-native financial intelligence platform. Autonomous pipeline scans 5,000+ stocks nightly, generates trade analysis, delivers reports across web, email, and WhatsApp. Zero manual intervention. $50/month infrastructure.</li>
  <li><strong>Wealth Management Automation:</strong> Designed and scoped an AI automation system for a wealth advisory firm. K-1 document processing, fund portal scraping, Salesforce integration, and AI assistants that advisors can query in plain English for policy and compliance information.</li>
  <li><strong>Macula Cutis (Dermatology AI):</strong> Built a computer vision system for a dermatologist to detect malignant skin lesions. Trained on 10,000+ dermoscopic images across 7 diagnostic categories. 94.28% precision and recall. Deployed on Google Vertex AI with heatmap overlays showing areas of concern.</li>
  <li><strong>Healthcare Data Warehouse (Rapid CPAP):</strong> Built BigQuery data warehouse unifying Shopify, fulfillment, and marketing data for a $1M+ annual revenue e-commerce health company. Automated reporting and business intelligence.</li>
  <li><strong>Multi-Location Healthcare:</strong> Designed AI automation for a 40+ location dental company. Patient communication, scheduling optimization, and operational intelligence that scales across every office.</li>
  <li><strong>Chisme Lifestyle (E-commerce):</strong> AI content automation. Product photo to published social media post in under 2 minutes with on-brand copy and lifestyle imagery.</li>
</ul>
```

IMPORTANT: Remove any reference to "Predictive Customer Models: CLV and churn models for a waste management company with 20+ locations. 60% campaign ROI improvement." This was incorrect. Replace it with the Macula Cutis and Rapid CPAP entries above.

Also update the "Industries" paragraph:
```html
<h2>Industries</h2>
<p>
  Healthcare, financial services, e-commerce, dental (multi-location), wealth management, dermatology. The common thread: businesses with too much manual work and not enough engineering talent to fix it.
</p>
```

---

## Task 2: Create Individual Case Study Pages

Create a new directory structure for case study detail pages.

### File: `src/pages/case-studies/gammarips.astro`

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';

const title = "Case Study: GammaRips | AI-Native Financial Intelligence";
const description = "Built an entire AI-native financial intelligence business from zero. 5,000+ stocks scanned nightly. Zero manual intervention.";
---

<BaseLayout title={title} description={description}>

  <section class="py-20 bg-slate-900 text-white">
    <div class="container max-w-4xl mx-auto">
      <a href="/case-studies" class="text-primary-400 text-sm hover:underline mb-4 inline-block">← All Case Studies</a>
      <p class="text-sm font-mono text-primary-400 mb-2 uppercase tracking-wider">Financial Intelligence</p>
      <h1 class="text-4xl md:text-5xl font-bold mb-6">GammaRips: Built an AI-Native Business From Zero</h1>
      <p class="text-xl text-slate-400">I didn't just consult on AI. I built and ran an entire AI-native financial intelligence business.</p>
    </div>
  </section>

  <section class="py-16 bg-white">
    <div class="container max-w-4xl mx-auto prose prose-slate prose-lg">

      <h2>The Challenge</h2>
      <p>Retail traders can't see what institutional money is doing. The data exists, buried in options flow across 5,000+ tickers, but nobody has time to scan it all manually. Existing tools cost $500+/month and require deep options expertise to interpret.</p>

      <h2>What I Built</h2>
      <p>GammaRips is a fully autonomous financial intelligence platform. Every night, the system:</p>
      <ol>
        <li>Scans 5,000+ stocks for unusual institutional options activity</li>
        <li>Scores each signal 1-10 based on conviction (volume, open interest, dollar flow, clustering)</li>
        <li>Enriches top signals with AI-generated trade analysis, technical indicators, and news context</li>
        <li>Runs a multi-agent debate (3 AI models argue bull vs bear on each signal)</li>
        <li>Generates and delivers a morning report before market open</li>
      </ol>
      <p>The entire pipeline runs without human intervention. Scanning, scoring, enriching, debating, writing, delivering. Every step is automated.</p>

      <h2>The Tech</h2>
      <ul>
        <li>Python, GCP (BigQuery, Cloud Run, Firestore, Cloud Scheduler)</li>
        <li>Polygon.io API for market data</li>
        <li>Gemini (with Google Search grounding) for news analysis</li>
        <li>Multi-agent debate system: Grok (momentum), Gemini (contrarian), Claude (risk manager)</li>
        <li>Firebase for web app, Stripe for subscriptions</li>
      </ul>

      <h2>Results</h2>
      <div class="not-prose grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
        <div class="bg-slate-50 rounded-lg p-4 text-center border border-slate-200">
          <p class="text-2xl font-bold text-primary-600">5,000+</p>
          <p class="text-sm text-slate-500">Stocks scanned nightly</p>
        </div>
        <div class="bg-slate-50 rounded-lg p-4 text-center border border-slate-200">
          <p class="text-2xl font-bold text-primary-600">60%</p>
          <p class="text-sm text-slate-500">Signal win rate</p>
        </div>
        <div class="bg-slate-50 rounded-lg p-4 text-center border border-slate-200">
          <p class="text-2xl font-bold text-primary-600">$50/mo</p>
          <p class="text-sm text-slate-500">Total infrastructure</p>
        </div>
        <div class="bg-slate-50 rounded-lg p-4 text-center border border-slate-200">
          <p class="text-2xl font-bold text-primary-600">Zero</p>
          <p class="text-sm text-slate-500">Manual intervention</p>
        </div>
      </div>

      <h2>Why This Matters for Your Business</h2>
      <p>GammaRips proves that AI can run real business operations autonomously. Not a demo. Not a proof of concept. A production system that scans, analyzes, writes, and delivers every single day without anyone touching it.</p>
      <p>The same approach works for your business. Document processing, reporting, customer communication, data analysis. If it's repetitive and rule-based, it can be automated. If it requires judgment, AI can assist.</p>

    </div>
  </section>

  <section class="py-16 bg-slate-900 text-white">
    <div class="container max-w-3xl mx-auto text-center">
      <h2 class="text-3xl font-bold mb-6">Want this kind of system in your business?</h2>
      <p class="text-xl text-slate-400 mb-8">15 minutes. Tell me what's eating your team's time.</p>
      <a href="https://calendar.app.google/CjhZR1dr31gkfhCQ8" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center bg-primary-600 text-white px-10 py-4 rounded-xl font-semibold hover:bg-primary-500 transition-all shadow-lg text-lg">
        Book Your Intro Call
      </a>
    </div>
  </section>

</BaseLayout>
```

### File: `src/pages/case-studies/wealth-management.astro`

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';

const title = "Case Study: Wealth Management AI Automation";
const description = "AI automation for wealth management: K-1 document processing, fund portal scraping, Salesforce integration, and AI assistants for advisors.";
---

<BaseLayout title={title} description={description}>

  <section class="py-20 bg-slate-900 text-white">
    <div class="container max-w-4xl mx-auto">
      <a href="/case-studies" class="text-primary-400 text-sm hover:underline mb-4 inline-block">← All Case Studies</a>
      <p class="text-sm font-mono text-primary-400 mb-2 uppercase tracking-wider">Wealth Management</p>
      <h1 class="text-4xl md:text-5xl font-bold mb-6">Wealth Management: AI for Every Advisor</h1>
    </div>
  </section>

  <section class="py-16 bg-white">
    <div class="container max-w-4xl mx-auto prose prose-slate prose-lg">

      <h2>The Problem</h2>
      <p>Wealth management firms bleed hours on manual operations. Advisors log into 10+ fund admin portals daily to check for updates. K-1 documents get processed by hand across dozens of portals. Salesforce data entry consumes hours that should be spent with clients.</p>
      <p>Most firms have a small tech team but no AI expertise. They know automation could help but don't know where to start.</p>

      <h2>What I Designed</h2>
      <ul>
        <li><strong>K-1 Document Automation:</strong> AI reads, extracts, and processes K-1 documents from multiple fund admin portals. What used to take hours per document now takes seconds.</li>
        <li><strong>Portal Scraping:</strong> Automated scrapers log into fund admin portals, check for new documents and updates, and flag what needs attention. Advisors stop wasting time on manual portal checks.</li>
        <li><strong>Salesforce Integration:</strong> Data flows automatically from documents and portals into Salesforce. No more manual data entry. No more stale records.</li>
        <li><strong>AI Assistant for Advisors:</strong> Every advisor gets an AI assistant they can ask questions in plain English. "What's our policy on alternative investments for accounts over $5M?" The system knows the compliance handbook, investment policy statements, and custodian rules. Answers accurately with citations.</li>
      </ul>

      <h2>Projected Impact</h2>
      <div class="not-prose grid grid-cols-2 md:grid-cols-3 gap-4 my-8">
        <div class="bg-slate-50 rounded-lg p-4 text-center border border-slate-200">
          <p class="text-2xl font-bold text-primary-600">40+</p>
          <p class="text-sm text-slate-500">Hours/month saved on K-1s</p>
        </div>
        <div class="bg-slate-50 rounded-lg p-4 text-center border border-slate-200">
          <p class="text-2xl font-bold text-primary-600">90%</p>
          <p class="text-sm text-slate-500">Less manual portal checking</p>
        </div>
        <div class="bg-slate-50 rounded-lg p-4 text-center border border-slate-200">
          <p class="text-2xl font-bold text-primary-600">Instant</p>
          <p class="text-sm text-slate-500">Policy answers for advisors</p>
        </div>
      </div>

      <h2>Why This Matters</h2>
      <p>By month 3, every advisor has an AI assistant that knows the firm's compliance handbook, client policies, and fund structures. They ask a question, they get an accurate answer. No more hunting through SharePoint. No more calling compliance and waiting for a callback.</p>
      <p>The system compounds. Every document processed adds to its knowledge. Every question answered improves future responses. Month 1 it knows the basics. Month 6 it knows more about the firm's operations than any single employee.</p>

    </div>
  </section>

  <section class="py-16 bg-slate-900 text-white">
    <div class="container max-w-3xl mx-auto text-center">
      <h2 class="text-3xl font-bold mb-6">Running a financial services firm?</h2>
      <p class="text-xl text-slate-400 mb-8">This is the kind of system I build. Let's talk about yours.</p>
      <a href="https://calendar.app.google/CjhZR1dr31gkfhCQ8" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center bg-primary-600 text-white px-10 py-4 rounded-xl font-semibold hover:bg-primary-500 transition-all shadow-lg text-lg">
        Book Your Intro Call
      </a>
    </div>
  </section>

</BaseLayout>
```

### File: `src/pages/case-studies/macula-cutis.astro`

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';

const title = "Case Study: Macula Cutis | AI Skin Lesion Detection for Dermatology";
const description = "Built a computer vision system achieving 94.28% precision and recall for detecting malignant skin lesions across 7 diagnostic categories.";
---

<BaseLayout title={title} description={description}>

  <section class="py-20 bg-slate-900 text-white">
    <div class="container max-w-4xl mx-auto">
      <a href="/case-studies" class="text-primary-400 text-sm hover:underline mb-4 inline-block">← All Case Studies</a>
      <p class="text-sm font-mono text-primary-400 mb-2 uppercase tracking-wider">Healthcare / Computer Vision</p>
      <h1 class="text-4xl md:text-5xl font-bold mb-6">Macula Cutis: AI That Spots Skin Cancer</h1>
      <p class="text-xl text-slate-400">94.28% precision. 10,000+ training images. 7 lesion categories. Deployed for clinical use.</p>
    </div>
  </section>

  <section class="py-16 bg-white">
    <div class="container max-w-4xl mx-auto prose prose-slate prose-lg">

      <h2>The Challenge</h2>
      <p>Dermatologists analyze dermoscopic images to identify potentially malignant skin lesions. The process is time-consuming and inherently subjective. A single clinic might review hundreds of images per week. Early detection of melanoma is critical, but human reviewers can miss subtle patterns, especially under time pressure.</p>
      <p>A dermatologist wanted a tool that could provide objective, data-driven analysis to support clinical judgment. Not replace the doctor. Augment them.</p>

      <h2>What I Built</h2>
      <p>Macula Cutis is a web application that uses computer vision to analyze dermoscopic images and classify skin lesions across 7 diagnostic categories:</p>
      <ul>
        <li>Melanoma</li>
        <li>Basal cell carcinoma</li>
        <li>Benign keratosis</li>
        <li>Dermatofibroma</li>
        <li>Melanocytic nevi</li>
        <li>Vascular lesions</li>
        <li>Actinic keratoses</li>
      </ul>
      <p>The clinician uploads a dermoscopic image. The system returns classification predictions with confidence scores and heatmap overlays that visually highlight the areas of concern. Up to 5 predictions per image, ranked by confidence.</p>

      <h2>The Tech</h2>
      <ul>
        <li><strong>Model:</strong> Google AutoML Vision on Vertex AI</li>
        <li><strong>Training data:</strong> HAM10000 dataset from the ISIC Archive (~10,015 dermoscopic images)</li>
        <li><strong>Deployment:</strong> Vertex AI endpoint (us-central1), authenticated access</li>
        <li><strong>Output:</strong> Classification label, confidence score, heatmap overlay per prediction</li>
      </ul>

      <h2>Results</h2>
      <div class="not-prose grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
        <div class="bg-slate-50 rounded-lg p-4 text-center border border-slate-200">
          <p class="text-2xl font-bold text-primary-600">94.28%</p>
          <p class="text-sm text-slate-500">Precision</p>
        </div>
        <div class="bg-slate-50 rounded-lg p-4 text-center border border-slate-200">
          <p class="text-2xl font-bold text-primary-600">94.28%</p>
          <p class="text-sm text-slate-500">Recall</p>
        </div>
        <div class="bg-slate-50 rounded-lg p-4 text-center border border-slate-200">
          <p class="text-2xl font-bold text-primary-600">0.978</p>
          <p class="text-sm text-slate-500">PR AUC</p>
        </div>
        <div class="bg-slate-50 rounded-lg p-4 text-center border border-slate-200">
          <p class="text-2xl font-bold text-primary-600">10,000+</p>
          <p class="text-sm text-slate-500">Training images</p>
        </div>
      </div>

      <h2>Why This Matters for Your Business</h2>
      <p>This project shows what happens when you apply production ML to a real clinical workflow. Not a research paper. Not a Jupyter notebook. A deployed system that a doctor uses to support diagnosis.</p>
      <p>The same approach applies to any business where humans visually inspect things: quality control on a manufacturing line, property inspections in real estate, compliance verification on job sites, inventory counting in warehouses. If someone is "looking at things" as part of their job, computer vision can help.</p>

      <p class="text-sm text-slate-400 mt-8">Note: Macula Cutis is a clinical decision support tool. It does not replace professional medical judgment. All classifications should be reviewed by a qualified dermatologist.</p>

    </div>
  </section>

  <section class="py-16 bg-slate-900 text-white">
    <div class="container max-w-3xl mx-auto text-center">
      <h2 class="text-3xl font-bold mb-6">Have a visual inspection problem?</h2>
      <p class="text-xl text-slate-400 mb-8">Computer vision works for healthcare, manufacturing, real estate, and more.</p>
      <a href="https://calendar.app.google/CjhZR1dr31gkfhCQ8" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center bg-primary-600 text-white px-10 py-4 rounded-xl font-semibold hover:bg-primary-500 transition-all shadow-lg text-lg">
        Book Your Intro Call
      </a>
    </div>
  </section>

</BaseLayout>
```

### File: `src/pages/case-studies/diamond-braces.astro`

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';

const title = "Case Study: Multi-Location Healthcare AI Automation";
const description = "AI automation for multi-location healthcare: patient communication, scheduling optimization, and operational intelligence at scale.";
---

<BaseLayout title={title} description={description}>

  <section class="py-20 bg-slate-900 text-white">
    <div class="container max-w-4xl mx-auto">
      <a href="/case-studies" class="text-primary-400 text-sm hover:underline mb-4 inline-block">← All Case Studies</a>
      <p class="text-sm font-mono text-primary-400 mb-2 uppercase tracking-wider">Healthcare / Multi-Location</p>
      <h1 class="text-4xl md:text-5xl font-bold mb-6">Multi-Location Healthcare: AI at Scale</h1>
    </div>
  </section>

  <section class="py-16 bg-white">
    <div class="container max-w-4xl mx-auto prose prose-slate prose-lg">

      <h2>The Challenge</h2>
      <p>When a healthcare company operates 40+ locations, small inefficiencies multiply fast. Each location handles scheduling independently. Patient communication is inconsistent. Operational data is siloed across offices with no centralized view.</p>
      <p>Staff at every location spend hours on administrative tasks that could be automated. That's thousands of hours per year across the organization that aren't being spent on patient care.</p>

      <h2>What I Build for Multi-Location Companies</h2>
      <ul>
        <li><strong>Patient Communication:</strong> Automated, consistent messaging across all locations. Appointment reminders, follow-ups, and intake processes that work the same whether you're at the Manhattan office or the Brooklyn one.</li>
        <li><strong>Scheduling Optimization:</strong> AI that learns from scheduling patterns to reduce no-shows, optimize chair time, and balance load across locations.</li>
        <li><strong>Operational Dashboard:</strong> Centralized intelligence across all 40+ locations. Real-time visibility into performance, bottlenecks, and opportunities.</li>
        <li><strong>Admin Automation:</strong> The repetitive paperwork, data entry, and reporting that eats staff time gets handled by AI so the team can focus on patients.</li>
      </ul>

      <h2>Why Multi-Location Businesses Need This</h2>
      <p>When you're running one location, inefficiencies are annoying. When you're running 40, they're expensive. A 30-minute daily inefficiency at one office is 1,000+ hours per year across the organization.</p>
      <p>This kind of system scales with the business. Add a new location, the automation is already there. The processes are consistent. The data flows in. No retraining. No new hires for admin.</p>

    </div>
  </section>

  <section class="py-16 bg-slate-900 text-white">
    <div class="container max-w-3xl mx-auto text-center">
      <h2 class="text-3xl font-bold mb-6">Running multiple locations?</h2>
      <p class="text-xl text-slate-400 mb-8">Let's talk about what automation looks like at scale.</p>
      <a href="https://calendar.app.google/CjhZR1dr31gkfhCQ8" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center bg-primary-600 text-white px-10 py-4 rounded-xl font-semibold hover:bg-primary-500 transition-all shadow-lg text-lg">
        Book Your Intro Call
      </a>
    </div>
  </section>

</BaseLayout>
```

### File: `src/pages/case-studies/chisme-lifestyle.astro`

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';

const title = "Case Study: Chisme Lifestyle | AI Content Automation for E-Commerce";
const description = "Product photo to published social media post in under 2 minutes. On-brand copy and lifestyle imagery, fully automated.";
---

<BaseLayout title={title} description={description}>

  <section class="py-20 bg-slate-900 text-white">
    <div class="container max-w-4xl mx-auto">
      <a href="/case-studies" class="text-primary-400 text-sm hover:underline mb-4 inline-block">← All Case Studies</a>
      <p class="text-sm font-mono text-primary-400 mb-2 uppercase tracking-wider">E-Commerce / Content Automation</p>
      <h1 class="text-4xl md:text-5xl font-bold mb-6">Chisme Lifestyle: Product Photo to Social Post in 2 Minutes</h1>
    </div>
  </section>

  <section class="py-16 bg-white">
    <div class="container max-w-4xl mx-auto prose prose-slate prose-lg">

      <h2>The Challenge</h2>
      <p>Chisme Lifestyle is a Latin-inspired artisan accessories brand. Beautiful products. Zero bandwidth for content creation. Every social media post was a manual grind: write copy, find images, match the brand voice, schedule, publish. Repeat.</p>
      <p>Hiring a social media manager costs $2-5K/month. For a small e-commerce brand, that's a significant chunk of revenue going to content instead of product.</p>

      <h2>What I Built</h2>
      <p>An AI content automation system that:</p>
      <ol>
        <li>Scraped the brand's website to learn the aesthetic, tone, and product catalog</li>
        <li>Understood the brand voice from existing content and descriptions</li>
        <li>Generates on-brand copy for each product</li>
        <li>Creates lifestyle imagery that matches the brand's visual identity</li>
        <li>Posts to social media automatically</li>
      </ol>
      <p>Upload a product photo. Get a published social media post with on-brand copy and lifestyle imagery. Two minutes.</p>

      <h2>Results</h2>
      <div class="not-prose grid grid-cols-2 gap-4 my-8">
        <div class="bg-slate-50 rounded-lg p-4 text-center border border-slate-200">
          <p class="text-2xl font-bold text-primary-600">2 min</p>
          <p class="text-sm text-slate-500">Photo to published post</p>
        </div>
        <div class="bg-slate-50 rounded-lg p-4 text-center border border-slate-200">
          <p class="text-2xl font-bold text-primary-600">100%</p>
          <p class="text-sm text-slate-500">On-brand every time</p>
        </div>
      </div>

      <h2>Why This Matters for E-Commerce</h2>
      <p>Content is the bottleneck for every small e-commerce brand. You have great products but can't keep up with the posting schedule. You know you should be on Instagram, TikTok, Pinterest, and X. But there aren't enough hours in the day.</p>
      <p>AI content automation doesn't replace your brand voice. It learns it. Then it produces on-brand content faster than any human could. Your job goes from "create every post from scratch" to "review and approve."</p>

    </div>
  </section>

  <section class="py-16 bg-slate-900 text-white">
    <div class="container max-w-3xl mx-auto text-center">
      <h2 class="text-3xl font-bold mb-6">Running an e-commerce brand?</h2>
      <p class="text-xl text-slate-400 mb-8">Let's automate your content pipeline.</p>
      <a href="https://calendar.app.google/CjhZR1dr31gkfhCQ8" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center bg-primary-600 text-white px-10 py-4 rounded-xl font-semibold hover:bg-primary-500 transition-all shadow-lg text-lg">
        Book Your Intro Call
      </a>
    </div>
  </section>

</BaseLayout>
```

---

## Task 3: Update Case Studies Index Page Links

**File:** `src/pages/case-studies.astro` (created in PROMPT-02)

Update the "Read the full story →" links in each mini case study card:

- GammaRips card: `href="/case-studies/gammarips"`
- Wealth Management card: `href="/case-studies/wealth-management"`
- Multi-Location Healthcare card: `href="/case-studies/diamond-braces"`
- Chisme Lifestyle card: `href="/case-studies/chisme-lifestyle"`

Also add a 5th card for Macula Cutis after the Chisme card:

```html
<a href="/case-studies/macula-cutis" class="block bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:border-primary-300 hover:shadow-lg transition-all">
  <p class="text-sm font-mono text-primary-600 mb-2 uppercase tracking-wider">Healthcare / Computer Vision</p>
  <h3 class="text-xl font-bold text-slate-900 mb-3">Macula Cutis (Dermatology AI)</h3>
  <p class="text-slate-600">Built a computer vision system for a dermatologist to detect malignant skin lesions. 94.28% precision and recall across 7 diagnostic categories. 10,000+ training images. Deployed on Google Vertex AI.</p>
  <p class="mt-4 text-primary-600 font-semibold text-sm">Read the full story →</p>
</a>
```

Also add the Macula Cutis card to the homepage mini case studies section in `src/pages/index.astro`. If the grid is currently 2x2 (md:grid-cols-2), consider keeping 2x2 and adding a "View all case studies" link below, OR switch to a 3-column grid for the first row. Use your judgment on layout.

---

## Task 4: Update ABOUT_EVAN.md for Chat Agent

**File:** `ABOUT_EVAN.md`

In the "Notable Work" section, replace the Coastal Waste CLV entry with:

```markdown
- **Macula Cutis (Dermatology AI):** Computer vision system for skin lesion detection. Trained on HAM10000 dataset (10,000+ dermoscopic images, 7 categories including melanoma and basal cell carcinoma). 94.28% precision and recall, PR AUC 0.978. Deployed on Google Vertex AI with heatmap overlays. Live at maculacutis.com.
- **Rapid CPAP (Healthcare E-commerce):** Built BigQuery data warehouse unifying Shopify + fulfillment + marketing data. Automated reporting and business intelligence for $1M+ annual revenue company.
```

Remove any reference to "Predictive Customer Models" or "CLV/churn models for waste management" or "60% campaign ROI improvement."
