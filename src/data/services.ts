export interface ServiceProcessStep {
  title: string;
  description: string;
}

export interface ServiceDetail {
  lead: string;
  benefits: string[];
  outcomes: string[];
  process: ServiceProcessStep[];
  localFocus: string;
  closing: string;
}

export interface Service {
  slug: string;
  title: string;
  icon: string;
  summary: string;
  detail: ServiceDetail;
}

export const services: Service[] = [
  {
    slug: 'modern-web-development',
    title: 'Modern Web Development',
    icon: 'fa-solid fa-window-maximize',
    summary:
      'Your website should be your hardest-working employee. I build professional, mobile-friendly sites that capture leads, tell your story, and make it easy for customers to do business with you.',
    detail: {
      lead:
        'Your website is the first impression for people searching for St. Augustine, Nocatee, or Ponte Vedra services. I build fast, accessible, and brand-aligned sites that convert casual visitors into booked jobs.',
      benefits: [
        'Conversion-focused layouts with clear storytelling, on-page SEO, and LocalBusiness schema so you show up for nearby searches.',
        'Mobile-first builds using modern frameworks, optimized for accessibility and lightning-fast load times.',
        'Integrated lead capture, chat, and analytics so you know exactly which campaigns create revenue.'
      ],
      outcomes: [
        'Launch-ready pages that load in under two seconds on modern mobile devices.',
        'More quote requests and consultations thanks to persuasive messaging and CTAs on every key page.',
        'Editable content sections so your team can update specials and announcements without calling a developer.'
      ],
      process: [
        {
          title: 'Discovery & audit',
          description:
            'We review your current website, analytics, and brand goals to map the structure and content needed to hit your growth targets.'
        },
        {
          title: 'Design & content alignment',
          description:
            'I translate your story into wireframes and polished mockups, collaborate on copy, and validate the experience on desktop and mobile.'
        },
        {
          title: 'Build, launch & training',
          description:
            'I develop the site, connect essential tools, handle QA, and deliver training so you feel confident maintaining your new presence.'
        }
      ],
      localFocus:
        'Whether you are attracting tourists in downtown St. Augustine or serving growing neighborhoods in Nocatee, every page is tailored to your audience with messaging, photography, and calls-to-action that feel local and trustworthy.',
      closing:
        'Ready to refresh your digital storefront? Let’s map out the pages, copy, and integrations that will bring in more of the right customers.'
    }
  },
  {
    slug: 'payment-and-booking-integration',
    title: 'Payment & Booking Integration',
    icon: 'fa-solid fa-credit-card',
    summary:
      "Stop chasing payments and manually scheduling appointments. I'll integrate secure, reliable payment and booking systems that save you time and get you paid faster.",
    detail: {
      lead:
        'Stop chasing invoices and phone tags. I streamline how customers schedule, sign, and pay so your day runs smoothly.',
      benefits: [
        'Secure online checkout experiences using Stripe, Square, or GoCardless tailored to your business model.',
        'Booking flows that sync with Google Calendar, Calendly, Acuity, or your practice management tool—including automated reminders.',
        'Back-office automations that push transactions into QuickBooks, your CRM, or email marketing list without manual entry.'
      ],
      outcomes: [
        'Clients can reserve their spot or pay deposits in under two minutes from any device.',
        'Automatic reminders and confirmations reduce no-shows and follow-up calls.',
        'Accurate financial records that make reconciliation and reporting painless.'
      ],
      process: [
        {
          title: 'Map your customer journey',
          description:
            'We document how people currently request services, confirm appointments, and pay so we can eliminate bottlenecks.'
        },
        {
          title: 'Configure & test integrations',
          description:
            'I set up payment links, booking widgets, and automations, then run through real-world scenarios to ensure everything works.'
        },
        {
          title: 'Launch with team training',
          description:
            'You receive clear instructions and support materials so staff can confidently manage the new systems.'
        }
      ],
      localFocus:
        'Perfect for busy service pros across St. Johns County—from home services in Ponte Vedra to wellness studios in St. Augustine—who need reliable cash flow and predictable schedules.',
      closing:
        'Let’s make it effortless for customers to book and pay you while you focus on delivering great service.'
    }
  },
  {
    slug: 'process-automation',
    title: 'Process Automation',
    icon: 'fa-solid fa-gears',
    summary:
      "Tired of repetitive, manual tasks? I'll connect your essential business tools to automate workflows, eliminate data entry, and free up your team for more important work.",
    detail: {
      lead:
        'Manual admin work steals time from serving customers. I automate the repetitive tasks that slow your team down.',
      benefits: [
        'Connect tools like your CRM, forms, spreadsheets, and messaging apps so information flows automatically.',
        'Trigger-based notifications, approvals, and task assignments that keep everyone aligned without constant check-ins.',
        'Operational dashboards that reveal bottlenecks and status in real time.'
      ],
      outcomes: [
        'Hours back each week as duplicate data entry and copy/paste work disappears.',
        'Fewer mistakes because data is captured once and synced everywhere it needs to go.',
        'A team that always knows the next step thanks to clear, automated workflows.'
      ],
      process: [
        {
          title: 'Identify high-impact opportunities',
          description:
            'We audit your current processes to pinpoint where automation can save the most time or reduce risk.'
        },
        {
          title: 'Build and test workflows',
          description:
            'I implement automations using platforms like Make, Zapier, or custom scripts, then stress-test them with your team.'
        },
        {
          title: 'Launch with monitoring',
          description:
            'I provide documentation, dashboards, and refinement support to ensure the automations keep delivering value.'
        }
      ],
      localFocus:
        'From field services and logistics to boutique retailers, I craft solutions that fit the unique ways St. Johns County businesses operate.',
      closing:
        'Tell me where manual work is stacking up, and we’ll design automations that give your staff breathing room.'
    }
  },
  {
    slug: 'data-insights-and-dashboards',
    title: 'Data Insights & Dashboards',
    icon: 'fa-solid fa-chart-pie',
    summary:
      "Your business data holds the answers to growth. I'll build simple, interactive dashboards that track your key metrics and turn raw numbers into clear, actionable insights.",
    detail: {
      lead:
        'You have data scattered across POS systems, accounting tools, and spreadsheets. I centralize it into dashboards that drive confident decisions.',
      benefits: [
        'Unified data pipelines pulling from QuickBooks, Square, Google Analytics, HubSpot, and other sources you rely on.',
        'Interactive dashboards built in Looker Studio, Power BI, or custom web apps with filters your leaders actually use.',
        'Automated scorecards and alerts that surface trends and issues before they become problems.'
      ],
      outcomes: [
        'Weekly or daily snapshots that highlight revenue, pipeline, and operational KPIs in one place.',
        'The ability to double-click into product lines, locations, or team performance without waiting on a report.',
        'Less time wrangling spreadsheets and more time acting on insights.'
      ],
      process: [
        {
          title: 'Data audit & goal setting',
          description:
            'We define the questions you need to answer and inventory every system that holds relevant data.'
        },
        {
          title: 'Integrate & model',
          description:
            'I clean and connect the datasets, design the metrics, and ensure everything stays in sync automatically.'
        },
        {
          title: 'Dashboard rollout & coaching',
          description:
            'I build the dashboards, walk your team through them, and establish a rhythm for reviewing insights.'
        }
      ],
      localFocus:
        'Ideal for multi-location restaurants, professional services firms, and nonprofits around St. Augustine that need to understand performance quickly.',
      closing:
        'Let’s turn disconnected reports into a living dashboard that gives you clarity every Monday morning.'
    }
  },
  {
    slug: 'ai-for-business-efficiency',
    title: 'AI for Business Efficiency',
    icon: 'fa-solid fa-brain',
    summary:
      'AI is more than just hype. I can build custom AI-powered tools to solve specific challenges, giving you a competitive edge.',
    detail: {
      lead:
        'AI can augment your team when it’s tailored to the way you work. I build practical AI tools that deliver measurable time savings.',
      benefits: [
        'Custom AI assistants that handle intake questions, summarize calls, or draft responses using your brand voice.',
        'Secure document and knowledge base search so staff find answers instantly.',
        'Predictive insights that flag trends in customer feedback, inventory, or service delivery.'
      ],
      outcomes: [
        'Faster response times and happier customers because routine questions are handled automatically.',
        'Teams who spend less time on paperwork and more time on strategic work.',
        'Early warnings about changes in demand, sentiment, or risk so you can adapt.'
      ],
      process: [
        {
          title: 'Use-case discovery',
          description:
            'We identify the repetitive conversations or decisions that AI can enhance without compromising quality.'
        },
        {
          title: 'Prototype & validation',
          description:
            'I configure or build a proof-of-concept, test it with real data, and gather feedback from your staff.'
        },
        {
          title: 'Deploy with guardrails',
          description:
            'We integrate the solution into your tools, set permissions, and create policies so the AI remains secure and effective.'
        }
      ],
      localFocus:
        'From tourism-driven hospitality groups to healthcare practices in Ponte Vedra, I deliver AI that respects compliance needs while delivering a competitive edge.',
      closing:
        'Bring me the process you wish you could hand to a digital assistant and we’ll design an AI workflow that truly helps.'
    }
  }
];

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((service) => service.slug === slug);
