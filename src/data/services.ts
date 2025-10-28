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
    detail: { lead: '', benefits: [], outcomes: [], process: [], localFocus: '', closing: '' }
  },
  {
    slug: 'process-automation-st-johns-county',
    title: 'Workflow & Process Automation for St. Johns County Businesses',
    icon: 'fa-solid fa-gears',
    summary:
      'I help St. Johns County businesses stop wasting time on manual tasks like invoicing and data entry so they can get paid faster and reduce admin headaches. Let\'s automate your workflow.',
      detail: { lead: '', benefits: [], outcomes: [], process: [], localFocus: '', closing: '' }
  },
  {
    slug: 'dashboards-reporting-st-augustine',
    title: 'Custom KPI Dashboards for St. Augustine Owners',
    icon: 'fa-solid fa-chart-pie',
    summary:
      'Tired of guessing? I build custom KPI dashboards for St. Augustine owners to see jobs booked, unpaid invoices, and real-time profit in plain English. Make data-driven decisions.',
      detail: { lead: '', benefits: [], outcomes: [], process: [], localFocus: '', closing: '' }
  },
  {
    slug: 'ai-assistant-automation-st-augustine',
    title: 'AI Assistant & Automation Setup in St. Augustine, FL',
    icon: 'fa-solid fa-brain',
    summary:
      'I set up AI assistants for St. Augustine businesses that act like an extra employee—following up on leads, answering questions, and scheduling appointments, so you never miss an opportunity.',
      detail: { lead: '', benefits: [], outcomes: [], process: [], localFocus: '', closing: '' }
  }
];

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((service) => service.slug === slug);
