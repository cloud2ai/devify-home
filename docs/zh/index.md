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
  badge: '统一管理 · 智能归类 · 秒速查找',
  title: '聊天记录 AI 智能助手',
  points: [
    {
      icon: 'unified',
      text: '微信、邮件、WhatsApp 聊天记录统一管理'
    },
    {
      icon: 'ai',
      text: 'AI 识别图片内容 + 智能分析归类'
    },
    {
      icon: 'search',
      text: '秒速查找历史对话'
    },
    {
      icon: 'process',
      text: '选择 → 转发 → 轻松完成！'
    }
  ],
  primaryButtonText: '立即开始',
  primaryButtonLink: 'https://app.aimychats.com/register',
  secondaryButtonText: '查看功能',
  secondaryButtonLink: '/zh/#features',
  carouselSlides: [
    {
      image: '/images/dashboard-list-zh.png',
      alt: 'AImyChats 产品截图 - 列表页面',
      title: '统一管理所有对话',
      description: '微信、邮件、WhatsApp 聊天记录集中展示，一目了然，智能检索也在这个页面'
    },
    {
      image: '/images/detailed-zh.png',
      alt: 'AImyChats 产品截图 - 详细页面',
      title: '对话智能信息展示',
      description: 'AI智能总结, 原始对话参考含图片,附件信息展示'
    }
  ],
  imageSrc: '/images/dashboard-list-zh.png',
  imageAlt: 'AImyChats 产品截图 - 列表页面',
  features: []
}

const howItWorksData = {
  title: '简单三步开启智能聊天记录管理',
  subtitle: '无需复杂配置，一分钟即可上手',
  steps: [
    {
      icon: 'email',
      title: '转发聊天记录',
      description: '将微信、邮件等任何聊天记录转发到您的专属 AI 邮箱，系统自动接收处理。'
    },
    {
      icon: 'ai',
      title: 'AI 智能分析',
      description: 'AI 自动提取关键信息、生成摘要、识别重点，帮您快速理解对话内容和待办事项。'
    },
    {
      icon: 'dashboard',
      title: '永久保存回顾',
      description: '所有聊天记录永久保存在云端，随时搜索查看。再也不怕记录丢失或过期！'
    }
  ]
}

const featuresData = {
  title: '让聊天记录重新变得清晰',
  subtitle: '跨平台统一管理 图文智能理解',
  features: [
    {
      icon: 'backup',
      title: '所有对话都在一个地方',
      description: '微信、邮件、客服消息……不再散落各处。一键转发自动整理、自动分类。所有沟通终于回到同一个空间。'
    },
    {
      icon: 'search',
      title: '你想找的内容瞬间出现',
      description: '不是普通搜索。是基于文字、图片、联系人、场景的多维检索。快到像是直接跳到你想看的那一句。'
    },
    {
      icon: 'image',
      title: '不仅理解文字也理解图片',
      description: '截图、数据图表、UI设计、表格、照片。AI 全部能看懂。图文结合理解让每次摘要更完整、更可信。'
    },
    {
      icon: 'backup',
      title: '始终保存 永不丢失',
      description: '换手机、清缓存、图片过期不再是问题。你的聊天记录在云端持续保存。随时随地都能打开。'
    }
  ]
}

const useCasesData = {
  title: '谁需要聊天记录 AI 智能助手？',
  subtitle: '只要您有重要对话需要保存和管理，AImyChats 就是您的最佳选择',
  useCases: [
    {
      icon: 'team',
      role: '企业高管',
      subtitle: '大量信息需要快速复盘',
      description: '项目沟通、决策背景、团队讨论，AI 自动整理关键信息，让决策更高效。',
      benefits: [
        '项目沟通自动归档',
        '多场景 AI 分析（工作 / 产品 / 项目）',
        '重要决策永久保存',
        '决策依据快速追溯'
      ]
    },
    {
      icon: 'lawyer',
      role: '律师',
      subtitle: '每条沟通都是关键证据',
      description: '合同、客户咨询、证据信息散落多端，AI 自动结构化整理，快速找到关键内容。',
      benefits: [
        '多平台对话归档',
        '图文结合理解证据',
        '关键条款自动提炼',
        '永久可查历史记录'
      ]
    },
    {
      icon: 'doctor',
      role: '医生',
      subtitle: '碎片化病情沟通不再遗漏',
      description: '患者截图、检测报告、对话说明分散，AI 自动汇总整理，让病情跟踪更精准。',
      benefits: [
        '检验单/处方自动识别',
        '患者沟通永久留存',
        '重点症状自动提炼',
        '快速搜索患者历史'
      ]
    },
    {
      icon: 'finance',
      role: '金融顾问',
      subtitle: '客户沟通责任边界清晰',
      description: '每次沟通都可能影响信任或业绩，AI 帮你记录、整理、追溯历史。',
      benefits: [
        '多端沟通统一管理',
        '需求和承诺清晰记录',
        '图文识别还原客户意图',
        '历史沟通可追溯'
      ]
    },
    {
      icon: 'sales',
      role: '客户经理',
      subtitle: '高频客户沟通轻松管理',
      description: '多平台客户沟通容易遗漏细节，AI 自动整理摘要和待办。',
      benefits: [
        '客户需求自动提炼',
        '图片+文字理解',
        '历史沟通秒速定位',
        '一键生成销售摘要'
      ]
    },
    {
      icon: 'consultant',
      role: '心理咨询师',
      subtitle: '客户历史完整跟踪',
      description: '沟通内容需要结构化保存，便于复盘和长期跟踪。',
      benefits: [
        '多渠道沟通自动保存',
        'AI 自动整理要点与目标',
        '长期跟踪轻松管理',
        '历史记录随时查'
      ]
    }
  ]
}

