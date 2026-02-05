# evanparra.ai Implementation Master Plan

**Project:** evanparra-portfolio  
**Firebase Project ID:** evanparra-portfolio-8576-3a8bf  
**Repository:** /home/user/evanparra-portfolio  
**Tech Stack:** Astro 5.x, React 19, Tailwind CSS, Firebase (Firestore + Hosting + Functions)

---

## Executive Summary

Transform evanparra.ai from a local AI automation services site into an **AI/ML Engineering Authority Hub** that positions Evan Parra as a production ML engineer available for W2 roles and contract work.

### Core Objectives
1. **Brand Consistency** — Align with @ParraEvan X account and future LinkedIn company page
2. **AI/ML Authority** — Technical blog showcasing expertise
3. **Services** — Upwork gigs + Local AI Engineer services  
4. **Portfolio** — Dynamic GitHub project showcase
5. **SEO Blog** — Automated content pipeline (similar to GammaRips architecture)

---

## Part 1: Firestore Database Schema

### 1.1 Blog Collection (`blogPosts`)

```typescript
// Collection: blogPosts
interface BlogPost {
  id: string;                    // Auto-generated
  slug: string;                  // URL-friendly unique identifier
  title: string;                 // Post title
  content: string;               // Markdown or HTML content
  excerpt: string;               // 150-200 char summary for cards
  author: string;                // "Evan Parra"
  authorImage?: string;          // Avatar URL
  publishedAt: Timestamp;        // Firebase Timestamp
  updatedAt: Timestamp;          // Last edit timestamp
  status: 'draft' | 'published'; // Publication status
  featured: boolean;             // Show on homepage
  category: string;              // Primary category
  tags: string[];                // Array of tags
  coverImage?: string;           // OG image URL
  coverImageAlt?: string;        // Alt text for accessibility
  readTimeMinutes: number;       // Estimated read time
  seoTitle?: string;             // Custom SEO title
  seoDescription?: string;       // Custom meta description
  views: number;                 // Analytics counter
}

// Indexes needed:
// - status + publishedAt (DESC) for blog listing
// - slug (unique) for URL lookup
// - featured + status for homepage
// - category + status + publishedAt for category pages
```

### 1.2 Portfolio Projects Collection (`projects`)

