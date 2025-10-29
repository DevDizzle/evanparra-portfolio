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
    slug: 'web-design-st-augustine',
    title: 'Small Business Web Design in St. Augustine, FL',
    icon: 'fa-solid fa-window-maximize',
    summary:
      'I build fast, mobile-friendly websites for St. Augustine businesses that capture leads, book appointments, and process payments. Get a site that works as hard as you do.',
    detail: { 
      lead: 'Is your website working for you? In a town that thrives on tourism and local traffic, your site needs to be more than just a digital brochure. It needs to be a 24/7 lead-generating machine. I build fast, mobile-first websites for St. Augustine businesses that capture leads, integrate with your booking and payment systems, and make it effortless for customers to choose you.', 
      benefits: [
        'Increase in qualified leads by over 50%',
        'Seamless online booking and payment processing',
        'Flawless performance on all mobile devices',
        'Instant loading speeds that keep customers engaged',
      ], 
      outcomes: [
        'A professional, modern website that builds trust and credibility.',
        'A powerful lead-generation tool that consistently brings in new customers.',
        'A streamlined online experience for your customers, from browsing to payment.',
        'A significant competitive advantage in the local St. Augustine market.',
        'A hassle-free, fully-managed website that lets you focus on your business.',
        'A measurable return on your investment through increased sales and bookings.',
      ], 
      process: [
        {title: 'Discovery & Strategy', description: 'We start with a deep dive into your business goals, target audience, and competitive landscape. This allows us to create a strategic plan for your new website.'},
        {title: 'Design & Development', description: 'Next, I design and develop a custom website that is tailored to your brand and optimized for conversions. You\'ll have a chance to review and provide feedback at every stage.'},
        {title: 'Launch & Optimization', description: 'Once you\'re thrilled with the result, we\'ll launch your new website. But it doesn\'t stop there. I\'ll continue to monitor its performance and make data-driven optimizations to ensure it\'s always delivering results.'},
      ], 
      localFocus: 'As a St. Augustine local, I understand the unique challenges and opportunities of our market. I\'m not just a web designer; I\'m a partner in your success.', 
      closing: 'Ready to get a website that grows your business? Let\'s build a powerful online presence that turns visitors into loyal customers.' 
    }
  },
  {
    slug: 'process-automation-st-johns-county',
    title: 'Workflow & Process Automation for St. Johns County Businesses',
    icon: 'fa-solid fa-gears',
    summary:
      'I help St. Johns County businesses stop wasting time on manual tasks like invoicing and data entry so they can get paid faster and reduce admin headaches. Let\'s automate your workflow.',
      detail: { 
        lead: 'Are you drowning in administrative tasks? Manual invoicing, duplicate data entry across different systems, and missed client follow-ups are silent profit killers. For many St. Johns County businesses, these small tasks add up to hours of wasted time and costly mistakes. I build automated workflows that get you paid faster, eliminate tedious admin work, and ensure you never let a lead slip through the cracks.', 
        benefits: [
          'Get paid faster with automated invoicing and follow-ups.',
          'Eliminate costly data entry errors and duplicate work.',
          'Convert more leads with automated follow-up sequences.',
          'Free up your team to focus on high-value, revenue-generating activities.',
        ], 
        outcomes: [
          'A streamlined, efficient workflow that saves you time and money.',
          'Improved cash flow and reduced accounts receivable.',
          'A significant reduction in administrative headaches and busywork.',
          'A more scalable business that can grow without adding more overhead.',
          'Happier, more productive employees who can focus on what they do best.',
          'Peace of mind knowing that your business is running smoothly, even when you\'re not there.',
        ], 
        process: [
          {title: 'Process Analysis', description: 'We\'ll map out your existing workflows to identify bottlenecks, redundancies, and opportunities for automation. This helps us understand where we can make the biggest impact.'},
          {title: 'Automation Design', description: 'Next, I\'ll design a custom automation solution that connects your existing software and tools. You\'ll get a clear plan of what we\'re building and how it will work.'},
          {title: 'Implementation & Testing', description: 'I\'ll then build and rigorously test your new automated workflows to ensure they\'re working flawlessly. You can be confident that your business is in good hands.'},
        ], 
        localFocus: 'I\'m based right here in St. Johns County, so I understand the local business landscape. I\'m here to provide hands-on support and help you succeed.', 
        closing: 'Let\'s find the bottlenecks in your business. I’ll create a custom automation plan to save you time and money.' 
      }
  },
  {
    slug: 'dashboards-reporting-st-augustine',
    title: 'Custom KPI Dashboards for St. Augustine Owners',
    icon: 'fa-solid fa-chart-pie',
    summary:
      'Tired of guessing? I build custom KPI dashboards for St. Augustine owners to see jobs booked, unpaid invoices, and real-time profit in plain English. Make data-driven decisions.',
      detail: { 
        lead: 'Do you know your business numbers, right now? As a St. Augustine business owner, you need to see what\'s working and what isn\'t, without digging through spreadsheets. I build custom KPI (Key Performance Indicator) dashboards that give you a real-time, plain-English view of your most important metrics. See jobs booked, unpaid invoices, profit margins, and marketing ROI at a glance, so you can make smart, data-driven decisions.', 
        benefits: [
          'Make data-driven decisions with confidence and clarity.',
          'Identify and address problems before they become critical.',
          'Uncover hidden opportunities for growth and profitability.',
          'Align your team around the key metrics that drive success.',
        ], 
        outcomes: [
          'A single, easy-to-understand view of your business performance.',
          'Real-time insights into your sales, marketing, and financial data.',
          'A clear understanding of what\'s working and what\'s not.',
          'The ability to spot trends and make proactive adjustments.',
          'A competitive edge in the St. Augustine market.',
          'A data-driven culture that empowers your team to make better decisions.',
        ], 
        process: [
          {title: 'Metric Identification', description: 'We\'ll work together to identify the key performance indicators (KPIs) that are most important to your business. We\'ll focus on the numbers that truly matter.'},
          {title: 'Data Integration', description: 'I\'ll securely connect to your existing data sources, such as QuickBooks, your CRM, and Google Analytics. Your data will be safe and sound.'},
          {title: 'Dashboard Creation', description: 'I\'ll then design and build a custom dashboard that visualizes your KPIs in a way that is easy to understand and act on. You\'ll get a clear, concise view of your business.'},
        ], 
        localFocus: 'As a local St. Augustine consultant, I\'m here to provide personalized support and help you make sense of your data. Let\'s unlock the power of your numbers together.', 
        closing: 'Stop guessing and start knowing. Let\'s discuss how a custom KPI dashboard can bring clarity to your business.' 
      }
  },
  {
    slug: 'ai-assistant-automation-st-augustine',
    title: 'AI Assistant & Automation Setup in St. Augustine, FL',
    icon: 'fa-solid fa-brain',
    summary:
      'I set up AI assistants for St. Augustine businesses that act like an extra employee—following up on leads, answering questions, and scheduling appointments, so you never miss an opportunity.',
      detail: { 
        lead: 'Imagine having an extra employee, one who never forgets to follow up, works 24/7, and instantly responds to every new lead. That\'s what a custom AI assistant can do for your St. Augustine business. I\'ll set up an AI-powered system that seamlessly integrates with your website and CRM to nurture leads, answer common questions, and schedule appointments, ensuring you capture every opportunity, even when you\'re busy.', 
        benefits: [
          'Capture and convert more leads, even when you\'re not available.',
          'Save time and money by automating repetitive communication tasks.',
          'Provide a better, more responsive experience for your customers.',
          'Free up your team to focus on what they do best: serving your customers.',
        ], 
        outcomes: [
          'A 24/7 sales and customer service assistant for your business.',
          'A significant increase in lead capture and conversion rates.',
          'A reduction in response times and missed opportunities.',
          'A more efficient and scalable way to manage customer interactions.',
          'A competitive advantage in the fast-paced St. Augustine market.',
          'A powerful tool that helps you grow your business without adding headcount.',
        ], 
        process: [
          {title: 'AI Strategy Session', description: 'We\'ll discuss your business goals and identify the best opportunities to use AI and automation. We\'ll create a clear plan for your AI assistant.'},
          {title: 'AI Implementation', description: 'I\'ll then build and train your custom AI assistant, integrating it with your website, CRM, and other tools. It will be ready to go to work for you.'},
          {title: 'Performance Monitoring', description: 'After launch, I\'ll monitor your AI assistant\'s performance and make adjustments as needed to ensure it\'s delivering the best possible results. You can be confident that your AI is always learning and improving.'},
        ], 
        localFocus: 'I\'m a local St. Augustine expert in AI and automation. I\'m here to help you harness the power of this technology to grow your business.', 
        closing: 'Ready to put your lead generation on autopilot? Let\'s see how an AI assistant can work for your business.' 
      }
  }
];

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((service) => service.slug === slug);