const pricingData = {
  title: '选择适合您的方案',
  subtitle: '灵活的定价，满足不同需求',
  featuredLabel: '高性价比',
  plans: [
    {
      name: '免费体验',
      description: ' ',
      price: '$0',
      period: '/ 月',
      buttonText: '开始使用',
      buttonLink: 'https://app.aimychats.com/register',
      features: [
        '每月 5 组对话',
        '每组附件图片 5 个',
        '存储 1 GB',
        '数据保留 30 天',
        'AI 图片识别',
        'AI 智能摘要',
        '基础智能分析',
        '基础搜索'
      ],
      additionalInfo: '个人试用，体验核心功能，轻松管理少量重要对话。'
    },
    {
      name: 'Starter',
      description: '个人用户',
      price: '$4.99',
      period: '/ 月',
      buttonText: '立即订阅',
      buttonLink: 'https://app.aimychats.com/register',
      features: [
        '每月 100 组对话',
        '每组附件最多 10 个',
        '存储 5 GB',
        '数据保留 1 年',
        'AI 图片识别',
        'AI 智能摘要',
        '多场景智能分析',
        '高级搜索',
        '元数据自动分析',
        '非图片附件保存与下载',
        '多语言智能分析（英语/中文/西班牙语）'
      ],
      additionalInfo: '日常聊天记录管理，高性价比，支持图片及其他附件内容，随时查阅和回顾。'
    },
    {
      name: 'Standard',
      description: '专业用户',
      price: '$9.90',
      period: '/ 月',
      buttonText: '立即订阅',
      buttonLink: 'https://app.aimychats.com/register',
      featured: true,
      features: [
        '每月 500 组对话',
        '每组附件最多 15 个',
        '存储 10 GB',
        '数据保留 3 年',
        'AI 图片识别',
        'AI 智能摘要',
        '多场景智能分析',
        '高级搜索',
        '元数据自动分析',
        '非图片附件保存与下载',
        '多语言智能分析（英语/中文/西班牙语）',
        'IMAP 邮件自动收取（即将开放）',
        '智能总结信息自动提交内部平台 (JIRA)（即将开放）'
      ],
      additionalInfo: '专业人士及中小企业团队使用，支持更多数据量与长期保存。'
    },
    {
      name: 'Pro',
      description: '企业用户',
      price: '$29.99',
      period: '/ 月',
      buttonText: '立即订阅',
      buttonLink: 'https://app.aimychats.com/register',
      features: [
        '每月 2000 组对话',
        '每组附件最多 25 个',
        '存储 20 GB',
        '永久保存',
        'AI 图片识别',
        'AI 智能摘要',
        '多场景智能分析',
        '高级搜索',
        '元数据自动分析',
        '非图片附件保存与下载',
        '多语言智能分析（英语/中文/西班牙语）',
        'IMAP 邮件自动收取（即将开放）',
        '智能总结信息自动提交内部平台 (JIRA)（即将开放）'
      ],
      additionalInfo: '企业用户大量数据处理及长期保存，图文结合分析，信息管理再也不丢失。'
    }
  ],
  note: '所有付费方案均可随时升级或降级，按月计费，随时可取消。'
}

const footerData = {
  companyName: 'AImyChats',
  companyDescription: '聊天记录 AI 智能助手，让重要对话永不丢失，随时回顾。',
  copyright: '',
  productTitle: '产品',
  resourceTitle: '资源',
  companyTitle: '',
  aboutTitle: '关于',
  socialLinks: [
    { icon: 'github', url: 'https://github.com/cloud2ai/devify', name: 'GitHub' }
  ],
  productLinks: [
    { text: '功能特性', url: '/zh/#features' },
    { text: '价格方案', url: '/zh/#pricing' }
  ],
  resourceLinks: [
    { text: '常见问题', url: '/zh/faq' },
    { text: '使用说明', url: '/zh/guide/wechat-backup' }
  ],
  companyLinks: [],
  aboutLinks: [
    { text: '关于我们', url: '/zh/about' }
  ],
  legalLinks: [
    { text: '隐私政策', url: '/zh/privacy' },
    { text: '服务条款', url: '/zh/terms' }
  ]
}
</script>

<Hero v-bind="heroData" />
<Features v-bind="featuresData" />
<HowItWorks v-bind="howItWorksData" />
<UseCases v-bind="useCasesData" />
<Pricing v-bind="pricingData" />
<Footer v-bind="footerData" />
