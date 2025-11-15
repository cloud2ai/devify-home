---
layout: page
---

<script setup>
import Hero from '../.vitepress/theme/components/Hero.vue'
import Features from '../.vitepress/theme/components/Features.vue'
import HowItWorks from '../.vitepress/theme/components/HowItWorks.vue'
import UseCases from '../.vitepress/theme/components/UseCases.vue'
import Pricing from '../.vitepress/theme/components/Pricing.vue'
import PricingComparison from '../.vitepress/theme/components/PricingComparison.vue'
import Footer from '../.vitepress/theme/components/Footer.vue'

const heroData = {
  badge: 'Image Recognition · Multi-Scenario AI',
  title: 'AI Chat History Assistant',
  subtitle: 'Save WeChat, Email, WhatsApp conversations forever. AI recognizes images + multi-scenario analysis. Work, Support, Product... precise understanding for different scenarios!',
  primaryButtonText: 'Get Started',
  primaryButtonLink: 'https://app.aimychats.com/register',
  secondaryButtonText: 'Learn More',
  secondaryButtonLink: '/en/#features',
  imageSrc: '/images/dashboard-list-en.png',
  imageAlt: 'AImyChats product screenshot - List view',
  features: [
    'AI Image Recognition',
    'Multi-Scenario Analysis',
    'Permanent Storage',
    'Smart Search'
  ]
}

const howItWorksData = {
  title: 'Get Started in 3 Simple Steps',
  subtitle: 'No complex setup required, start in minutes',
  steps: [
    {
      icon: 'email',
      title: 'Forward Chat History',
      description: 'Forward WeChat, email, or any chat history to your dedicated AI inbox. System auto-receives and processes.'
    },
    {
      icon: 'ai',
      title: 'AI Multi-Scenario Analysis',
      description: 'AI recognizes image content (screenshots, charts, photos) and analyzes based on scenario (work, support, product, etc.). Different scenarios, different focus, more precise understanding!'
    },
    {
      icon: 'dashboard',
      title: 'Permanent Storage & Review',
      description: 'All chat history saved permanently in cloud. Search and review anytime. Never worry about losing records!'
    }
  ]
}

const featuresData = {
  title: 'Solving Chat History Pain Points',
  subtitle: 'Image Recognition + Multi-Scenario AI, Smarter Than Generic Summaries',
  features: [
    {
      icon: 'ai',
      title: 'Multi-Scenario Smart Analysis',
      description: 'Work communication, customer support, product discussion... Select conversation scenario for AI targeted analysis. Support scenario extracts key issues, Product scenario identifies requirement details - smarter and more precise!'
    },
    {
      icon: 'image',
      title: 'AI Image Recognition + Text+Image Combined',
      description: 'Screenshots, photos, charts in chats... AI automatically recognizes image content and analyzes with text together. Product screenshots, data charts, requirement docs - all accurately understood!'
    },
    {
      icon: 'backup',
      title: 'Chat History Never Lost',
      description: 'Lost WeChat history after phone change? Expired images won\'t display? Forward to AImyChats - text+images permanently saved in cloud, review anytime.'
    },
    {
      icon: 'search',
      title: 'Instant History Search',
      description: 'Remember chatting but can\'t find it? Powerful AI searches image content, text, and scenario categories, instantly locates any historical conversation.'
    }
  ]
}

