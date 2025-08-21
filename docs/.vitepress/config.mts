import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'DST Admin Go',
  description: '饥荒联机版服务器管理面板',
  base: '/dst-admin-go-docs/',
  ignoreDeadLinks: true,
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/getting-started' },
      { text: 'API', link: '/api/' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '配置说明', link: '/guide/configuration' },
            { text: '部署指南', link: '/guide/deployment' },
            { text: 'NAT VPS 部署', link: '/guide/nat-vps' },
            { text: 'Docker 部署', link: '/guide/docker' },
            { text: 'Frp转发饥荒中转站', link: '/guide/frp' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API',
          items: [
            { text: '管理面板 API', link: '/api/' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/carrot-hu23/dst-admin-go' }
    ]
  }
})