import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'AImyChats',
  description: 'AI-Powered Conversation Management Platform',

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      title: 'AImyChats',
      description: 'AI-Powered Conversation Hub',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Features', link: '/#features' },
          { text: 'Pricing', link: '/#pricing' },
          { text: 'Self-Hosting', link: '/en/self-hosting/installation' },
          { text: 'User Guide', link: '/en/self-hosting/user-guide' },
          { text: 'GitHub', link: 'https://github.com/cloud2ai/devify' }
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
          '/en/self-hosting/': [
            {
              text: 'Self-Hosting',
              items: [
                { text: 'Installation', link: '/en/self-hosting/installation' },
                { text: 'User Guide', link: '/en/self-hosting/user-guide' }
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
    zh: {
      label: '中文',
      lang: 'zh-CN',
      title: 'AImyChats',
      description: '微信聊天备份 + AI 智能助手',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh/' },
          { text: '功能', link: '/zh/#features' },
          { text: '价格', link: '/zh/#pricing' },
          { text: '私有化部署', link: '/zh/self-hosting/installation' },
          { text: '使用帮助', link: '/zh/self-hosting/user-guide' },
          { text: 'GitHub', link: 'https://github.com/cloud2ai/devify' }
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
          '/zh/self-hosting/': [
            {
              text: '私有化部署',
              items: [
                { text: '安装指南', link: '/zh/self-hosting/installation' },
                { text: '使用手册', link: '/zh/self-hosting/user-guide' }
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
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-TJWJHQH4M9' }],
    ['script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-TJWJHQH4M9');
    `]
  ],

  vite: {
    server: {
      host: '0.0.0.0',
      strictPort: false,
    },
    resolve: {
      alias: {
        '@': '/docs/.vitepress/theme'
      }
    }
  }
})
