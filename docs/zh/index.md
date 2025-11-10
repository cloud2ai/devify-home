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
  badge: '图片识别 · 多场景智能分析',
  title: '聊天记录 AI 智能助手',
  subtitle: '微信、邮件、WhatsApp 聊天记录永久保存，AI 识别图片内容 + 多场景智能分析。工作、客服、产品...不同场景精准理解！',
  primaryButtonText: '立即开始',
  primaryButtonLink: 'https://app.aimychats.com/register',
  secondaryButtonText: '查看功能',
  secondaryButtonLink: '/zh/#features',
  imageSrc: '/images/dashboard-screenshot.png',
  imageAlt: 'AImyChats 产品截图',
  features: [
    'AI 图片识别',
    '多场景智能分析',
    '永久云端保存',
    '秒速智能搜索'
  ]
}

const howItWorksData = {
  title: '简单三步，开启智能聊天记录管理',
  subtitle: '无需复杂配置，几分钟即可上手',
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
  title: '解决聊天记录管理痛点',
  subtitle: '图片识别 + 多场景智能分析，比普通摘要更准确更智能',
  features: [
    {
      icon: 'ai',
      title: '多场景智能分析',
      description: '工作沟通、客户咨询、产品讨论...选择对话场景，AI 针对性分析。客服场景提取问题要点，产品场景识别需求细节，更智能更精准！'
    },
    {
      icon: 'image',
      title: 'AI 图片识别 + 图文结合',
      description: '聊天中的截图、照片、图表...AI 自动识别图片内容，结合文字一起分析。产品截图、数据图表、需求文档都能准确理解！'
    },
    {
      icon: 'backup',
      title: '聊天记录永不丢失',
      description: '微信聊天记录换手机就没了？图片过期显示不了？一键转发到 AImyChats，文字+图片云端永久保存，随时回顾。'
    },
    {
      icon: 'search',
      title: '秒速搜索历史记录',
      description: '记得聊过但找不到？强大的 AI 搜索图片内容和文字，秒速定位任何历史对话，关键词、图片内容、场景分类随意查。'
    }
  ]
}

