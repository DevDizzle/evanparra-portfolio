import React, {
  useState,
  useCallback,
  useRef,
  forwardRef,
  useEffect
} from 'react';
import { createRoot } from 'react-dom/client';
import {
  HashRouter,
  Routes,
  Route,
  Link,
  useParams,
  useLocation
} from 'react-router-dom';

const servicesData = [
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

const SectionHeading = ({ eyebrow, title, body, align = 'center' }) => {
  const alignClass = align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center';
  return (
    <header className={alignClass + ' max-w-3xl mx-auto mb-12 px-2'}>
      {eyebrow && <p className="text-sm uppercase tracking-widest text-blue-600 font-semibold mb-3">{eyebrow}</p>}
      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">{title}</h2>
      {body && <p className="mt-4 text-lg text-slate-600 leading-relaxed">{body}</p>}
    </header>
  );
};

const Hero = ({ onCtaClick }) => (
  <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
    <div className="container py-20 md:py-24">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight md:leading-tight">
          Transform Your Operations with a Local Technology Partner.
        </h1>
        <p className="mt-5 text-lg/relaxed md:text-xl/relaxed opacity-90 max-w-3xl mx-auto">
          Get a tailored roadmap for St. Johns County businesses to streamline workflows, modernize your digital presence, and automate the busywork so your team can stay focused on growth.
        </p>
        <div className="mt-10 flex justify-center">
          <button
            onClick={onCtaClick}
            className="bg-white text-blue-700 px-8 py-3 rounded-xl hover:bg-gray-100 font-semibold shadow-lg w-full sm:w-auto"
          >
            Get Your Free Assessment &amp; Quote
          </button>
        </div>
      </div>
    </div>
  </section>
);

const CaseStudyCarousel = () => {
  const [current, setCurrent] = useState(0);

  const caseStudies = [
    {
      eyebrow: 'ProfitScout for Options Traders',
      body: 'A client was drowning in complex data, spending days on manual research that led to missed opportunities. The challenge was to automate this analysis and deliver clear, actionable insights instantly, turning data overload into a key advantage.',
      before: ['Days of manual data gathering.', 'Missed opportunities due to slow analysis.', 'Decisions based on incomplete information.'],
      after: ['Under 5 minutes for a complete, AI-driven analysis.', 'Clear signals on the highest-scoring market setups.', 'Confident, data-driven decisions.'],
      insightTitle: 'How ProfitScout Delivers Real Insight',
      insightBody: 'It’s an AI-powered tool that automatically analyzes thousands of data points to provide a clear, forward-looking view of stocks and options, allowing traders to make confident, data-driven decisions.',
      insightPoints: [
        '**Analyzes the Full Picture:** It processes everything from 10-K filings and earnings calls to options chain data and market sentiment.',
        '**Provides a Nuanced View:** Instead of a simple "buy" or "sell" rating, it gives a five-tier analysis (from "Strongly Bullish" to "Strongly Bearish") with a summary of why.',
        '**Highlights Top Opportunities:** The Confluence Dashboard shows where stock and options data align, pointing to the most promising setups.'
      ]
    },
    {
      eyebrow: 'Coastal Waste & Recycling Automation',
      body: 'A local industrial client was losing hours to manual, paper-based inventory tracking. This caused inaccurate reporting and operational delays. I built a simple mobile web app that digitized their workflow, dramatically increasing efficiency and data accuracy.',
      before: ['Hours lost to manual data entry.', 'Inaccurate understanding of throughput.', 'Delayed reporting for management.'],
      after: ['~70% reduction in processing time.', 'Centralized, real-time inventory data.', 'Improved data quality and operational efficiency.'],
      insightTitle: 'How the Web App Solved the Problem',
      insightBody: "I developed the 'Coastal Inventory Logger,' an internal web app that allows field teams to log data from their phones, automating the entire workflow.",
      insightPoints: [
        '**Simple Mobile Interface:** Designed for quick, easy data entry on the go, reducing errors and saving time.',
        '**Centralized Database:** All data is fed into a single source of truth, providing managers with instant, accurate reports.',
        '**Automated Alerts:** The system flags low-inventory items automatically, preventing shortages and improving planning.'
      ]
    },
    {
      eyebrow: 'AI for Skin Lesion Analysis',
      body: 'A challenge in the medical field is the time-consuming and subjective analysis of complex images. To solve this, I developed a secure, AI-powered tool that provides objective, data-driven analysis to support the critical judgment of medical professionals.',
      before: ['Time-consuming manual review of images.', 'Reliance on subjective visual assessment.', 'Lack of immediate, data-driven feedback.'],
      after: ['Instant AI analysis of uploaded skin lesion images.', 'Objective classification with confidence scores.', 'Heatmap overlays to pinpoint areas of concern.'],
      insightTitle: 'How AI Supports Clinical Judgment',
      insightBody: "This secure, HIPAA-compliant web app uses a custom-trained AI model to analyze dermoscopic images, providing clinicians with data-driven insights to support their diagnosis.",
      insightPoints: [
        "**Custom-Trained AI Model:** Deployed on Google Cloud's Vertex AI for high accuracy in lesion classification.",
        '**Secure & Compliant:** Built with HIPAA compliance in mind, featuring secure authentication and encrypted data transmission.',
        '**Actionable Visual Feedback:** Provides not just a classification, but also heatmaps that visually guide professionals to the most diagnostically relevant regions.'
      ]
    }
  ];

  const nextSlide = () => setCurrent((c) => (c === caseStudies.length - 1 ? 0 : c + 1));
  const prevSlide = () => setCurrent((c) => (c === 0 ? caseStudies.length - 1 : c - 1));

  const study = caseStudies[current];

  return (
    <section id="case-studies" className="bg-white">
      <div className="container py-20 md:py-24">
        <SectionHeading eyebrow="My Work" title="Common Problems, Practical Solutions" />

        <div className="relative">
          <div className="bg-gray-50 border border-slate-200 rounded-2xl shadow-lg p-6 md:p-10 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start lg:items-center">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-blue-600">{study.eyebrow}</h3>
                <p className="text-slate-700">{study.body}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900">Before</h4>
                    <ul className="mt-3 space-y-2 text-slate-700">
                      {study.before.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-2 h-2 w-2 rounded-full bg-red-400"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900">After</h4>
                    <ul className="mt-3 space-y-2 text-slate-700">
                      {study.after.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-2 h-2 w-2 rounded-full bg-green-400"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
                  <h4 className="text-lg font-semibold text-slate-900">{study.insightTitle}</h4>
                  <p className="text-slate-700">{study.insightBody}</p>
                  <ul className="list-disc list-inside space-y-2 text-slate-700">
                    {study.insightPoints.map((point) => (
                      <li key={point} dangerouslySetInnerHTML={{ __html: point }}></li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <button
                  type="button"
                  onClick={prevSlide}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2 font-semibold text-slate-700 shadow-sm transition hover:border-blue-600 hover:text-blue-700"
                >
                  <span aria-hidden="true">←</span>
                  Previous
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2 font-semibold text-slate-700 shadow-sm transition hover:border-blue-600 hover:text-blue-700"
                >
                  Next
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-center gap-2">
            {caseStudies.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrent(index)}
                className={`h-2.5 w-8 rounded-full transition ${
                  index === current ? 'bg-blue-600' : 'bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`View case study ${index + 1}`}
                aria-pressed={index === current}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ icon, title, summary, slug }) => (
  <article className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 flex flex-col">
    <div className="flex items-center gap-4">
      <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl">
        <i className={icon} aria-hidden="true"></i>
      </div>
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
    </div>
    {summary ? <p className="mt-4 text-slate-700 leading-relaxed flex-1">{summary}</p> : null}
    {slug ? (
      <Link
        to={`/services/${slug}`}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800"
      >
        Learn More
        <span aria-hidden="true">→</span>
      </Link>
    ) : null}
  </article>
);

const Services = ({ items = servicesData }) => (
  <section id="services" className="bg-gray-50">
    <div className="container py-20 md:py-24">
      <SectionHeading
        eyebrow="Services"
        title="Practical Solutions for Local Businesses"
        body="Strategy, implementation, and automation tailored to St. Augustine and St. Johns County organizations that need a trusted partner to modernize operations."
      />
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((service) => (
          <ServiceCard key={service.slug} {...service} />
        ))}
      </div>
    </div>
  </section>
);

const SiteHeader = ({ children }) => (
  <header className="bg-white/90 backdrop-blur border-b border-slate-200 sticky top-0 z-40">
    <div className="container py-4 flex items-center justify-between gap-4">
      <Link to="/" className="text-lg font-extrabold text-slate-900 tracking-tight">
        Evan Parra
      </Link>
      {children ? (
        <nav className="flex items-center gap-5">
          {React.Children.map(children, (child, index) =>
            React.isValidElement(child) ? React.cloneElement(child, { key: index }) : child
          )}
        </nav>
      ) : null}
    </div>
  </header>
);

const ScrollManager = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const rawHash = location.hash.replace('#', '');
      let targetId = rawHash;
      try {
        targetId = decodeURIComponent(rawHash);
      } catch (error) {
        console.warn('Unable to decode hash segment', error);
      }

      if (targetId) {
        const element = document.getElementById(targetId);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 0);
          return;
        }
      }
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname, location.hash]);

  return null;
};

const createCaptcha = () => {
  const first = Math.floor(Math.random() * 8) + 1;
  const second = Math.floor(Math.random() * 8) + 1;
  return { first, second, answer: first + second };
};

const Booking = forwardRef((props, ref) => {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    phone: '',
    email: '',
    website: '',
    businessChallenge: '',
    captcha: ''
  });
  const [captcha, setCaptcha] = useState(createCaptcha);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      businessName: '',
      phone: '',
      email: '',
      website: '',
      businessChallenge: '',
      captcha: ''
    });
    setCaptcha(createCaptcha());
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your name.';
    if (!formData.businessName.trim()) newErrors.businessName = 'Please enter your business name.';
    if (!formData.phone.trim()) newErrors.phone = 'Please provide a phone number.';
    if (!formData.email.trim()) {
      newErrors.email = 'An email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!formData.website.trim()) {
      newErrors.website = 'Please share your current website URL or let me know if you do not have one yet.';
    } else {
      const websiteValue = formData.website.trim();
      const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/i;
      if (!urlPattern.test(websiteValue)) {
        newErrors.website = 'Enter a valid website URL (include https:// if available).';
      }
    }
    if (!formData.businessChallenge.trim()) {
      newErrors.businessChallenge = 'Tell me about the main challenge you want help with.';
    }
    if (!formData.captcha.trim()) {
      newErrors.captcha = 'Solve the captcha to verify you are human.';
    } else if (Number.parseInt(formData.captcha, 10) !== captcha.answer) {
      newErrors.captcha = 'Captcha answer is incorrect. Please try again.';
      setCaptcha(createCaptcha());
      setFormData((prev) => ({ ...prev, captcha: '' }));
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('https://formsubmit.co/ajax/admin@evanparra.ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          Name: formData.name,
          'Business Name': formData.businessName,
          Phone: formData.phone,
          Email: formData.email,
          'Current Website': formData.website,
          'Business Challenge': formData.businessChallenge
        })
      });

      if (!response.ok) throw new Error('Form submission failed');

      setStatus({ type: 'success', message: 'Thanks for reaching out! I will be in touch within one business day.' });
      resetForm();
    } catch (error) {
      console.error(error);
      setStatus({
        type: 'error',
        message:
          'Something went wrong while sending your message. Please try again in a moment or email me directly at admin@evanparra.ai.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref} id="booking" className="bg-white">
      <div className="container py-20 md:py-24">
        <SectionHeading
          eyebrow="Get Started"
          title="Get Your Free Business Assessment & Quote"
          body="Share a few details about your business so I can deliver a tailored automation roadmap with transparent pricing to help you grow smarter."
        />
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-10">
            <img
              src="/assets/evan-parra-headshot.png"
              alt="Evan Parra, a business technology consultant in St. Augustine, FL"
              className="w-36 h-36 md:w-44 md:h-44 rounded-full shadow-lg object-cover"
            />
          </div>
          <div className="bg-gray-50 border border-slate-200 rounded-2xl shadow-lg p-6 md:p-10">
            <div className="max-w-2xl mx-auto text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
                Get Your Free Business Assessment & Quote
              </h3>
              <p className="text-lg text-slate-600">
                I'm a real person, right here in St. Augustine, passionate about helping local businesses succeed. Share a few details below and I'll follow up with your personalized plan and next steps.
              </p>
            </div>
            <form className="grid gap-6" onSubmit={handleSubmit} noValidate>
              <div className="grid gap-2 text-left">
                <label htmlFor="name" className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className={`block w-full rounded-xl border px-4 py-3 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 ${
                    errors.name ? 'border-red-400 focus:ring-red-500 focus:border-red-500' : 'border-slate-200'
                  }`}
                  placeholder="Jane Smith"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && <p id="name-error" className="text-sm text-red-600">{errors.name}</p>}
              </div>
              <div className="grid gap-2 text-left">
                <label htmlFor="businessName" className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  Business Name
                </label>
                <input
                  id="businessName"
                  name="businessName"
                  type="text"
                  value={formData.businessName}
                  onChange={handleChange}
                  className={`block w-full rounded-xl border px-4 py-3 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 ${
                    errors.businessName ? 'border-red-400 focus:ring-red-500 focus:border-red-500' : 'border-slate-200'
                  }`}
                  placeholder="St. Augustine Creative Co."
                  aria-invalid={Boolean(errors.businessName)}
                  aria-describedby={errors.businessName ? 'business-name-error' : undefined}
                />
                {errors.businessName && (
                  <p id="business-name-error" className="text-sm text-red-600">
                    {errors.businessName}
                  </p>
                )}
              </div>
              <div className="grid gap-2 text-left">
                <label htmlFor="phone" className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`block w-full rounded-xl border px-4 py-3 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 ${
                    errors.phone ? 'border-red-400 focus:ring-red-500 focus:border-red-500' : 'border-slate-200'
                  }`}
                  placeholder="(904) 555-1234"
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
                {errors.phone && <p id="phone-error" className="text-sm text-red-600">{errors.phone}</p>}
              </div>
              <div className="grid gap-2 text-left">
                <label htmlFor="email" className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full rounded-xl border px-4 py-3 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 ${
                    errors.email ? 'border-red-400 focus:ring-red-500 focus:border-red-500' : 'border-slate-200'
                  }`}
                  placeholder="you@example.com"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && <p id="email-error" className="text-sm text-red-600">{errors.email}</p>}
              </div>
              <div className="grid gap-2 text-left">
                <label htmlFor="website" className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  Current Website
                </label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  value={formData.website}
                  onChange={handleChange}
                  className={`block w-full rounded-xl border px-4 py-3 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 ${
                    errors.website ? 'border-red-400 focus:ring-red-500 focus:border-red-500' : 'border-slate-200'
                  }`}
                  placeholder="https://yourbusiness.com"
                  aria-invalid={Boolean(errors.website)}
                  aria-describedby={errors.website ? 'website-error' : undefined}
                />
                {errors.website && <p id="website-error" className="text-sm text-red-600">{errors.website}</p>}
              </div>
              <div className="grid gap-2 text-left">
                <label htmlFor="businessChallenge" className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  What challenge should we tackle first?
                </label>
                <textarea
                  id="businessChallenge"
                  name="businessChallenge"
                  value={formData.businessChallenge}
                  onChange={handleChange}
                  className={`block w-full rounded-xl border px-4 py-3 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 ${
                    errors.businessChallenge ? 'border-red-400 focus:ring-red-500 focus:border-red-500' : 'border-slate-200'
                  }`}
                  rows={4}
                  placeholder="Share a quick overview of your goals, pain points, or the systems you use today."
                  aria-invalid={Boolean(errors.businessChallenge)}
                  aria-describedby={errors.businessChallenge ? 'business-challenge-error' : undefined}
                ></textarea>
                {errors.businessChallenge && (
                  <p id="business-challenge-error" className="text-sm text-red-600">
                    {errors.businessChallenge}
                  </p>
                )}
              </div>
              <div className="grid gap-2 text-left">
                <label htmlFor="captcha" className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  Quick math check ({captcha.first} + {captcha.second})
                </label>
                <input
                  id="captcha"
                  name="captcha"
                  type="text"
                  inputMode="numeric"
                  value={formData.captcha}
                  onChange={handleChange}
                  className={`block w-full rounded-xl border px-4 py-3 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 ${
                    errors.captcha ? 'border-red-400 focus:ring-red-500 focus:border-red-500' : 'border-slate-200'
                  }`}
                  placeholder="Enter the sum"
                  aria-invalid={Boolean(errors.captcha)}
                  aria-describedby={errors.captcha ? 'captcha-error' : undefined}
                />
                {errors.captcha && <p id="captcha-error" className="text-sm text-red-600">{errors.captcha}</p>}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-xl bg-blue-700 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-80"
              >
                {isSubmitting ? 'Submitting…' : 'Request Your Assessment'}
              </button>
              <div className="text-sm text-slate-500 text-center">
                <p>
                  By submitting this form, you agree to receive follow-up communication about your business assessment and quote.
                </p>
                <p className="mt-2">
                  I'll only use this information to build your tailored plan and follow up about your free assessment.
                </p>
                {status && (
                  <p
                    className={`text-sm text-center font-medium ${
                      status.type === 'success' ? 'text-green-600' : 'text-red-600'
                    }`}
                    role="status"
                    aria-live="polite"
                  >
                    {status.message}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
});

const Footer = () => (
  <footer className="bg-gray-900 text-white">
    <div className="container py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-slate-400">
        <p>&copy; {new Date().getFullYear()} Evan R. Parra. Serving St. Johns County, FL.</p>
        <div className="flex items-center gap-4 justify-center md:justify-end">
          <a href="mailto:admin@evanparra.ai" className="hover:text-white transition" aria-label="Email Evan">
            admin@evanparra.ai
          </a>
          <span className="text-slate-600 hidden md:inline" aria-hidden="true">
            •
          </span>
          <a href="https://www.linkedin.com/in/evanparra/" className="hover:text-white transition" aria-label="LinkedIn profile">
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  </footer>
);

const NotFoundPage = () => {
  const navLinkClasses =
    'inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SiteHeader>
        <Link to="/" className={navLinkClasses}>
          Back to Homepage
        </Link>
        <Link to="/#services" className={navLinkClasses}>
          View Services
        </Link>
      </SiteHeader>
      <main className="flex-1 flex items-center">
        <div className="container py-24 text-center max-w-3xl">
          <p className="text-sm uppercase tracking-widest text-blue-600 font-semibold">404</p>
          <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-slate-900">We couldn’t find that page.</h1>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            The page you requested doesn’t exist. Try heading back to the homepage or explore the services I offer.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              Return Home
            </Link>
            <Link
              to="/#services"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold border border-slate-300 text-slate-800 hover:border-blue-600 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              View Services
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const service = servicesData.find((item) => item.slug === slug);

  if (!service) {
    return <NotFoundPage />;
  }

  const navLinkClasses =
    'inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SiteHeader>
        <Link to="/" className={navLinkClasses}>
          <span aria-hidden="true">←</span>
          Back to Homepage
        </Link>
        <Link to="/#services" className={navLinkClasses}>
          View All Services
        </Link>
        <Link to="/#booking" className={navLinkClasses}>
          Book a Call
        </Link>
      </SiteHeader>
      <main className="flex-1">
        <section className="bg-white border-b border-slate-200">
          <div className="container py-16 md:py-20">
            <p className="text-sm uppercase tracking-widest text-blue-600 font-semibold mb-4">Service Detail</p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">{service.title}</h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-3xl">{service.detail.lead}</p>
          </div>
        </section>
        <section className="bg-gray-50">
          <div className="container py-16 md:py-20 space-y-16">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">What You’ll Gain</h2>
              <ul className="mt-6 space-y-4">
                {service.detail.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <span className="mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-blue-600"></span>
                    <span className="text-lg text-slate-700 leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Outcomes You Can Expect</h2>
              <ul className="mt-6 grid gap-4 md:grid-cols-2">
                {service.detail.outcomes.map((outcome) => (
                  <li
                    key={outcome}
                    className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-start gap-3"
                  >
                    <span className="mt-1 text-blue-600" aria-hidden="true">
                      ✓
                    </span>
                    <span className="text-base text-slate-700 leading-relaxed">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid gap-10 lg:grid-cols-3 lg:items-start">
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">How We Work Together</h2>
                <ol className="mt-6 space-y-4">
                  {service.detail.process.map((step, index) => (
                    <li
                      key={step.title}
                      className="flex items-start gap-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white font-semibold text-lg">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                        <p className="mt-2 text-slate-700 leading-relaxed">{step.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              <aside className="bg-blue-50 border border-blue-100 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="text-lg font-semibold text-blue-900">Built for St. Johns County</h3>
                <p className="text-slate-700 leading-relaxed">{service.detail.localFocus}</p>
              </aside>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10 shadow-lg text-center">
              <p className="text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">{service.detail.closing}</p>
              <Link
                to="/#booking"
                className="mt-6 inline-flex items-center justify-center bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                Book a Free Insight Audit
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const HomePage = () => {
  const caseStudyRef = useRef(null);
  const servicesRef = useRef(null);
  const bookingRef = useRef(null);

  const scrollToSection = useCallback((ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleScrollToCases = useCallback(() => scrollToSection(caseStudyRef), [scrollToSection]);
  const handleScrollToServices = useCallback(() => scrollToSection(servicesRef), [scrollToSection]);
  const handleScrollToBooking = useCallback(() => scrollToSection(bookingRef), [scrollToSection]);

  const navButtonClasses =
    'inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SiteHeader>
        <button type="button" onClick={handleScrollToCases} className={navButtonClasses}>
          Case Studies
        </button>
        <button type="button" onClick={handleScrollToServices} className={navButtonClasses}>
          Services
        </button>
        <button type="button" onClick={handleScrollToBooking} className={navButtonClasses}>
          Book a Call
        </button>
      </SiteHeader>
      <Hero onCtaClick={handleScrollToServices} />
      <main>
        <div ref={caseStudyRef}>
          <CaseStudyCarousel />
        </div>
        <div ref={servicesRef}>
          <Services items={servicesData} />
        </div>
        <Booking ref={bookingRef} />
      </main>
      <Footer />
    </div>
  );
};

const App = () => (
  <HashRouter>
    <ScrollManager />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services/:slug" element={<ServiceDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </HashRouter>
);

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
