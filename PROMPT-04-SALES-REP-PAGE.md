# PROMPT-04: Create Sales Rep / Partners Page

## Context
EvanParra.ai has B2B sales reps who will refer clients. This page is their landing page. It explains the offer they're selling, the commission structure, and has a CTA to schedule a call with Evan to get onboarded.

## Copy Rules
- Professional but energizing. This is a money-making opportunity.
- Concrete numbers. Show the math.
- No em dashes. Short sentences. Contractions.
- Make the commission structure crystal clear.

## Google Calendar Link
```
https://calendar.app.google/CjhZR1dr31gkfhCQ8
```

---

## Task: Create Partners Page

**File:** `src/pages/partners.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';

const title = "For Sales Partners | Evan Parra | Fractional AI Engineer";
const description = "Earn $450/month recurring commission for every client you refer. Simple offer, easy sell, real money.";
---

<BaseLayout title={title} description={description}>

  <!-- Hero -->
  <section class="py-20 bg-slate-900 text-white">
    <div class="container max-w-4xl mx-auto text-center">
      <h1 class="text-4xl md:text-5xl font-bold mb-6">Earn $450/Month Per Client. Recurring.</h1>
      <p class="text-xl text-slate-400 max-w-2xl mx-auto">
        Refer businesses that need AI automation. I close the deal and do the work. You get paid every month they stay.
      </p>
    </div>
  </section>

  <!-- The Offer You're Selling -->
  <section class="py-20 bg-white">
    <div class="container max-w-4xl mx-auto">
      <h2 class="text-3xl font-bold text-slate-900 mb-8 text-center">The Offer You're Selling</h2>

      <div class="bg-slate-50 rounded-2xl p-8 border border-slate-200 max-w-2xl mx-auto mb-12">
        <p class="text-xl text-slate-700 leading-relaxed">
          <strong>"Evan is a fractional AI engineer. $4,500 a month. No contract. He embeds in your business and builds the automations, tools, and AI systems you need. Cancel anytime."</strong>
        </p>
        <p class="mt-4 text-slate-500">That's the whole pitch. One price. One sentence. Yes or no.</p>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-white rounded-xl p-6 border border-slate-200 text-center">
          <p class="text-3xl font-bold text-primary-600 mb-2">$4,500</p>
          <p class="text-slate-500 text-sm">/month. Client's cost.</p>
        </div>
        <div class="bg-white rounded-xl p-6 border border-slate-200 text-center">
          <p class="text-3xl font-bold text-primary-600 mb-2">No Contract</p>
          <p class="text-slate-500 text-sm">Month-to-month. Cancel anytime.</p>
        </div>
        <div class="bg-white rounded-xl p-6 border border-slate-200 text-center">
          <p class="text-3xl font-bold text-primary-600 mb-2">You Own It</p>
          <p class="text-slate-500 text-sm">Client keeps all code and docs.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Commission Structure -->
  <section class="py-20 bg-slate-50 border-y border-slate-200">
    <div class="container max-w-4xl mx-auto">
      <h2 class="text-3xl font-bold text-slate-900 mb-8 text-center">Your Commission</h2>

      <div class="bg-white rounded-2xl p-8 border border-slate-200 max-w-2xl mx-auto mb-12">
        <div class="text-center mb-6">
          <p class="text-5xl font-bold text-primary-600">$450</p>
          <p class="text-xl text-slate-500">per client, per month, recurring</p>
        </div>
        <p class="text-slate-600 text-center">
          That's 10% of the monthly fee. Paid every month the client stays active. Not a one-time referral bonus. Recurring income.
        </p>
      </div>

      <h3 class="text-xl font-bold text-slate-900 mb-6 text-center">Do the Math</h3>
      <div class="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
        <div class="bg-white rounded-xl p-6 border border-slate-200 text-center">
          <p class="text-sm text-slate-400 mb-1">Close 2 clients</p>
          <p class="text-2xl font-bold text-slate-900">$900/mo</p>
          <p class="text-sm text-slate-500">$10,800/year</p>
        </div>
        <div class="bg-white rounded-xl p-6 border border-primary-200 text-center ring-2 ring-primary-100">
          <p class="text-sm text-primary-600 mb-1 font-semibold">Close 5 clients</p>
          <p class="text-2xl font-bold text-slate-900">$2,250/mo</p>
          <p class="text-sm text-slate-500">$27,000/year</p>
        </div>
        <div class="bg-white rounded-xl p-6 border border-slate-200 text-center">
          <p class="text-sm text-slate-400 mb-1">Close 10 clients</p>
          <p class="text-2xl font-bold text-slate-900">$4,500/mo</p>
          <p class="text-sm text-slate-500">$54,000/year</p>
        </div>
      </div>
      <p class="text-center text-slate-500 mt-6 text-sm">Commissions compound. Every client you close keeps paying you every month.</p>
    </div>
  </section>

  <!-- How It Works -->
  <section class="py-20 bg-white">
    <div class="container max-w-4xl mx-auto">
      <h2 class="text-3xl font-bold text-slate-900 mb-8 text-center">How It Works</h2>

      <div class="space-y-6 max-w-2xl mx-auto">
        <div class="flex gap-6 items-start">
          <div class="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
          <div>
            <h3 class="text-lg font-bold text-slate-900 mb-1">You Find the Business</h3>
            <p class="text-slate-600">Any business spending too much time on manual work, data entry, reporting, or content. If they have employees doing repetitive tasks, they're a fit.</p>
          </div>
        </div>

        <div class="flex gap-6 items-start">
          <div class="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
          <div>
            <h3 class="text-lg font-bold text-slate-900 mb-1">You Book the Intro Call</h3>
            <p class="text-slate-600">Use the pitch above. Get the decision maker on a 15-minute call with Evan. That's your job. Evan handles the technical conversation and the close.</p>
          </div>
        </div>

        <div class="flex gap-6 items-start">
          <div class="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
          <div>
            <h3 class="text-lg font-bold text-slate-900 mb-1">Evan Closes and Delivers</h3>
            <p class="text-slate-600">Evan does the work. Builds the systems. Delivers results. The client stays because the value compounds every month.</p>
          </div>
        </div>

        <div class="flex gap-6 items-start">
          <div class="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">$</div>
          <div>
            <h3 class="text-lg font-bold text-slate-900 mb-1">You Get Paid Every Month</h3>
            <p class="text-slate-600">$450 hits your account every month the client stays active. The better the results, the longer they stay, the more you earn. Your incentives are aligned with theirs.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Who to Target -->
  <section class="py-20 bg-slate-50 border-y border-slate-200">
    <div class="container max-w-4xl mx-auto">
      <h2 class="text-3xl font-bold text-slate-900 mb-8 text-center">Who to Look For</h2>

      <div class="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        <div class="bg-white rounded-xl p-6 border border-green-200">
          <h3 class="text-lg font-bold text-green-800 mb-3">✅ Great Fit</h3>
          <ul class="space-y-2 text-slate-600 text-sm">
            <li>Businesses with 10-200 employees</li>
            <li>Revenue $1M-$500M</li>
            <li>Drowning in manual processes</li>
            <li>COO, Chief of Staff, or founder feels the pain</li>
            <li>Financial services, healthcare, dental, legal, e-commerce, professional services</li>
            <li>Already spending $2-5K/mo on tasks AI could handle</li>
          </ul>
        </div>
        <div class="bg-white rounded-xl p-6 border border-red-200">
          <h3 class="text-lg font-bold text-red-800 mb-3">❌ Not a Fit</h3>
          <ul class="space-y-2 text-slate-600 text-sm">
            <li>"Just curious about AI" (no active pain)</li>
            <li>Enterprise with long procurement cycles</li>
            <li>Want a chatbot for their website (not what this is)</li>
            <li>Can't articulate what they'd automate</li>
            <li>Budget under $4,500/mo is a dealbreaker</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-20 bg-slate-900 text-white">
    <div class="container">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">Want to partner up?</h2>
        <p class="text-xl text-slate-400 mb-8">
          Schedule a 15-minute call. I'll walk you through the offer, answer your questions, and get you set up with everything you need to start selling.
        </p>
        <a href="https://calendar.app.google/CjhZR1dr31gkfhCQ8" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center bg-primary-600 text-white px-10 py-4 rounded-xl font-semibold hover:bg-primary-500 transition-all shadow-lg text-lg">
          Schedule a Partner Call
        </a>
        <p class="mt-4 text-sm text-slate-500">Or call directly: <a href="tel:9046156418" class="text-primary-400 hover:underline">(904) 615-6418</a></p>
      </div>
    </div>
  </section>

</BaseLayout>
```
