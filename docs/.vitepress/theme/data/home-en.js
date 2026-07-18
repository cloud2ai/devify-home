export const getHomeEnContent = () => ({
  heroData: {
    badge: 'Email · WhatsApp · WeChat — One Unified Inbox',
    githubUrl: 'https://github.com/cloud2ai/devify',
    title: 'Never Lose an Important<br>Conversation Again',
    subtitle: 'Connect your Gmail or Outlook directly via IMAP, or forward any chat to your AI inbox. Every message analyzed, permanently archived, and searchable in seconds.',
    points: [
      {
        icon: 'unified',
        text: 'Email, WhatsApp, WeChat — all in one place'
      },
      {
        icon: 'ai',
        text: 'AI reads text, images, screenshots, and documents'
      },
      {
        icon: 'search',
        text: 'Find any message from years ago instantly'
      },
      {
        icon: 'process',
        text: 'Forward → AI processes → Permanently saved'
      }
    ],
    primaryButtonText: 'Start for Free',
    primaryButtonLink: 'https://app.aimychats.com/register',
    secondaryButtonText: 'See How It Works',
    secondaryButtonLink: '/#features',
    carouselSlides: [
      {
        image: '/images/unified-inbox-en.png',
        alt: 'Email, WhatsApp, WeChat — all flowing into one AI inbox',
        title: 'Every Platform. One Inbox.',
        description:
          'Gmail, WhatsApp, WeChat — all your conversations flow into a single AI-powered archive, organized automatically',
        highlights: ['Multi-platform', 'AI-powered']
      },
      {
        image: '/images/dashboard-list-en.png',
        alt: 'AImyChats - Unified conversation dashboard',
        title: 'All Your Conversations, One Place',
        description:
          'Email threads, WhatsApp chats, WeChat exports — unified and searchable in a single dashboard',
        highlights: ['Unified inbox', 'Instant search']
      },
      {
        image: '/images/ai-analysis-feature.png',
        alt: 'AI extracts summaries, action items, and key decisions',
        title: 'AI Extracts What Actually Matters',
        description:
          'Every conversation automatically summarized, key decisions highlighted, action items pulled out — no manual reading needed',
        highlights: ['Auto summary', 'Structured output']
      }
    ],
    imageSrc: '/images/dashboard-list-en.png',
    imageAlt: 'AImyChats product screenshot',
    features: []
  },
  howItWorksData: {
    title: 'Three Ways to Get Started',
    subtitle: 'Connect your inbox directly, or forward anything manually — your choice',
    steps: [
      {
        icon: 'email',
        title: 'Connect Your Email via IMAP',
        description:
          'Link your Gmail, Outlook, or any IMAP inbox directly. New emails are pulled in and processed automatically — no forwarding needed. Or simply forward any conversation to your dedicated AI inbox.'
      },
      {
        icon: 'ai',
        title: 'AI Reads and Analyzes Everything',
        description:
          'The AI reads every message, understands images and screenshots, extracts key decisions, flags action items, and generates a clean summary — automatically, for every conversation.'
      },
      {
        icon: 'dashboard',
        title: 'Search Everything, Forever',
        description:
          'Every conversation is permanently stored in the cloud. Full-text search across all platforms and all time. Switch devices, clear cache — nothing is ever lost.'
      }
    ]
  },
  featuresData: {
    title: 'Your Conversations, Finally Under Control',
    subtitle: 'Unified inbox · AI that reads images · Permanent cloud archive',
    features: [
      {
        icon: 'backup',
        title: 'Every Platform, One Place',
        description:
          'Stop switching between Gmail, WhatsApp, and WeChat to piece together what happened. One forward and everything lives in one searchable archive — organized automatically.'
      },
      {
        icon: 'search',
        title: 'Find Anything in Seconds',
        description:
          "Not just keyword search. Multi-dimensional retrieval across senders, dates, topics, and platforms. That contract detail from 18 months ago? Found before you finish typing."
      },
      {
        icon: 'image',
        title: 'AI That Reads Your Screenshots',
        description:
          'Price quotes, contract snapshots, design files, data charts — if it was sent as an image, AI can read it. Screenshot content becomes searchable, summarizable, and actionable.'
      },
      {
        icon: 'backup',
        title: 'Permanent Archive, Zero Maintenance',
        description:
          'WhatsApp media expires. Phones get replaced. Email inboxes get cleared. AImyChats keeps everything indefinitely in the cloud — access it anytime, from any device.'
      }
    ]
  },
  useCasesData: {
    title: 'Who Uses AImyChats?',
    subtitle: 'Anyone who needs to find, prove, or remember something from a past conversation',
    useCases: [
      {
        icon: 'sales',
        role: 'Account Managers',
        subtitle: 'Every client promise, on record',
        description:
          'Client discussions span WhatsApp, email, and calls. AI automatically archives and summarizes every interaction so you can reference exactly what was agreed.',
        benefits: [
          'Multi-platform client communications archived',
          'Commitments and requirements clearly recorded',
          'Screenshot content (quotes, specs) auto-extracted',
          'Instant search across all client history'
        ]
      },
      {
        icon: 'lawyer',
        role: 'Lawyers',
        subtitle: 'Communications that hold up as evidence',
        description:
          'Client consultations, contract negotiations, case evidence — scattered across platforms. AI structures it all into a searchable, permanent record.',
        benefits: [
          'Multi-platform conversation archiving',
          'Image and document content AI-analyzed',
          'Key clauses and commitments auto-extracted',
          'Permanent, searchable case history'
        ]
      },
      {
        icon: 'team',
        role: 'Project Managers',
        subtitle: 'Decisions buried in group chats, surfaced',
        description:
          'Requirement changes, approval threads, action items — lost in long group chats. AI extracts decisions and to-dos automatically.',
        benefits: [
          'Group chat discussions structured automatically',
          'Requirement change history traceable',
          'Action items and owners auto-identified',
          'Multiple project channels in one view'
        ]
      },
      {
        icon: 'team',
        role: 'Executives',
        subtitle: 'Cross-channel clarity, at scale',
        description:
          'Strategic decisions happen across email, messaging, and calls. AI consolidates it all so you can trace any decision back to its source.',
        benefits: [
          'All communication channels unified',
          'Key decisions permanently preserved',
          'Multi-scenario AI analysis (projects, clients, internal)',
          'Decision context retrievable on demand'
        ]
      },
      {
        icon: 'doctor',
        role: 'Healthcare Professionals',
        subtitle: 'Complete patient communication history',
        description:
          'Lab reports shared as images, symptoms described over chat, follow-up notes via email — AI archives and organizes it all for accurate patient tracking.',
        benefits: [
          'Lab results and prescriptions auto-recognized',
          'Patient communication permanently preserved',
          'Key symptoms and instructions extracted',
          'Instant access to full patient history'
        ]
      },
      {
        icon: 'finance',
        role: 'Financial Advisors',
        subtitle: 'Every recommendation, documented',
        description:
          'Client conversations about investments, risks, and decisions need to be on record. AI turns scattered messages into a traceable, compliant archive.',
        benefits: [
          'Investment conversations fully documented',
          'Client confirmations clearly recorded',
          'Screenshot-based intent auto-captured',
          'Traceable history for compliance needs'
        ]
      }
    ]
  },
  pricingData: {
    title: 'Simple, Honest Pricing',
    subtitle: 'Start free. Upgrade when you need more.',
    featuredLabel: 'Most Popular',
    plans: [
      {
        name: 'Free',
        description: ' ',
        price: '$0',
        period: '/month',
        buttonText: 'Start for Free',
        buttonLink: 'https://app.aimychats.com/register',
        features: [
          '5 conversation groups/month',
          'Up to 5 attachments per group',
          '1 GB storage',
          '30-day retention',
          'AI Image Recognition',
          'AI Smart Summary',
          'Basic Analysis',
          'Basic Search'
        ],
        additionalInfo:
          'Try the full experience with no commitment. Perfect for occasional use.'
      },
      {
        name: 'Starter',
        description: 'Personal Use',
        price: '$4.99',
        period: '/month',
        buttonText: 'Get Started',
        buttonLink: 'https://app.aimychats.com/register',
        features: [
          '100 conversation groups/month',
          'Up to 10 attachments per group',
          '5 GB storage',
          '1-year retention',
          'AI Image Recognition',
          'AI Smart Summary',
          'Multi-Scenario Analysis',
          'Advanced Search',
          'Metadata Auto-Analysis',
          'File Attachment Download',
          'English / Chinese / Spanish Analysis'
        ],
        additionalInfo:
          'Great for individuals managing daily conversations across platforms.'
      },
      {
        name: 'Standard',
        description: 'Professional',
        price: '$9.90',
        period: '/month',
        buttonText: 'Get Started',
        buttonLink: 'https://app.aimychats.com/register',
        featured: true,
        features: [
          '500 conversation groups/month',
          'Up to 15 attachments per group',
          '10 GB storage',
          '3-year retention',
          'AI Image Recognition',
          'AI Smart Summary',
          'Multi-Scenario Analysis',
          'Advanced Search',
          'Metadata Auto-Analysis',
          'File Attachment Download',
          'English / Chinese / Spanish Analysis',
          'IMAP Email Auto-Collection (Coming Soon)',
          'Auto-submit to JIRA (Coming Soon)'
        ],
        additionalInfo:
          'Built for professionals and small teams who need volume, history, and reliability.'
      },
      {
        name: 'Pro',
        description: 'Enterprise',
        price: '$29.99',
        period: '/month',
        buttonText: 'Get Started',
        buttonLink: 'https://app.aimychats.com/register',
        features: [
          '2000 conversation groups/month',
          'Up to 25 attachments per group',
          '20 GB storage',
          'Permanent retention',
          'AI Image Recognition',
          'AI Smart Summary',
          'Multi-Scenario Analysis',
          'Advanced Search',
          'Metadata Auto-Analysis',
          'File Attachment Download',
          'English / Chinese / Spanish Analysis',
          'IMAP Email Auto-Collection (Coming Soon)',
          'Auto-submit to JIRA (Coming Soon)'
        ],
        additionalInfo:
          'For organizations that need maximum volume, permanent archive, and deep AI analysis.'
      }
    ],
    note: 'All plans billed monthly. Upgrade, downgrade, or cancel anytime — no lock-in.'
  },
  footerData: {
    companyName: 'AImyChats',
    companyDescription: 'AI-powered conversation archive. Never lose an important message again.',
    copyright: '',
    productTitle: 'Product',
    resourceTitle: 'Resources',
    companyTitle: '',
    aboutTitle: 'About',
    socialLinks: [
      { icon: 'github', url: 'https://github.com/cloud2ai/devify', name: 'GitHub' }
    ],
    productLinks: [
      { text: 'Features', url: '/#features' },
      { text: 'Pricing', url: '/#pricing' }
    ],
    resourceLinks: [
      { text: 'FAQ', url: '/en/faq' },
      { text: 'Quick Guide', url: '/en/guide/getting-started' }
    ],
    companyLinks: [],
    aboutLinks: [
      { text: 'About Us', url: '/en/about' }
    ],
    legalLinks: [
      { text: 'Privacy', url: '/en/privacy' },
      { text: 'Terms', url: '/en/terms' }
    ]
  }
})