```typescript
// Collection: projects
interface Project {
  id: string;
  slug: string;                  // URL-friendly identifier
  title: string;                 // Project name
  description: string;           // Short description
  longDescription: string;       // Detailed markdown content
  githubUrl?: string;            // GitHub repo URL
  liveUrl?: string;              // Live demo URL
  coverImage: string;            // Project screenshot/banner
  technologies: string[];        // Tech stack tags
  category: 'ml-pipeline' | 'agent' | 'automation' | 'fullstack';
  featured: boolean;             // Show on homepage
  displayOrder: number;          // Sort order for featured
  status: 'active' | 'archived';
  metrics?: {                    // Quantifiable results
    label: string;
    value: string;
  }[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### 1.3 Services Collection (`services`)

```typescript
// Collection: services
interface Service {
  id: string;
  slug: string;
  title: string;
  icon: string;                  // FontAwesome or Heroicon class
  shortDescription: string;      // Card summary
  fullDescription: string;       // Detailed markdown
  benefits: string[];            // Bullet points
  deliverables: string[];        // What client gets
  pricing: {
    type: 'hourly' | 'project' | 'retainer';
    range: string;               // "$75-150/hr" or "$2,000-5,000"
  };
  targetAudience: 'enterprise' | 'local' | 'startup' | 'all';
  category: 'ml-engineering' | 'automation' | 'consulting';
  featured: boolean;
  displayOrder: number;
  cta: {
    text: string;
    url: string;                 // Upwork link or booking URL
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### 1.4 Contact Submissions Collection (`contactSubmissions`)

```typescript
// Collection: contactSubmissions (keep existing, extend)
interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company?: string;
  type: 'w2-inquiry' | 'contract' | 'local-service' | 'general';
  message: string;
  source: string;                // Page URL where form submitted
  createdAt: Timestamp;
  status: 'new' | 'replied' | 'closed';
}
```

---

## Part 2: Frontend Architecture

### 2.1 Site Structure (New Routes)

```
/                           → Homepage (redesigned)
/blog                       → Blog listing
/blog/[slug]                → Individual blog post
/projects                   → Portfolio listing
/projects/[slug]            → Project detail page
/services                   → Services overview
/services/local             → Local AI Engineer (Jacksonville/St. Augustine)
/services/upwork            → Upwork/Contract services
/about                      → About/Bio page
/contact                    → Contact form
```

### 2.2 Component Updates

#### 2.2.1 New `Hero.astro` (Rebrand)

```astro
<!-- Replace local business messaging with ML Engineer positioning -->
<section class="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white">
  <div class="container py-24 md:py-32">
    <div class="max-w-4xl mx-auto text-center">
      <!-- Eyebrow -->
      <p class="text-blue-400 font-mono text-sm mb-4 tracking-wide">
        ML ENGINEER • BUILDING PRODUCTION AI SYSTEMS
      </p>
      
      <!-- Headline -->
      <h1 class="text-4xl md:text-6xl font-bold leading-tight">
        I Build AI Systems<br/>
        <span class="text-blue-400">That Actually Ship</span>
      </h1>
      
      <!-- Subhead -->
      <p class="mt-6 text-xl text-slate-300 max-w-2xl mx-auto">
        Production ML pipelines. Autonomous agents. Serverless architecture.
        From prototype to deployment — without the enterprise overhead.
      </p>
      
      <!-- CTA Buttons -->
      <div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/projects" class="btn-primary">
          View My Work
        </a>
        <a href="/contact" class="btn-secondary">
          Let's Talk
        </a>
      </div>
      
      <!-- Social Proof -->
      <div class="mt-12 flex items-center justify-center gap-8 text-slate-400">
        <div class="text-center">
          <p class="text-2xl font-bold text-white">64%</p>
          <p class="text-sm">Win Rate</p>
        </div>
        <div class="text-center">
          <p class="text-2xl font-bold text-white">500+</p>
          <p class="text-sm">Daily Signals</p>
        </div>
        <div class="text-center">
          <p class="text-2xl font-bold text-white">$50/mo</p>
          <p class="text-sm">Infra Cost</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

#### 2.2.2 New `Navigation.astro`

```astro
<!-- Primary nav items -->
const navItems = [
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
];

<!-- CTA button -->
<a href="/contact" class="btn-primary">
  Work With Me
</a>
```

#### 2.2.3 New Components Needed

| Component | Purpose |
|-----------|---------|
| `ProjectCard.astro` | Portfolio project card with tech tags |
| `BlogPostCard.astro` | Blog listing card with date/tags |
| `ServiceCard.astro` | Service offering card with CTA |
| `TechBadge.astro` | Pill-style technology tag |
| `MetricCard.astro` | Stat display for portfolio metrics |
| `ContactForm.tsx` | React form with Firebase submission |
| `GitHubProjects.tsx` | Client component to fetch GitHub repos |

### 2.3 Design System Updates

#### Color Palette (Tailwind Config)

```javascript
// tailwind.config.mjs
colors: {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',   // Main brand blue
    600: '#2563eb',
    700: '#1d4ed8',
    900: '#1e3a8a',
  },
  slate: {
    // Keep existing slate for dark theme
  },
  accent: {
    green: '#10b981',  // Success/wins
    amber: '#f59e0b',  // Warnings
    red: '#ef4444',    // Errors/losses
  }
}
```

#### Typography

```javascript
// Keep professional, technical feel
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
}
```

---

## Part 3: Automated Blog Pipeline

### 3.1 Architecture Overview

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────┐
│  Cron Trigger   │────▶│  OpenClaw Agent  │────▶│  Firestore  │
│  (8am EST)      │     │  (Content Gen)   │     │  blogPosts  │
└─────────────────┘     └──────────────────┘     └─────────────┘
                               │
                               ▼
                        ┌──────────────────┐
                        │  Image Gen       │
                        │  (nano-banana)   │
                        └──────────────────┘
                               │
                               ▼
                        ┌──────────────────┐
                        │  catbox.moe      │
                        │  (image hosting) │
                        └──────────────────┘
```

