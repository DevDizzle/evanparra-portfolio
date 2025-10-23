export interface CaseStudyPoint {
  title: string;
  description: string;
}

export interface CaseStudy {
  eyebrow: string;
  body: string;
  before: string[];
  after: string[];
  insightTitle: string;
  insightBody: string;
  insightPoints: CaseStudyPoint[];
}

export const caseStudies: CaseStudy[] = [
  {
    eyebrow: 'ProfitScout for Options Traders',
    body: 'A client was drowning in complex data, spending days on manual research that led to missed opportunities. The challenge was to automate this analysis and deliver clear, actionable insights instantly, turning data overload into a key advantage.',
    before: ['Days of manual data gathering.', 'Missed opportunities due to slow analysis.', 'Decisions based on incomplete information.'],
    after: [
      'Under five minutes for a complete, AI-driven analysis.',
      'Clear signals on the highest-scoring market setups.',
      'Confident, data-driven decisions.'
    ],
    insightTitle: 'How ProfitScout Delivers Real Insight',
    insightBody:
      'It’s an AI-powered tool that automatically analyzes thousands of data points to provide a clear, forward-looking view of stocks and options, allowing traders to make confident, data-driven decisions.',
    insightPoints: [
      {
        title: 'Analyzes the full picture',
        description:
          'It processes everything from 10-K filings and earnings calls to options chain data and market sentiment.'
      },
      {
        title: 'Provides a nuanced view',
        description:
          'Instead of a simple buy or sell rating, it offers a five-tier analysis with a summary of why.'
      },
      {
        title: 'Highlights top opportunities',
        description:
          'The Confluence Dashboard shows where stock and options data align, pointing to the most promising setups.'
      }
    ]
  },
  {
    eyebrow: 'Coastal Waste & Recycling Automation',
    body: 'A local industrial client was losing hours to manual, paper-based inventory tracking. This caused inaccurate reporting and operational delays. I built a simple mobile web app that digitized their workflow, dramatically increasing efficiency and data accuracy.',
    before: ['Hours lost to manual data entry.', 'Inaccurate understanding of throughput.', 'Delayed reporting for management.'],
    after: ['~70% reduction in processing time.', 'Centralized, real-time inventory data.', 'Improved data quality and operational efficiency.'],
    insightTitle: 'How the Web App Solved the Problem',
    insightBody:
      "I developed the 'Coastal Inventory Logger,' an internal web app that allows field teams to log data from their phones, automating the entire workflow.",
    insightPoints: [
      {
        title: 'Simple mobile interface',
        description: 'Designed for quick, easy data entry on the go, reducing errors and saving time.'
      },
      {
        title: 'Centralized database',
        description: 'All data feeds into a single source of truth, providing managers with instant, accurate reports.'
      },
      {
        title: 'Automated alerts',
        description: 'The system flags low-inventory items automatically, preventing shortages and improving planning.'
      }
    ]
  },
  {
    eyebrow: 'AI for Skin Lesion Analysis',
    body: 'A challenge in the medical field is the time-consuming and subjective analysis of complex images. To solve this, I developed a secure, AI-powered tool that provides objective, data-driven analysis to support the critical judgment of medical professionals.',
    before: ['Time-consuming manual review of images.', 'Reliance on subjective visual assessment.', 'Lack of immediate, data-driven feedback.'],
    after: [
      'Instant AI analysis of uploaded skin lesion images.',
      'Objective classification with confidence scores.',
      'Heatmap overlays to pinpoint areas of concern.'
    ],
    insightTitle: 'How AI Supports Clinical Judgment',
    insightBody:
      "This secure, HIPAA-compliant web app uses a custom-trained AI model to analyze dermoscopic images, providing clinicians with data-driven insights to support their diagnosis.",
    insightPoints: [
      {
        title: 'Custom-trained AI model',
        description: "Deployed on Google Cloud's Vertex AI for high accuracy in lesion classification."
      },
      {
        title: 'Secure & compliant',
        description:
          'Built with HIPAA compliance in mind, featuring secure authentication and encrypted data transmission.'
      },
      {
        title: 'Actionable visual feedback',
        description:
          'Provides not just a classification, but also heatmaps that visually guide professionals to the most diagnostically relevant regions.'
      }
    ]
  }
];
