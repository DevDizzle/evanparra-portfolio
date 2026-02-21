const admin = require('firebase-admin');
const { config } = require('dotenv');

config();

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

if (!projectId || !clientEmail || !privateKey) {
  console.error("Missing Firebase Admin credentials in .env");
  process.exit(1);
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
    storageBucket: process.env.PUBLIC_FIREBASE_STORAGE_BUCKET
  });
}

const db = admin.firestore();

const posts = [
  {
    slug: "ai-agents-replacing-answering-services-jacksonville-contractors",
    title: "How AI Agents Are Replacing After-Hours Answering Services for Jacksonville Contractors",
    description: "Jacksonville contractors are switching from expensive answering services to AI agents that qualify leads, book appointments, and never miss a call. Here's why the switch makes sense.",
    content: `
It's 9 PM on a Tuesday. A homeowner in Mandarin just discovered a leak under their kitchen sink. They pull out their phone and search "emergency plumber Jacksonville."

They find your number. They call.

What happens next determines whether you get a $400 service call—or your competitor does.

## The Hidden Cost of Missed Calls

For Jacksonville contractors, the math is brutal:

- **62% of calls** to service businesses go unanswered after hours
- **85% of callers** won't leave a voicemail—they'll call the next number
- The average service call in Northeast Florida is worth **$350-800**

If you're missing just 5 after-hours calls per week, that's potentially **$7,000-16,000 in lost revenue per month**.

Traditional answering services seem like the solution. But here's what they actually deliver:

- $200-500/month in fees
- Generic scripts that can't answer specific questions
- "Someone will call you back" (translation: the lead goes cold)
- No appointment booking capability
- No lead qualification

You're paying to lose leads more politely.

## What AI Agents Do Differently

Modern AI agents aren't the robotic phone trees of 2015. They're conversational systems trained on *your* business—your services, your pricing, your availability.

Here's what that looks like for a Jacksonville HVAC contractor:

**Caller:** "Hi, my AC isn't blowing cold air. How much would it cost to come take a look?"

**AI Agent:** "I can help with that. For a diagnostic visit in the Jacksonville area, our rate is $89, which gets applied to any repair you approve. Are you experiencing this issue right now, or is it intermittent?"

**Caller:** "It's been going on for two days. It's miserable."

**AI Agent:** "I understand—this heat is no joke. I have availability tomorrow morning between 8-10 AM or afternoon between 2-4 PM. Which works better for you?"

The caller gets their question answered. The appointment gets booked. The lead gets captured in your CRM.

No hold music. No "let me transfer you." No "someone will call you back."

## The ROI Breakdown

Let's compare a traditional answering service versus an AI agent for a mid-size Jacksonville contractor:

| Factor | Answering Service | AI Agent |
|--------|------------------|----------|
| Monthly cost | $300-500 | $150-300 |
| Can answer pricing questions | ❌ | ✅ |
| Books appointments directly | ❌ | ✅ |
| Qualifies leads | ❌ | ✅ |
| Available 24/7/365 | ✅ | ✅ |
| Learns your business | ❌ | ✅ |
| Integrates with your calendar | ❌ | ✅ |

The cost savings alone are significant. But the real value is in captured revenue.

If an AI agent converts just **2 additional leads per week** that would have been lost to voicemail or callback delays, that's:

- 2 leads × $400 average ticket = $800/week
- $800 × 52 weeks = **$41,600/year in recovered revenue**

For a $200/month investment.

## How Jacksonville Contractors Are Using AI Agents

The most effective implementations I've seen locally include:

### 1. After-Hours Lead Capture
The AI handles all calls from 6 PM to 7 AM, plus weekends. It answers FAQs, provides quotes for standard services, and books appointments directly into the contractor's calendar.

### 2. Overflow During Busy Periods
When your team is slammed during a summer AC rush or post-storm roofing surge, the AI picks up overflow calls instantly—no hold times, no lost leads.

### 3. Lead Qualification
The AI asks qualifying questions: What's the issue? How urgent? Homeowner or tenant? This lets your team prioritize callbacks and show up prepared.

### 4. Bilingual Support
In a diverse market like Jacksonville, AI agents can seamlessly handle calls in both English and Spanish—no additional staff required.

## What You Need to Get Started

Implementing an AI agent isn't a massive IT project. For most contractors, the setup involves:

1. **Your service menu and pricing** — What do you offer? What are your rates?
2. **Your calendar integration** — Google Calendar, Calendly, or your scheduling software
3. **Your FAQs** — Common questions customers ask
4. **Your service area** — Which zip codes do you cover?

Most systems can be live within a week.

## The Bottom Line

Jacksonville's contracting market is competitive. When a homeowner has an emergency at 10 PM, they're not going to wait until morning for a callback. They're calling the next number on the list.

AI agents ensure you never miss that call—and more importantly, you never miss that revenue.

---

**Want to see how an AI agent would work for your contracting business?**

I help Jacksonville and St. Augustine contractors implement AI automation that captures leads 24/7. [Book a free 30-minute consultation](#booking) and I'll show you exactly how many leads you're currently losing—and how to fix it.
    `,
    author: "Evan Parra",
    publishedAt: new Date("2026-02-03T12:00:00Z"),
    tags: ["AI Agents", "Contractors", "Jacksonville"],
    featured: true,
    status: 'published'
  },
  {
    slug: "true-cost-manual-invoice-processing-st-augustine",
    title: "The True Cost of Manual Invoice Processing (And How St. Augustine Businesses Are Fixing It)",
    description: "St. Augustine businesses are spending 15+ hours per week on invoice data entry. AI document processing cuts that to minutes. Here's the math on switching.",
    content: `
A property management company in St. Augustine reached out to me last month with a familiar problem.

"We're drowning in invoices," the owner said. "Vendor invoices, utility bills, maintenance receipts—my office manager spends half her week just entering data into QuickBooks."

Half her week. At $25/hour, that's $500/week in data entry labor. **$26,000 per year** just to type numbers from one place to another.

And that's not counting the errors, the delays, or the vendors calling to ask why they haven't been paid yet.

## The Hidden Math of Manual Data Entry

Most business owners underestimate the true cost of manual invoice processing. Here's what it actually includes:

### Direct Labor Costs
- **Time to open and sort mail:** 15-30 minutes/day
- **Time to enter each invoice:** 3-5 minutes average
- **Time to file and organize:** 10-15 minutes/day
- **Time to correct errors:** 30-60 minutes/week

For a business processing 100 invoices per month, that's roughly **15-20 hours of labor**. At Northeast Florida wages, you're looking at $375-600/month just in data entry time.

### Indirect Costs
These are the costs that don't show up on a timesheet:

- **Late payment penalties:** Miss a due date because an invoice sat in a pile? That's 1.5-2% fees.
- **Lost early payment discounts:** Many vendors offer 2% net-10 discounts. Manual processing is too slow to capture them.
- **Duplicate payments:** It happens more than you'd think. One study found that 0.5-1% of invoices get paid twice.
- **Vendor relationship damage:** Slow payments = vendors who deprioritize your work.

A St. Johns County contractor told me they lost a reliable subcontractor because payments were consistently 45-60 days late—not from cash flow issues, but from processing backlog.

## What AI Document Processing Actually Does

Modern document processing AI doesn't just scan documents—it *understands* them.

Here's the workflow:

1. **Invoice arrives** (email attachment, photo, scanned PDF)
2. **AI extracts key data:**
   - Vendor name
   - Invoice number
   - Line items and amounts
   - Due date
   - Payment terms
3. **Data validates** against existing vendor records
4. **Automatic routing** to accounting software (QuickBooks, Xero, etc.)
5. **Exceptions flagged** for human review (duplicates, unusual amounts, new vendors)

The whole process takes **seconds**, not minutes.

## Real Numbers from a St. Augustine Implementation

Here's what changed for that property management company after implementing AI document processing:

| Metric | Before | After |
|--------|--------|-------|
| Time per invoice | 4 minutes | 12 seconds |
| Monthly processing hours | 18 hours | 1.5 hours |
| Error rate | 3-5% | <0.5% |
| Average payment time | 34 days | 12 days |
| Early payment discounts captured | 15% | 85% |

**Monthly savings:**
- Labor: $412 (16.5 hours × $25)
- Early payment discounts: $340 (2% on $17,000)
- Late fees avoided: $125

**Total monthly savings: $877**

The system cost them $200/month. That's a **4.4x ROI**—and it compounds as volume grows.

## Industries Where This Hits Hardest

In my experience working with Northeast Florida businesses, document processing automation delivers the biggest impact for:

### Property Management
Vendor invoices, utility bills, tenant documentation—the paper flow is relentless. One property manager I worked with processes 400+ documents monthly per building.

### Construction & Trades
Material invoices, change orders, permits, inspection reports. When a GC is juggling 12 subcontractors, paper is a job site hazard.

### Healthcare Practices
Insurance EOBs, lab invoices, supply orders. Medical offices face unique compliance requirements that make manual processing even riskier.

### Professional Services
Law firms, accounting practices, consultancies—anywhere with heavy vendor relationships and reimbursable expenses.

## What You Need to Get Started

Implementing document processing AI is simpler than most people expect:

### Minimum Requirements
- **Digital invoice flow:** Even if you get paper mail, you need a scanner or phone camera
- **Accounting software:** QuickBooks, Xero, FreshBooks—most modern platforms integrate
- **Internet connection:** Processing happens in the cloud

### Implementation Timeline
- **Week 1:** Connect accounting software, configure extraction rules
- **Week 2:** Train system on your specific vendor formats
- **Week 3:** Parallel processing (AI + manual verification)
- **Week 4:** Go live with exception-only human review

Most businesses are fully operational within 30 days.

## The Objection I Hear Most

"What about invoices the AI can't read?"

Fair question. Here's the reality:

Modern extraction AI handles **95%+ of standard invoices** without issue. For the remaining 5%:

- **Unusual formats** get flagged for quick human review
- **Handwritten invoices** (rare but they exist) route to manual entry
- **New vendors** require one-time setup, then auto-process going forward

You're not eliminating human involvement—you're eliminating *repetitive* human involvement. Your team handles exceptions and approvals. The robot handles the typing.

## The Question to Ask Yourself

Pull up your accounts payable process and answer honestly:

1. How many hours per week does invoice entry consume?
2. What's the hourly cost of that labor (including benefits)?
3. How many early payment discounts are you missing?
4. When was your last duplicate payment or data entry error?

If you're spending more than 5 hours per week on manual data entry, you're almost certainly losing money versus automation.

---

**Ready to see how much you could save?**

I help St. Augustine and Jacksonville businesses implement document processing automation that cuts data entry time by 90%. [Book a free 30-minute consultation](#booking) and I'll analyze your current invoice volume and show you the exact ROI for your business.
    `,
    author: "Evan Parra",
    publishedAt: new Date("2026-02-02T12:00:00Z"),
    tags: ["Document Processing", "Automation", "St. Augustine"],
    featured: false,
    status: 'published'
  }
];

async function seed() {
  console.log("Seeding database...");
  const batch = db.batch();
  
  for (const post of posts) {
    const docRef = db.collection('blogPosts').doc(post.slug);
    batch.set(docRef, {
      ...post,
      publishedAt: admin.firestore.Timestamp.fromDate(post.publishedAt),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
    console.log(`Prepared: ${post.title}`);
  }
  
  await batch.commit();
  console.log("Successfully seeded blog posts.");
}

seed().catch(console.error);