### 3.2 Content Categories

| Category | Frequency | Topics |
|----------|-----------|--------|
| Technical Deep Dive | Weekly | Architecture, lessons learned, code patterns |
| Industry Commentary | 2x/week | AI news analysis, tool reviews |
| Project Showcase | Monthly | New project announcements |
| Quick Tips | 3x/week | Short tactical advice |

### 3.3 Cron Job Configuration

```typescript
// Add to OpenClaw cron jobs
{
  name: "evanparra-weekly-article",
  schedule: {
    kind: "cron",
    expr: "0 8 * * 2",  // Tuesday 8am EST
    tz: "America/New_York"
  },
  sessionTarget: "isolated",
  payload: {
    kind: "agentTurn",
    message: `
      Generate a technical blog post for evanparra.ai.
      
      1. Topic Selection:
         - Check memory for recent topics to avoid repeats
         - Choose from: ML pipelines, agent architecture, serverless, Python tooling, production lessons
      
      2. Content Requirements:
         - 800-1200 words
         - Include code snippets where relevant
         - Personal experience/lessons learned angle
         - Actionable takeaways
      
      3. Generate cover image using nano-banana:
         - Technical/abstract style
         - Blue/slate color scheme
         - Upload to catbox.moe
      
      4. Store in Firestore (evanparra-portfolio-8576-3a8bf):
         Collection: blogPosts
         Include all required schema fields
         Status: published
      
      5. Log to memory/YYYY-MM-DD.md
    `
  }
}
```

### 3.4 Firebase Function for Blog API

```typescript
// functions/src/blog.ts
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore();

// Get published posts (paginated)
export const getBlogPosts = functions.https.onCall(async (data) => {
  const { limit = 10, startAfter, category, tag } = data;
  
  let query = db.collection('blogPosts')
    .where('status', '==', 'published')
    .orderBy('publishedAt', 'desc')
    .limit(limit);
  
  if (category) {
    query = query.where('category', '==', category);
  }
  
  if (startAfter) {
    const startDoc = await db.doc(`blogPosts/${startAfter}`).get();
    query = query.startAfter(startDoc);
  }
  
  const snapshot = await query.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

// Get single post by slug
export const getBlogPostBySlug = functions.https.onCall(async (data) => {
  const { slug } = data;
  const snapshot = await db.collection('blogPosts')
    .where('slug', '==', slug)
    .where('status', '==', 'published')
    .limit(1)
    .get();
  
  if (snapshot.empty) return null;
  
  const doc = snapshot.docs[0];
  
  // Increment views
  await doc.ref.update({ views: admin.firestore.FieldValue.increment(1) });
  
  return { id: doc.id, ...doc.data() };
});

// Create/update post (for automation)
export const upsertBlogPost = functions.https.onCall(async (data, context) => {
  // Verify caller is authorized (service account or admin)
  const { post } = data;
  
  const docRef = post.id 
    ? db.collection('blogPosts').doc(post.id)
    : db.collection('blogPosts').doc();
  
  await docRef.set({
    ...post,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    publishedAt: post.publishedAt || admin.firestore.FieldValue.serverTimestamp(),
  }, { merge: true });
  
  return { id: docRef.id };
});
```

---

## Part 4: GitHub Portfolio Integration

### 4.1 Client Component for Dynamic GitHub Data

