// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import SwaggerUI from './SwaggerUI.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('SwaggerUI', SwaggerUI)
  }
}