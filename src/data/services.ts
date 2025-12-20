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
    slug: 'ai-agents',
    title: 'AI Agents (Revenue Up)',
    icon: 'fa-solid fa-robot',
    summary:
      'Never miss a lead. I build intelligent agents that follow up, provide quotes, answer FAQs, and book appointments 24/7—grounded on your business data.',
    detail: { 
      lead: 'Your business sleeps, but your customers don\'t. I build AI agents that act as your best sales rep—working 24/7 to capture leads, answer questions, and book appointments. Unlike basic chatbots, these agents are grounded in your specific business data (RAG), ensuring accurate, helpful responses every time.', 
      benefits: [
        'Instant response to every lead, day or night.',
        'Automated appointment booking directly to your calendar.',
        'Intelligent handling of FAQs and service inquiries.',
        'Seamless handoff to human staff when necessary.',
      ], 
      outcomes: [
        'Higher conversion rates from existing traffic.',
        'Zero missed opportunities due to after-hours inquiries.',
        'Reduced admin time spent on repetitive questions.',
        'A modern, professional customer experience.',
        'Scalable lead handling without hiring more staff.',
        'Increased revenue through automated follow-ups.',
      ], 
      process: [
        {title: 'Knowledge Base Setup', description: 'We compile your pricing, services, and FAQs into a knowledge base that the AI uses to answer accurately.'},
        {title: 'Agent Configuration', description: 'I configure the agent\'s personality, guardrails, and integration points (SMS, Email, Web Chat).'},
        {title: 'Testing & Launch', description: 'We rigorously test the agent against real-world scenarios before deploying it to your live channels.'},
      ], 
      localFocus: 'Built for St. Augustine and Jacksonville businesses to compete with national chains.', 
      closing: 'Ready to clone your best employee? Let\'s build your custom AI agent.' 
    }
  },
  {
    slug: 'intelligent-document-processing',
    title: 'Intelligent Docs / IDP (Admin Down)',
    icon: 'fa-solid fa-file-invoice',
    summary:
      'Stop manual data entry. Automatically extract data from invoices, intake forms, insurance docs, and permits, then route it to your systems.',
    detail: { 
      lead: 'Drowning in paperwork? Manual data entry is slow, error-prone, and expensive. I implement Intelligent Document Processing (IDP) systems that automatically read, extract, and enter data from your documents—whether they are PDFs, images, or emails.', 
      benefits: [
        'Eliminate manual data entry errors.',
        'Process invoices and forms in seconds, not hours.',
        'Automatically route data to your CRM, ERP, or Database.',
        'Free up your team for high-value work.',
      ], 
      outcomes: [
        '90% reduction in document processing time.',
        'Faster invoice payments and approvals.',
        'Real-time data availability for decision making.',
        'Reduced operational costs and overhead.',
        'Improved compliance and audit trails.',
        'Scalable document handling for growth.',
      ], 
      process: [
        {title: 'Document Analysis', description: 'We analyze your current document workflows and identify the high-volume, repetitive types suitable for automation.'},
        {title: 'Extraction Pipeline', description: 'I set up the AI models to extract specific fields (dates, amounts, names) with high accuracy.'},
        {title: 'System Integration', description: 'The extracted data is automatically pushed to your existing software (QuickBooks, Salesforce, etc.).'},
      ], 
      localFocus: 'Perfect for local contractors, medical practices, and logistics companies dealing with heavy paperwork.', 
      closing: 'Stop being a data entry clerk. Let AI handle your paperwork.' 
    }
  },
  {
    slug: 'computer-vision',
    title: 'Computer Vision (Less Rework)',
    icon: 'fa-solid fa-eye',
    summary:
      'Automate visual inspections. Use AI to classify photos, detect compliance issues, track inventory, and verify job site quality instantly.',
    detail: { 
      lead: 'Visual inspections are critical but time-consuming. Whether it\'s checking job site progress, verifying inventory, or ensuring safety compliance, Computer Vision can automate the "looking" part of your business. I build systems that analyze images and video to provide instant feedback and alerts.', 
      benefits: [
        'Instant quality control and defect detection.',
        'Automated inventory tracking and counting.',
        'Safety compliance monitoring on job sites.',
        'Before/After verification for service work.',
      ], 
      outcomes: [
        'Standardized quality across all projects.',
        'Reduced rework and warranty claims.',
        'Real-time visibility into field operations.',
        'Automated documentation of work performed.',
        'Enhanced safety and compliance.',
        'Faster turnover times.',
      ], 
      process: [
        {title: 'Image Collection', description: 'We gather a dataset of images representing the conditions or objects you need to detect.'},
        {title: 'Model Training', description: 'I train a custom vision model to identify the specific features relevant to your business.'},
        {title: 'Deployment', description: 'The model is deployed to a mobile app or cloud service for real-time analysis in the field.'},
      ], 
      localFocus: 'Ideal for construction, real estate, and manufacturing businesses in NE Florida.', 
      closing: 'Give your business a new set of eyes. Let\'s explore computer vision solutions.' 
    }
  }
];

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((service) => service.slug === slug);