```tsx
// src/components/GitHubProjects.tsx
import { useEffect, useState } from 'react';

interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  topics: string[];
}

const FEATURED_REPOS = [
  'gammarips-mcp',
  'gammarips-engine',
  // Add more repos to feature
];

export default function GitHubProjects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('https://api.github.com/users/eraphaelparra/repos?per_page=100')
      .then(res => res.json())
      .then(data => {
        const featured = data.filter((repo: GitHubRepo) => 
          FEATURED_REPOS.includes(repo.name)
        );
        setRepos(featured);
        setLoading(false);
      });
  }, []);
  
  if (loading) return <div>Loading projects...</div>;
  
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {repos.map(repo => (
        <a 
          key={repo.name}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-6 bg-white rounded-xl border border-slate-200 hover:shadow-lg transition"
        >
          <h3 className="font-bold text-lg text-slate-900">{repo.name}</h3>
          <p className="text-slate-600 mt-2">{repo.description}</p>
          <div className="flex items-center gap-4 mt-4 text-sm text-slate-500">
            <span>⭐ {repo.stargazers_count}</span>
            <span>{repo.language}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {repo.topics.slice(0, 4).map(topic => (
              <span key={topic} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                {topic}
              </span>
            ))}
          </div>
        </a>
      ))}
    </div>
  );
}
```

---

## Part 5: Services Page Structure

### 5.1 Two-Track Services Model

#### Track 1: Enterprise/Contract (Upwork)

```typescript
const enterpriseServices = [
  {
    title: "ML Pipeline Architecture",
    description: "Design and implement production-grade ML pipelines",
    deliverables: [
      "Architecture documentation",
      "BigQuery/warehouse setup",
      "Cloud Functions deployment",
      "Monitoring & alerting",
    ],
    pricing: { type: 'project', range: '$5,000 - $15,000' },
    cta: { text: 'View on Upwork', url: 'https://upwork.com/...' }
  },
  {
    title: "AI Agent Development",
    description: "Custom autonomous agents with MCP integration",
    // ...
  },
  {
    title: "LLM Integration & RAG",
    description: "Add AI capabilities to existing applications",
    // ...
  }
];
```

#### Track 2: Local Services (Jacksonville/St. Augustine)

```typescript
const localServices = [
  {
    title: "AI Automation Audit",
    description: "Identify automation opportunities in your business",
    deliverables: [
      "2-hour discovery session",
      "Written recommendations",
      "ROI projections",
    ],
    pricing: { type: 'project', range: '$500' },
    cta: { text: 'Book Audit', url: '/contact?type=local-audit' }
  },
  // Keep existing: AI Agents, IDP, Computer Vision
];
```

---

## Part 6: Deployment Steps

### 6.1 Pre-Deployment Checklist

```bash
# 1. Install dependencies
cd /home/user/evanparra-portfolio
npm install

# 2. Verify Firebase config
cat .firebaserc  # Should show: evanparra-portfolio-8576-3a8bf

# 3. Test build locally
npm run build

# 4. Deploy functions first (if changed)
cd functions
npm install
npm run build
firebase deploy --only functions

# 5. Deploy hosting
cd ..
firebase deploy --only hosting
```

### 6.2 Firestore Security Rules Update

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Blog posts - public read, admin write
    match /blogPosts/{postId} {
      allow read: if resource.data.status == 'published';
      allow write: if false; // Only via admin SDK
    }
    
    // Projects - public read
    match /projects/{projectId} {
      allow read: if resource.data.status == 'active';
      allow write: if false;
    }
    
    // Services - public read
    match /services/{serviceId} {
      allow read: if true;
      allow write: if false;
    }
    
    // Contact submissions - create only
    match /contactSubmissions/{subId} {
      allow create: if request.resource.data.keys().hasAll(['name', 'email', 'message']);
      allow read, update, delete: if false;
    }
  }
}
```

### 6.3 Environment Variables

```bash
# .env (do not commit)
GOOGLE_GENAI_API_KEY=xxx
FIREBASE_PROJECT_ID=evanparra-portfolio-8576-3a8bf
```

### 6.4 Post-Deployment

```bash
# Verify deployment
curl https://evanparra.ai
curl https://evanparra.ai/blog
curl https://evanparra.ai/projects

