import { defineConfig } from 'vitepress'
import { resolve } from 'path'
import fs from 'fs'

// 自动注册 .vitepress/components 目录下的所有组件
const componentsDir = resolve(__dirname, './components')
const components = {}

if (fs.existsSync(componentsDir)) {
  const files = fs.readdirSync(componentsDir)
  for (const file of files) {
    if (file.endsWith('.vue')) {
      const name = file.replace('.vue', '')
      components[name] = resolve(componentsDir, file)
    }
  }
}

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
            { text: '模组失效问题', link: '/guide/mod-issues' },
            { text: 'NAT VPS 部署', link: '/guide/nat-vps' },
            { text: 'Docker 部署', link: '/guide/docker' },
            { text: '群晖系统部署', link: '/guide/synology-deployment' },
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
  },
  vite: {
    plugins: [
      {
        name: 'auto-register-components',
        async config() {
          return {
            resolve: {
              alias: {
                ...Object.fromEntries(
                  Object.entries(components).map(([name, path]) => [name, path])
                )
              }
            }
          }
        }
      }
    ]
  }
})