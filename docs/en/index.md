---
layout: page
---

<script setup>
import Hero from '../.vitepress/theme/components/Hero.vue'
import Features from '../.vitepress/theme/components/Features.vue'
import HowItWorks from '../.vitepress/theme/components/HowItWorks.vue'
import UseCases from '../.vitepress/theme/components/UseCases.vue'
import Pricing from '../.vitepress/theme/components/Pricing.vue'
import Footer from '../.vitepress/theme/components/Footer.vue'

const heroData = {
  badge: 'Unified Management · Smart Organization · Instant Search',
  title: 'AI Chat History Assistant',
  points: [
    {
      icon: 'unified',
      text: 'Unified management for WeChat, Email, WhatsApp conversations'
    },
    {
      icon: 'ai',
      text: 'AI recognizes image content + intelligent analysis and categorization'
    },
    {
      icon: 'search',
      text: 'Find historical conversations instantly'
    },
    {
      icon: 'process',
      text: 'Select → Forward → Done!'
    }
  ],
  primaryButtonText: 'Get Started',
  primaryButtonLink: 'https://app.aimychats.com/register',
  secondaryButtonText: 'View Features',
  secondaryButtonLink: '/en/#features',
  carouselSlides: [
    {
      image: '/images/dashboard-list-en.png',
      alt: 'AImyChats product screenshot - List view',
      title: 'Unified Conversation Management',
      description: 'WeChat, Email, WhatsApp conversations all in one place, smart search also available on this page'
    },
    {
      image: '/images/detailed-en.png',
      alt: 'AImyChats product screenshot - Detailed view',
      title: 'Conversation Intelligent Information Display',
      description: 'AI intelligent summary, original conversation reference including images, attachment information display'
    }
  ],
  imageSrc: '/images/dashboard-list-en.png',
  imageAlt: 'AImyChats product screenshot - List view',
  features: []
}

const howItWorksData = {
  title: 'Get Started in 3 Simple Steps',
  subtitle: 'No complex configuration required, get started in minutes',
  steps: [
    {
      icon: 'email',
      title: 'Forward Chat History',
      description: 'Forward WeChat, email, or any chat history to your dedicated AI inbox. The system automatically receives and processes it.'
    },
    {
      icon: 'ai',
      title: 'AI Intelligent Analysis',
      description: 'AI automatically extracts key information, generates summaries, and identifies important points to help you quickly understand conversation content and action items.'
    },
    {
      icon: 'dashboard',
      title: 'Permanent Storage & Review',
      description: 'All chat history is permanently saved in the cloud. Search and review anytime. Never worry about losing records or expiration!'
    }
  ]
}

const featuresData = {
  title: 'Make Chat History Clear Again',
  subtitle: 'Unified Cross-Platform Management · Intelligent Text & Image Understanding',
  features: [
    {
      icon: 'backup',
      title: 'All Conversations in One Place',
      description: 'WeChat, email, customer service messages... No longer scattered everywhere. One-click forwarding automatically organizes and categorizes. All communications finally return to the same space.'
    },
    {
      icon: 'search',
      title: 'Find What You Need Instantly',
      description: 'Not just ordinary search. It\'s multi-dimensional retrieval based on text, images, contacts, and scenarios. So fast it feels like jumping directly to the line you want to see.'
    },
    {
      icon: 'image',
      title: 'Understands Both Text and Images',
      description: 'Screenshots, data charts, UI designs, tables, photos. AI understands it all. Combined text and image understanding makes every summary more complete and reliable.'
    },
    {
      icon: 'backup',
      title: 'Always Saved, Never Lost',
      description: 'Changing phones, clearing cache, expired images are no longer problems. Your chat history is continuously saved in the cloud. Access it anytime, anywhere.'
    }
  ]
}

const useCasesData = {
  title: 'Who Needs Chat History AI Assistant?',
  subtitle: 'If you have important conversations to save and manage, AImyChats is your best choice',
  useCases: [
    {
      icon: 'team',
      role: 'Enterprise Executives',
      subtitle: 'Large amounts of information need quick review',
      description: 'Project communications, decision backgrounds, team discussions. AI automatically organizes key information to make decisions more efficient.',
      benefits: [
        'Automatic project communication archiving',
        'Multi-scenario AI analysis (Work / Product / Project)',
        'Important decisions permanently saved',
        'Quick traceability of decision basis'
      ]
    },
    {
      icon: 'lawyer',
      role: 'Lawyers',
      subtitle: 'Every communication is key evidence',
      description: 'Contracts, client consultations, evidence scattered across platforms. AI automatically structures and organizes to quickly find key content.',
      benefits: [
        'Multi-platform conversation archiving',
        'Combined text and image evidence understanding',
        'Key clauses automatically extracted',
        'Permanently searchable historical records'
      ]
    },
    {
      icon: 'doctor',
      role: 'Doctors',
      subtitle: 'Fragmented patient communications no longer missed',
      description: 'Patient screenshots, test reports, conversation notes scattered. AI automatically summarizes and organizes for more accurate patient tracking.',
      benefits: [
        'Automatic test report/prescription recognition',
        'Patient communications permanently preserved',
        'Key symptoms automatically extracted',
        'Quick search of patient history'
      ]
    },
    {
      icon: 'finance',
      role: 'Financial Advisors',
      subtitle: 'Clear boundaries in client communications',
      description: 'Every communication may affect trust or performance. AI helps you record, organize, and trace history.',
      benefits: [
        'Unified multi-platform communication management',
        'Clear recording of needs and commitments',
        'Image and text recognition restores client intent',
        'Traceable communication history'
      ]
    },
    {
      icon: 'sales',
      role: 'Account Managers',
      subtitle: 'Easy management of frequent client communications',
      description: 'Multi-platform client communications easily miss details. AI automatically organizes summaries and action items.',
      benefits: [
        'Client needs automatically extracted',
        'Image + text understanding',
        'Instant location of historical communications',
        'One-click sales summary generation'
      ]
    },
    {
      icon: 'consultant',
      role: 'Psychotherapists',
      subtitle: 'Complete client history tracking',
      description: 'Communication content needs structured preservation for review and long-term tracking.',
      benefits: [
        'Automatic multi-channel communication saving',
        'AI automatically organizes key points and goals',
        'Easy long-term tracking management',
        'Historical records accessible anytime'
      ]
    }
  ]
}

