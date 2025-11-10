import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'AImyChats',
  description: 'AI-Powered Conversation Management Platform',

  locales: {
    root: {
      label: '中文',
      lang: 'zh-CN',
      title: 'AImyChats',
      description: '微信聊天备份 + AI 智能助手',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh/' },
          { text: '功能', link: '/zh/#features' },
          { text: '价格', link: '/zh/#pricing' },
          { text: '帮助', link: '/zh/faq' }
        ],
        sidebar: {
          '/zh/guide/': [
            {
              text: '指南',
              items: [
                { text: '微信备份', link: '/zh/guide/wechat-backup' },
                { text: '功能说明', link: '/zh/guide/features' }
              ]
            }
          ],
          '/api/': [
            {
              text: 'API 文档',
              items: [
                { text: '认证', link: '/api/authentication' },
                { text: 'Webhooks', link: '/api/webhooks' },
                { text: 'API 参考', link: '/api/reference' }
              ]
            }
          ]
        },
        footer: {
          message: '',
          copyright: ''
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'AImyChats',
      description: 'AI-Powered Conversation Hub',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Features', link: '/en/#features' },
          { text: 'Pricing', link: '/en/#pricing' },
          { text: 'Help', link: '/en/faq' }
        ],
        sidebar: {
          '/en/guide/': [
            {
              text: 'Guide',
              items: [
                { text: 'Getting Started', link: '/en/guide/getting-started' },
                { text: 'Integrations', link: '/en/guide/integrations' }
              ]
            }
          ],
          '/api/': [
            {
              text: 'API Documentation',
              items: [
                { text: 'Authentication', link: '/api/authentication' },
                { text: 'Webhooks', link: '/api/webhooks' },
                { text: 'API Reference', link: '/api/reference' }
              ]
            }
          ]
        },
        footer: {
          message: '',
          copyright: ''
        }
      }
    }
  },

  themeConfig: {
    logo: '/android-chrome-192x192.png',
    siteTitle: 'AImyChats',
    socialLinks: []
  },

  appearance: false,

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }]
  ],

  vite: {
    resolve: {
      alias: {
        '@': '/docs/.vitepress/theme'
      }
    }
  }
})