const useCasesData = {
  title: 'Who Needs Chat History AI Assistant?',
  subtitle: 'If you have important conversations to save and manage, AImyChats is your best choice',
  useCases: [
    {
      icon: 'personal',
      title: 'Professionals - Work Chats Never Lost',
      description: 'Client requirements, boss instructions, colleague exchanges... Save important work conversations easily. AI extracts key info and action items.',
      benefits: [
        'Client communications preserved',
        'Work instructions reviewable anytime',
        'AI extracts action items',
        'Important decisions never missed'
      ]
    },
    {
      icon: 'business',
      title: 'Entrepreneurs - Business Dealings Clear',
      description: 'Partner communications, business negotiations, project details - all key conversations permanently saved for quick reference when needed.',
      benefits: [
        'Business negotiation records saved',
        'Contract details readily accessible',
        'Project communication history traceable',
        'AI extracts key terms'
      ]
    },
    {
      icon: 'team',
      title: 'Team Managers - Collaboration Clear',
      description: 'Team discussions, task assignments, progress feedback - AI auto-organizes key information for more efficient team collaboration.',
      benefits: [
        'Team discussions auto-archived',
        'Task assignments clearly queryable',
        'Progress updates tracked in real-time',
        'AI generates meeting minutes'
      ]
    },
    {
      icon: 'support',
      title: 'Freelancers - Client Needs Precisely Recorded',
      description: 'Client requirements, project details, revision feedback - all communication records permanently saved to avoid omissions and disputes.',
      benefits: [
        'Client requirements fully recorded',
        'Project details reviewable anytime',
        'Revision history clearly queryable',
        'AI organizes key requirements'
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
      name: 'Free',
      description: 'Free trial experience',
      price: '$0',
      period: '/month',
      buttonText: 'Get Started',
      buttonLink: 'https://app.aimychats.com/register',
      features: [
        '5 emails per month',
        'Up to 5 attachments per email',
        '1 GB storage',
        '30-day retention',
        'AI Image Recognition',
        'Multi-Scenario Analysis',
        'AI smart summaries',
        'Basic search'
      ],
      additionalInfo: 'Perfect for trying out'
    },
    {
      name: 'Starter',
      description: 'Entry-level experience',
      price: '$4.99',
      period: '/month',
      buttonText: 'Subscribe Now',
      buttonLink: 'https://app.aimychats.com/register',
      features: [
        '100 emails per month',
        'Up to 10 attachments per email',
        '5 GB storage',
        '1-year retention',
        'AI Image Recognition',
        'Multi-Scenario Analysis',
        'AI smart summaries',
        'Advanced search'
      ],
      additionalInfo: '~$0.05/email, stable user retention'
    },
    {
      name: 'Standard',
      description: 'Main tier, best value',
      price: '$9.90',
      period: '/month',
      buttonText: 'Subscribe Now',
      buttonLink: 'https://app.aimychats.com/register',
      featured: true,
      features: [
        '500 emails per month',
        'Up to 15 attachments per email',
        '10 GB storage',
        '3-year retention',
        'AI Image Recognition',
        'Multi-Scenario Analysis',
        'AI smart summaries',
        'Advanced search'
      ],
      additionalInfo: '~$0.02/email, highest value'
    },
    {
      name: 'Pro',
      description: 'Core profit tier',
      price: '$29.99',
      period: '/month',
      buttonText: 'Subscribe Now',
      buttonLink: 'https://app.aimychats.com/register',
      features: [
        '2000 emails per month',
        'Up to 30 attachments per email',
        '20 GB storage',
        'Permanent retention',
        'AI Image Recognition',
        'Multi-Scenario Analysis',
        'AI smart summaries',
        'Advanced search',
        'Dedicated support'
      ],
      additionalInfo: '~$0.015/email, high volume processing'
    }
  ],
  note: 'All paid plans can be upgraded or downgraded anytime. Monthly billing, cancel anytime.',
  comparisonHint: '👇 See detailed feature comparison below'
}

const comparisonData = {
  title: 'Detailed Plan Comparison',
  subtitle: 'Compare all features at a glance',
  featureColumnTitle: 'Features',
  swipeHint: '← Swipe to view more →',
  plans: [
    { name: 'Free', price: '$0/mo', featured: false },
    { name: 'Starter', price: '$4.99/mo', featured: false },
    { name: 'Standard', price: '$9.90/mo', featured: true },
    { name: 'Pro', price: '$29.99/mo', featured: false }
  ],
  comparisonFeatures: [
    { name: 'Monthly email quota', values: ['5 emails', '100 emails', '500 emails', '2000 emails'], highlighted: true },
    { name: 'Attachments per email', values: ['5', '10', '15', '30'], highlighted: true },
    { name: 'Storage capacity', values: ['1 GB', '5 GB', '10 GB', '20 GB'], highlighted: true },
    { name: 'Data retention', values: ['30 days', '1 year', '3 years', 'Permanent'], highlighted: true },
    { name: 'AI Image Recognition', values: [true, true, true, true], highlighted: true },
    { name: 'Multi-Scenario Analysis', values: [true, true, true, true], highlighted: true },
    { name: 'AI smart summaries', values: [true, true, true, true], highlighted: false },
    { name: 'Smart search', values: ['Basic', 'Advanced', 'Advanced', 'Advanced'], highlighted: false },
    { name: 'Dedicated support', values: [false, false, false, true], highlighted: false }
  ]
}

const footerData = {
  companyName: 'AImyChats',
  companyDescription: 'AI Chat History Assistant - Never lose important conversations, review anytime.',
  copyright: '',
  productTitle: 'Product',
  resourceTitle: 'Resources',
  companyTitle: 'Company',
  socialLinks: [
    { icon: 'github', url: 'https://github.com/devify', name: 'GitHub' }
  ],
  productLinks: [
    { text: 'Features', url: '/en/#features' },
    { text: 'Pricing', url: '/en/#pricing' },
    { text: 'Changelog', url: '#' }
  ],
  resourceLinks: [
    { text: 'FAQ', url: '/en/faq' },
    { text: 'Quick Guide', url: '/en/guide/getting-started' },
    { text: 'API Docs', url: '/api/authentication' }
  ],
  companyLinks: [
    { text: 'About', url: '#' },
    { text: 'Contact', url: '#' }
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
<PricingComparison v-bind="comparisonData" />
<Footer v-bind="footerData" />
