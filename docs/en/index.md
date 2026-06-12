---
layout: page
---

<script setup>
import Hero from '../.vitepress/theme/components/Hero.vue'
import Features from '../.vitepress/theme/components/Features.vue'
import HowItWorks from '../.vitepress/theme/components/HowItWorks.vue'
import UseCases from '../.vitepress/theme/components/UseCases.vue'
import SocialProof from '../.vitepress/theme/components/SocialProof.vue'
import OpenSourceBanner from '../.vitepress/theme/components/OpenSourceBanner.vue'
import Pricing from '../.vitepress/theme/components/Pricing.vue'
import Footer from '../.vitepress/theme/components/Footer.vue'
import { getHomeEnContent } from '../.vitepress/theme/data/home-en.js'

const { heroData, featuresData, howItWorksData, useCasesData, pricingData, footerData } = getHomeEnContent()
</script>

<Hero v-bind="heroData" />
<SocialProof :items="[
  { icon: '📥', value: '4 Platforms', label: 'Email · WhatsApp · WeChat · SMTP' },
  { icon: '🤖', value: 'AI Powered', label: 'Text · Images · Docs · Screenshots' },
  { icon: '♾️', value: 'Forever', label: 'Permanent storage on Pro plan' },
  { icon: '🔓', value: 'Open Source', label: 'Fully transparent, self-hostable' },
]" />
<Features v-bind="featuresData" />
<HowItWorks v-bind="howItWorksData" />
<UseCases v-bind="useCasesData" />
<Pricing v-bind="pricingData" />
<OpenSourceBanner github-url="https://github.com/cloud2ai/devify" />
<Footer v-bind="footerData" />