const useCasesData = {
  title: '谁需要聊天记录 AI 助手？',
  subtitle: '只要您有重要对话需要保存和管理，AImyChats 就是您的最佳选择',
  useCases: [
    {
      icon: 'personal',
      title: '职场人士 - 工作对话不再丢失',
      description: '客户需求、领导指示、同事交流...重要工作对话随手保存，AI 帮您提炼关键信息和待办事项。',
      benefits: [
        '客户沟通永久留存',
        '工作指示随时回看',
        'AI 提取待办事项',
        '重要决策不遗漏'
      ]
    },
    {
      icon: 'business',
      title: '创业者 - 商务往来清晰可查',
      description: '合作伙伴沟通、商务谈判、项目细节，所有关键对话永久保存，需要时快速查阅。',
      benefits: [
        '商务谈判记录保存',
        '合同细节随时查阅',
        '项目沟通历史追溯',
        'AI 提炼关键条款'
      ]
    },
    {
      icon: 'team',
      title: '团队管理者 - 协作记录一目了然',
      description: '团队讨论、任务分配、进度反馈，AI 自动整理关键信息，团队协作更高效。',
      benefits: [
        '团队讨论自动归档',
        '任务分配清晰可查',
        '进度更新实时追踪',
        'AI 生成会议纪要'
      ]
    },
    {
      icon: 'support',
      title: '自由职业者 - 客户需求精准记录',
      description: '客户需求、项目细节、修改意见，所有沟通记录永久保存，避免遗漏和纠纷。',
      benefits: [
        '客户需求完整记录',
        '项目细节随时回看',
        '修改历史清晰可查',
        'AI 整理关键要求'
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
      name: 'Free',
      description: '免费体验入门',
      price: '$0',
      period: '/月',
      buttonText: '开始使用',
      buttonLink: 'https://app.aimychats.com/register',
      features: [
        '每月 5 封邮件',
        '每封最多 5 个附件',
        '1 GB 存储空间',
        '30 天数据保留',
        'AI 图片识别',
        '多场景智能分析',
        'AI 智能摘要',
        '基础搜索'
      ],
      additionalInfo: '适合尝试产品功能'
    },
    {
      name: 'Starter',
      description: '入门档，低门槛体验',
      price: '$4.99',
      period: '/月',
      buttonText: '立即订阅',
      buttonLink: 'https://app.aimychats.com/register',
      features: [
        '每月 100 封邮件',
        '每封最多 10 个附件',
        '5 GB 存储空间',
        '1 年数据保留',
        'AI 图片识别',
        '多场景智能分析',
        'AI 智能摘要',
        '高级搜索'
      ],
      additionalInfo: '约 $0.05/封，稳定留存新用户'
    },
    {
      name: 'Standard',
      description: '中档主力档',
      price: '$9.90',
      period: '/月',
      buttonText: '立即订阅',
      buttonLink: 'https://app.aimychats.com/register',
      featured: true,
      features: [
        '每月 500 封邮件',
        '每封最多 15 个附件',
        '10 GB 存储空间',
        '3 年数据保留',
        'AI 图片识别',
        '多场景智能分析',
        'AI 智能摘要',
        '高级搜索'
      ],
      additionalInfo: '约 $0.02/封，性价比最高'
    },
    {
      name: 'Pro',
      description: '核心盈利档',
      price: '$29.99',
      period: '/月',
      buttonText: '立即订阅',
      buttonLink: 'https://app.aimychats.com/register',
      features: [
        '每月 2000 封邮件',
        '每封最多 30 个附件',
        '20 GB 存储空间',
        '永久数据保留',
        'AI 图片识别',
        '多场景智能分析',
        'AI 智能摘要',
        '高级搜索',
        '专属技术支持'
      ],
      additionalInfo: '约 $0.015/封，大量处理专用'
    }
  ],
  note: '所有付费方案均可随时升级或降级，按月计费，随时可取消。',
  comparisonHint: '👇 查看下方详细功能对比表'
}

const comparisonData = {
  title: '详细功能对比',
  subtitle: '一目了然，选择最适合您的方案',
  featureColumnTitle: '功能特性',
  swipeHint: '← 左右滑动查看更多 →',
  plans: [
    { name: 'Free', price: '$0/月', featured: false },
    { name: 'Starter', price: '$4.99/月', featured: false },
    { name: 'Standard', price: '$9.90/月', featured: true },
    { name: 'Pro', price: '$29.99/月', featured: false }
  ],
  comparisonFeatures: [
    { name: '每月邮件处理量', values: ['5 封', '100 封', '500 封', '2000 封'], highlighted: true },
    { name: '每封附件上限', values: ['5 个', '10 个', '15 个', '30 个'], highlighted: true },
    { name: '存储空间', values: ['1 GB', '5 GB', '10 GB', '20 GB'], highlighted: true },
    { name: '数据保留期', values: ['30 天', '1 年', '3 年', '永久'], highlighted: true },
    { name: 'AI 图片识别', values: [true, true, true, true], highlighted: true },
    { name: '多场景智能分析', values: [true, true, true, true], highlighted: true },
    { name: 'AI 智能摘要', values: [true, true, true, true], highlighted: false },
    { name: '智能搜索', values: ['基础', '高级', '高级', '高级'], highlighted: false },
    { name: '专属技术支持', values: [false, false, false, true], highlighted: false }
  ]
}

const footerData = {
  companyName: 'AImyChats',
  companyDescription: '聊天记录 AI 智能助手，让重要对话永不丢失，随时回顾。',
  copyright: '',
  productTitle: '产品',
  resourceTitle: '资源',
  companyTitle: '公司',
  socialLinks: [
    { icon: 'github', url: 'https://github.com/devify', name: 'GitHub' }
  ],
  productLinks: [
    { text: '功能特性', url: '/zh/#features' },
    { text: '价格方案', url: '/zh/#pricing' },
    { text: '更新日志', url: '#' }
  ],
  resourceLinks: [
    { text: '常见问题', url: '/zh/faq' },
    { text: '使用说明', url: '/zh/guide/wechat-backup' },
    { text: 'API 文档', url: '/api/authentication' }
  ],
  companyLinks: [
    { text: '关于我们', url: '#' },
    { text: '联系我们', url: '#' }
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
<PricingComparison v-bind="comparisonData" />
<Footer v-bind="footerData" />