# Test Functions
firebase functions:log --only getBlogPosts
```

---

## Part 7: Migration from Current State

### 7.1 Content Migration

1. **Move existing blog posts** from `src/content/blog/*.md` to Firestore `blogPosts` collection
2. **Convert services data** from `src/data/services.ts` to Firestore `services` collection
3. **Archive** `/services/local` route content for the local services page

### 7.2 Route Redirects (firebase.json)

```json
{
  "hosting": {
    "redirects": [
      {
        "source": "/case-studies/**",
        "destination": "/projects",
        "type": 301
      },
      {
        "source": "/contact",
        "destination": "/#contact",
        "type": 301
      }
    ]
  }
}
```

---

## Part 8: SEO Optimization

### 8.1 Meta Tags Template

```astro
<!-- BaseLayout.astro -->
<head>
  <title>{title} | Evan Parra - ML Engineer</title>
  <meta name="description" content={description} />
  
  <!-- Open Graph -->
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={ogImage || '/default-og.png'} />
  <meta property="og:type" content="website" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@ParraEvan" />
  <meta name="twitter:creator" content="@ParraEvan" />
  
  <!-- Structured Data -->
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Evan Parra",
      "jobTitle": "ML Engineer",
      "url": "https://evanparra.ai",
      "sameAs": [
        "https://twitter.com/ParraEvan",
        "https://github.com/eraphaelparra",
        "https://linkedin.com/in/evanparra"
      ]
    })}
  </script>
</head>
```

### 8.2 Sitemap Configuration

```typescript
// astro.config.mjs
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://evanparra.ai',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/admin'),
      changefreq: 'weekly',
      priority: 0.7,
    }),
  ],
});
```

---

## Part 9: Analytics & Tracking

### 9.1 Simple Analytics (Privacy-Friendly)

```html
<!-- Add to BaseLayout.astro -->
<script async defer src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
<noscript><img src="https://queue.simpleanalyticscdn.com/noscript.gif" alt="" referrerpolicy="no-referrer-when-downgrade" /></noscript>
```

### 9.2 Conversion Tracking

Track key events in Firebase Analytics:
- Contact form submissions
- Upwork link clicks
- Blog post reads (time on page)
- Project card clicks

---

## Implementation Priority Order

| Phase | Tasks | Timeline |
|-------|-------|----------|
| **1** | Firestore schema setup, Hero rebrand, Navigation update | Day 1 |
| **2** | Blog pages (Firestore-backed), migrate existing posts | Day 2 |
| **3** | Projects page with GitHub integration | Day 3 |
| **4** | Services page (two-track model) | Day 4 |
| **5** | Contact form, About page | Day 5 |
| **6** | SEO optimization, analytics | Day 6 |
| **7** | Blog automation cron job setup | Day 7 |

---

## Files to Create/Modify Summary

### New Files
- `src/pages/projects/index.astro`
- `src/pages/projects/[slug].astro`
- `src/pages/services/index.astro`
- `src/pages/services/local.astro`
- `src/pages/about.astro`
- `src/components/ProjectCard.astro`
- `src/components/GitHubProjects.tsx`
- `src/components/ContactForm.tsx`
- `src/lib/firestore.ts` (client-side Firestore helpers)
- `functions/src/blog.ts`
- `functions/src/projects.ts`

### Modified Files
- `src/pages/index.astro` (complete redesign)
- `src/components/Hero.astro` (rebrand)
- `src/components/SiteHeader.astro` (new nav)
- `src/layouts/BaseLayout.astro` (SEO updates)
- `src/pages/blog/index.astro` (Firestore integration)
- `src/pages/blog/[...slug].astro` (Firestore integration)
- `firebase.json` (redirects)
- `firestore.rules` (new collections)
- `tailwind.config.mjs` (color updates)
- `functions/src/index.ts` (export new functions)

---

*Generated: 2026-02-05*
*For use with: Gemini CLI or equivalent coding AI*