const pricingData = {
  title: 'Choose Your Plan',
  subtitle: 'Flexible pricing to meet different needs',
  featuredLabel: 'Best Value',
  plans: [
    {
      name: 'Free Trial',
      description: ' ',
      price: '$0',
      period: '/month',
      buttonText: 'Get Started',
      buttonLink: 'https://app.aimychats.com/register',
      features: [
        '5 conversation groups per month',
        '5 attachments per group',
        '1 GB storage',
        '30-day retention',
        'AI Image Recognition',
        'AI Smart Summary',
        'Basic Intelligent Analysis',
        'Basic Search'
      ],
      additionalInfo: 'Perfect for personal trial, experience core features, easily manage a small number of important conversations.'
    },
    {
      name: 'Starter',
      description: 'Individual Users',
      price: '$4.99',
      period: '/month',
      buttonText: 'Subscribe Now',
      buttonLink: 'https://app.aimychats.com/register',
      features: [
        '100 conversation groups per month',
        'Up to 10 attachments per group',
        '5 GB storage',
        '1-year retention',
        'AI Image Recognition',
        'AI Smart Summary',
        'Multi-Scenario Intelligent Analysis',
        'Advanced Search',
        'Metadata Auto-Analysis',
        'Non-Image Attachment Save & Download',
        'Multi-Language Intelligent Analysis (English/Chinese/Spanish)'
      ],
      additionalInfo: 'Daily chat history management, great value, supports images and other attachments, review anytime.'
    },
    {
      name: 'Standard',
      description: 'Professional Users',
      price: '$9.90',
      period: '/month',
      buttonText: 'Subscribe Now',
      buttonLink: 'https://app.aimychats.com/register',
      featured: true,
      features: [
        '500 conversation groups per month',
        'Up to 15 attachments per group',
        '10 GB storage',
        '3-year retention',
        'AI Image Recognition',
        'AI Smart Summary',
        'Multi-Scenario Intelligent Analysis',
        'Advanced Search',
        'Metadata Auto-Analysis',
        'Non-Image Attachment Save & Download',
        'Multi-Language Intelligent Analysis (English/Chinese/Spanish)',
        'IMAP Email Auto-Collection (Coming Soon)',
        'Smart Summary Auto-Submit to Internal Platform (JIRA) (Coming Soon)'
      ],
      additionalInfo: 'For professionals and small-to-medium business teams, supports more data volume and long-term storage.'
    },
    {
      name: 'Pro',
      description: 'Enterprise Users',
      price: '$29.99',
      period: '/month',
      buttonText: 'Subscribe Now',
      buttonLink: 'https://app.aimychats.com/register',
      features: [
        '2000 conversation groups per month',
        'Up to 25 attachments per group',
        '20 GB storage',
        'Permanent Storage',
        'AI Image Recognition',
        'AI Smart Summary',
        'Multi-Scenario Intelligent Analysis',
        'Advanced Search',
        'Metadata Auto-Analysis',
        'Non-Image Attachment Save & Download',
        'Multi-Language Intelligent Analysis (English/Chinese/Spanish)',
        'IMAP Email Auto-Collection (Coming Soon)',
        'Smart Summary Auto-Submit to Internal Platform (JIRA) (Coming Soon)'
      ],
      additionalInfo: 'For enterprise users handling large data volumes and long-term storage, combined text and image analysis, information management never lost.'
    }
  ],
  note: 'All paid plans can be upgraded or downgraded anytime. Monthly billing, cancel anytime.'
}

const footerData = {
  companyName: 'AImyChats',
  companyDescription: 'AI Chat History Assistant - Never lose important conversations, review anytime.',
  copyright: '',
  productTitle: 'Product',
  resourceTitle: 'Resources',
  companyTitle: '',
  aboutTitle: 'About',
  socialLinks: [
    { icon: 'github', url: 'https://github.com/cloud2ai/devify', name: 'GitHub' }
  ],
  productLinks: [
    { text: 'Features', url: '/en/#features' },
    { text: 'Pricing', url: '/en/#pricing' }
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
</script>

<Hero v-bind="heroData" />
<Features v-bind="featuresData" />
<HowItWorks v-bind="howItWorksData" />
<UseCases v-bind="useCasesData" />
<Pricing v-bind="pricingData" />
<Footer v-bind="footerData" />
