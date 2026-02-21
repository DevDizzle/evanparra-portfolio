# PROMPT-02: Create Case Studies Page

## Context
EvanParra.ai is a fractional AI engineer site. One offer: $4,500/month. This page proves the offer works with real examples. Every case study ends with a CTA to book a call.

## Copy Rules
- Write for the buyer. They want to see themselves in these stories.
- No technical jargon. "Automated document processing" not "ETL pipeline with OCR layer."
- No em dashes. Contractions. Short sentences.
- Before/after format. Make the transformation tangible.
- Real numbers where possible. Projected results clearly marked as "projected."
- Never mention: "AI Native Operating System," "six layers," "knowledge layer"

## Google Calendar Link
```
https://calendar.app.google/CjhZR1dr31gkfhCQ8
```

---

## Task: Create Case Studies Page

**File:** `src/pages/case-studies.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';

const title = "Case Studies | Fractional AI Engineer | Evan Parra";
const description = "Real businesses I've worked with. Real problems solved. See what a fractional AI engineer builds for $4,500/month.";
---

<BaseLayout title={title} description={description}>

  <!-- Hero -->
  <section class="py-20 bg-slate-900 text-white">
    <div class="container max-w-4xl mx-auto text-center">
      <h1 class="text-4xl md:text-5xl font-bold mb-6">Real Businesses. Real Results.</h1>
      <p class="text-xl text-slate-400 max-w-2xl mx-auto">
        Here's what happens when you embed a fractional AI engineer in your business. These are the systems I've built, the problems I've solved, and the results that followed.
      </p>
    </div>
  </section>

  <!-- GammaRips -->
  <section id="gammarips" class="py-20 bg-white border-b border-slate-200">
    <div class="container max-w-4xl mx-auto">
      <p class="text-sm font-mono text-primary-600 mb-2 uppercase tracking-wider">Financial Intelligence</p>
      <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-6">GammaRips: Built an AI-Native Business From Zero</h2>

      <div class="prose prose-slate max-w-none">
        <p class="text-lg text-slate-600 mb-8">
          I didn't just consult on AI. I built and ran an entire AI-native financial intelligence business. GammaRips scans the entire US options market every night and delivers institutional-grade analysis before the market opens.
        </p>

        <div class="grid md:grid-cols-2 gap-8 mb-8">
          <div class="bg-red-50 rounded-xl p-6 border border-red-100">
            <h3 class="text-lg font-bold text-red-800 mb-3">The Problem</h3>
            <ul class="space-y-2 text-red-700">
              <li>Retail traders can't see institutional options flow</li>
              <li>Manual research takes hours and misses patterns</li>
              <li>Existing tools cost $500+/month and require expertise</li>
            </ul>
          </div>
          <div class="bg-green-50 rounded-xl p-6 border border-green-100">
            <h3 class="text-lg font-bold text-green-800 mb-3">What I Built</h3>
            <ul class="space-y-2 text-green-700">
              <li>Automated pipeline scanning 5,000+ stocks nightly</li>
              <li>AI-generated trade analysis with specific contracts</li>
              <li>Multi-channel delivery (web, email, WhatsApp)</li>
              <li>Full subscriber management and billing</li>
            </ul>
          </div>
        </div>

        <h3 class="text-xl font-bold text-slate-900 mb-4">Results</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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
            <p class="text-sm text-slate-500">Total infra cost</p>
          </div>
          <div class="bg-slate-50 rounded-lg p-4 text-center border border-slate-200">
            <p class="text-2xl font-bold text-primary-600">Zero</p>
            <p class="text-sm text-slate-500">Manual intervention</p>
          </div>
        </div>

        <p class="text-slate-600">
          The entire system runs autonomously. Scanning, scoring, enriching, writing analysis, and delivering reports. No human touches the pipeline. That's the kind of system I build for clients.
        </p>
      </div>
    </div>
  </section>

  <!-- Wealth Management -->
  <section id="wealth-management" class="py-20 bg-slate-50 border-b border-slate-200">
    <div class="container max-w-4xl mx-auto">
      <p class="text-sm font-mono text-primary-600 mb-2 uppercase tracking-wider">Wealth Management</p>
      <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-6">$4B AUM Advisory Firm: AI for Every Advisor</h2>
      <span class="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full mb-6">In Progress</span>

      <div class="prose prose-slate max-w-none">
        <p class="text-lg text-slate-600 mb-8">
          A wealth management firm with $4 billion in assets under management needed to modernize operations. Their advisors were spending hours on manual document processing, portal logins, and data entry that should take minutes.
        </p>

        <div class="grid md:grid-cols-2 gap-8 mb-8">
          <div class="bg-red-50 rounded-xl p-6 border border-red-100">
            <h3 class="text-lg font-bold text-red-800 mb-3">The Problems</h3>
            <ul class="space-y-2 text-red-700">
              <li>K-1 documents processed manually across dozens of fund portals</li>
              <li>Advisors logging into 10+ portals daily to check updates</li>
              <li>Salesforce data entry eating hours of advisor time</li>
              <li>Compliance questions answered inconsistently across the firm</li>
            </ul>
          </div>
          <div class="bg-green-50 rounded-xl p-6 border border-green-100">
            <h3 class="text-lg font-bold text-green-800 mb-3">What I'm Building</h3>
            <ul class="space-y-2 text-green-700">
              <li>Automated K-1 document extraction and processing</li>
              <li>Portal scrapers that check for updates across all fund admin sites</li>
              <li>Salesforce integration that keeps itself current</li>
              <li>AI assistant every advisor can ask policy and client questions</li>
            </ul>
          </div>
        </div>

        <h3 class="text-xl font-bold text-slate-900 mb-4">Projected Impact</h3>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div class="bg-slate-100 rounded-lg p-4 text-center border border-slate-200">
            <p class="text-2xl font-bold text-primary-600">40+</p>
            <p class="text-sm text-slate-500">Hours/month saved on K-1s</p>
          </div>
          <div class="bg-slate-100 rounded-lg p-4 text-center border border-slate-200">
            <p class="text-2xl font-bold text-primary-600">90%</p>
            <p class="text-sm text-slate-500">Less manual portal checking</p>
          </div>
          <div class="bg-slate-100 rounded-lg p-4 text-center border border-slate-200">
            <p class="text-2xl font-bold text-primary-600">Instant</p>
            <p class="text-sm text-slate-500">Policy answers for advisors</p>
          </div>
        </div>

        <p class="text-slate-600">
          By month 3, every advisor will have an AI assistant that knows the firm's compliance handbook, client policies, and fund structures. They ask a question in plain English, they get an accurate answer with citations. No more hunting through SharePoint.
        </p>
      </div>
    </div>
  </section>

  <!-- Diamond Braces -->
  <section id="diamond-braces" class="py-20 bg-white border-b border-slate-200">
    <div class="container max-w-4xl mx-auto">
      <p class="text-sm font-mono text-primary-600 mb-2 uppercase tracking-wider">Healthcare</p>
      <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Diamond Braces: AI Across 40+ Locations</h2>
      <span class="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full mb-6">In Progress</span>

      <div class="prose prose-slate max-w-none">
        <p class="text-lg text-slate-600 mb-8">
          Diamond Braces operates 40+ dental locations. When you're running that many locations, small inefficiencies multiply fast. Manual scheduling, inconsistent patient communication, and siloed data across offices add up to thousands of lost hours per year.
        </p>

        <div class="grid md:grid-cols-2 gap-8 mb-8">
          <div class="bg-red-50 rounded-xl p-6 border border-red-100">
            <h3 class="text-lg font-bold text-red-800 mb-3">The Challenges</h3>
            <ul class="space-y-2 text-red-700">
              <li>Patient communication inconsistent across 40+ locations</li>
              <li>Scheduling optimization done manually at each office</li>
              <li>Operational data siloed, no centralized intelligence</li>
              <li>Staff time consumed by repetitive admin tasks</li>
            </ul>
          </div>
          <div class="bg-green-50 rounded-xl p-6 border border-green-100">
            <h3 class="text-lg font-bold text-green-800 mb-3">What I'm Building</h3>
            <ul class="space-y-2 text-green-700">
              <li>Automated patient communication workflows</li>
              <li>Scheduling optimization that learns from patterns</li>
              <li>Centralized operational dashboard across all locations</li>
              <li>AI tools that handle the repetitive work so staff can focus on patients</li>
            </ul>
          </div>
        </div>

        <p class="text-slate-600">
          The goal: every location runs smarter without adding headcount. The system handles the admin, the staff handles the patients. That's what $4,500/month buys a multi-location business.
        </p>
      </div>
    </div>
  </section>

  <!-- Chisme Lifestyle -->
  <section id="chisme" class="py-20 bg-slate-50 border-b border-slate-200">
    <div class="container max-w-4xl mx-auto">
      <p class="text-sm font-mono text-primary-600 mb-2 uppercase tracking-wider">E-Commerce</p>
      <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Chisme Lifestyle: Product Photo to Social Post in 2 Minutes</h2>

      <div class="prose prose-slate max-w-none">
        <p class="text-lg text-slate-600 mb-8">
          Chisme Lifestyle is a Latin-inspired artisan accessories brand. They had beautiful products and zero bandwidth for content creation. Every social media post was a manual grind: write copy, find images, match the brand voice, schedule, publish. Repeat.
        </p>

        <div class="grid md:grid-cols-2 gap-8 mb-8">
          <div class="bg-red-50 rounded-xl p-6 border border-red-100">
            <h3 class="text-lg font-bold text-red-800 mb-3">The Problem</h3>
            <ul class="space-y-2 text-red-700">
              <li>Content creation took hours per post</li>
              <li>Inconsistent brand voice across channels</li>
              <li>Couldn't keep up with posting schedule</li>
              <li>Hiring a social media manager cost $2-5K/month</li>
            </ul>
          </div>
          <div class="bg-green-50 rounded-xl p-6 border border-green-100">
            <h3 class="text-lg font-bold text-green-800 mb-3">What I Built</h3>
            <ul class="space-y-2 text-green-700">
              <li>AI scraped the brand's website to learn the aesthetic</li>
              <li>Understood the brand voice from existing content</li>
              <li>Generated on-brand copy + lifestyle imagery</li>
              <li>Posted to social media automatically</li>
            </ul>
          </div>
        </div>

        <h3 class="text-xl font-bold text-slate-900 mb-4">Results</h3>
        <div class="grid grid-cols-2 gap-4 mb-8">
          <div class="bg-slate-100 rounded-lg p-4 text-center border border-slate-200">
            <p class="text-2xl font-bold text-primary-600">2 min</p>
            <p class="text-sm text-slate-500">Product photo to published post</p>
          </div>
          <div class="bg-slate-100 rounded-lg p-4 text-center border border-slate-200">
            <p class="text-2xl font-bold text-primary-600">100%</p>
            <p class="text-sm text-slate-500">On-brand, every time</p>
          </div>
        </div>

        <p class="text-slate-600">
          Upload a product photo. Get a published social media post with on-brand copy and lifestyle imagery. Two minutes. That's what AI content automation looks like for e-commerce.
        </p>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-20 bg-slate-900 text-white">
    <div class="container">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">Your business could be the next case study.</h2>
        <p class="text-xl text-slate-400 mb-8">
          15 minutes. Tell me what's eating your team's time. I'll tell you exactly what I'd build first.
        </p>
        <a href="https://calendar.app.google/CjhZR1dr31gkfhCQ8" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center bg-primary-600 text-white px-10 py-4 rounded-xl font-semibold hover:bg-primary-500 transition-all shadow-lg text-lg">
          Book Your Intro Call
        </a>
        <p class="mt-4 text-sm text-slate-500">Or call directly: <a href="tel:9046156418" class="text-primary-400 hover:underline">(904) 615-6418</a></p>
      </div>
    </div>
  </section>

</BaseLayout>
```
