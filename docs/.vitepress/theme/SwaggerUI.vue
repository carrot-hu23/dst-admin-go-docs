<template>
  <div id="swagger-ui"></div>
</template>

<script>
import { onMounted, onUnmounted } from 'vue'
import SwaggerUI from 'swagger-ui'
import 'swagger-ui/dist/swagger-ui.css'

export default {
  name: 'SwaggerUI',
  props: {
    url: {
      type: String,
      required: true
    }
  },
  setup(props) {
    let swaggerInstance;

    const initSwagger = () => {
      // 销毁之前的实例（如果存在）
      if (swaggerInstance) {
        // Swagger UI 实例可能没有 dispose 方法，使用旧的清理方式
        const container = document.getElementById('swagger-ui');
        if (container) {
          container.innerHTML = ''; // 清空容器
        }
      }

      // 获取当前 VitePress 主题
      const isDark = document.documentElement.classList.contains('dark');
      
      swaggerInstance = SwaggerUI({
        url: props.url,
        dom_id: '#swagger-ui',
        deepLinking: false,
        presets: [
          SwaggerUI.presets.apis,
          SwaggerUI.presets.validation
        ],
        plugins: [
          SwaggerUI.plugins.DownloadUrl
        ],
        layout: 'BaseLayout',
        // 根据 VitePress 主题设置 Swagger UI 主题
        theme: isDark ? 'dark' : 'light'
      });
    };

    // 监听主题变化
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          initSwagger();
        }
      });
    });

    onMounted(() => {
      initSwagger();
      // 开始监听主题变化
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      });
    });

    onUnmounted(() => {
      // 组件卸载时停止监听并清理实例
      observer.disconnect();
      if (swaggerInstance) {
        // 尝试调用 dispose（如果存在），否则回退到清空容器
        if (typeof swaggerInstance.dispose === 'function') {
          swaggerInstance.dispose();
        } else {
          const container = document.getElementById('swagger-ui');
          if (container) {
            container.innerHTML = '';
          }
        }
      }
    });
  }
}
</script>

<style>
#swagger-ui {
  margin-top: 20px;
}

/* 认证说明框样式 */
.auth-note {
  background-color: #e8f4fd;
  border-left: 4px solid #007acc;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 4px;
  color: #000;
}

html.dark .auth-note {
  background-color: #1e293b;
  border-left: 4px solid #3b82f6;
  color: #f1f5f9;
}

/* 重置 Swagger UI 的默认样式以匹配 VitePress */
#swagger-ui .swagger-ui {
  font-family: var(--vp-font-family-base);
}

/* Info section */
#swagger-ui .swagger-ui .info {
  margin-bottom: 30px;
}

#swagger-ui .swagger-ui .info .title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 10px;
}

#swagger-ui .swagger-ui .info .description {
  font-size: 1rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

#swagger-ui .swagger-ui .info a {
  color: var(--vp-c-brand);
  font-weight: 500;
  text-decoration: none;
}

#swagger-ui .swagger-ui .info a:hover {
  text-decoration: underline;
}

/* Operation blocks */
#swagger-ui .swagger-ui .opblock {
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: none;
  margin-bottom: 15px;
}

#swagger-ui .swagger-ui .opblock-tag {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-brand);
  padding: 15px 0;
  margin: 20px 0 10px 0;
}

#swagger-ui .swagger-ui .opblock-tag:hover {
  background-color: transparent;
}

#swagger-ui .swagger-ui .opblock-summary {
  border-bottom: none;
  border-radius: 8px 8px 0 0;
  padding: 12px 15px;
}

#swagger-ui .swagger-ui .opblock-summary-method {
  font-size: 0.875rem;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
  margin-right: 10px;
}

#swagger-ui .swagger-ui .opblock-summary-path {
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

#swagger-ui .swagger-ui .opblock-summary-description {
  font-size: 0.9375rem;
  color: var(--vp-c-text-2);
}

/* Operation details */
#swagger-ui .swagger-ui .opblock-body {
  padding: 0 15px 15px 15px;
}

#swagger-ui .swagger-ui .opblock-body .opblock-description-wrapper,
#swagger-ui .swagger-ui .opblock-body .opblock-external-docs-wrapper {
  margin-bottom: 15px;
}

#swagger-ui .swagger-ui .opblock-body .opblock-description-wrapper p,
#swagger-ui .swagger-ui .opblock-body .opblock-external-docs-wrapper p {
  font-size: 0.9375rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

/* Parameters */
#swagger-ui .swagger-ui .parameters-container h4,
#swagger-ui .swagger-ui .responses-inner h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 15px 0 10px 0;
}

#swagger-ui .swagger-ui .parameters-container .parameter__name {
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

#swagger-ui .swagger-ui .parameters-container .parameter__type {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

/* Responses */
#swagger-ui .swagger-ui .responses-inner .response-col_status {
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

#swagger-ui .swagger-ui .responses-inner .response-col_description {
  font-size: 0.9375rem;
  color: var(--vp-c-text-2);
}

#swagger-ui .swagger-ui .prop-name {
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--vp-c-brand);
}

#swagger-ui .swagger-ui .prop-type {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

#swagger-ui .swagger-ui .prop-format {
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
  font-style: italic;
}

#swagger-ui .swagger-ui .property-row {
  border-bottom: 1px solid var(--vp-c-divider);
  padding: 6px 0;
}

#swagger-ui .swagger-ui .property-row:last-of-type {
  border-bottom: none;
}

/* Markdown content */
#swagger-ui .swagger-ui .markdown p,
#swagger-ui .swagger-ui .markdown li,
#swagger-ui .swagger-ui .markdown pre,
#swagger-ui .swagger-ui .markdown h1,
#swagger-ui .swagger-ui .markdown h2,
#swagger-ui .swagger-ui .markdown h3,
#swagger-ui .swagger-ui .markdown h4,
#swagger-ui .swagger-ui .markdown h5,
#swagger-ui .swagger-ui .markdown h6 {
  font-family: var(--vp-font-family-base);
  color: var(--vp-c-text-1);
  line-height: 1.6;
}

#swagger-ui .swagger-ui .markdown code {
  background-color: var(--vp-c-bg-mute);
  color: var(--vp-c-brand);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 2px 4px;
  font-size: 0.875em;
}

/* Buttons and selects */
#swagger-ui .swagger-ui .btn {
  background-color: var(--vp-c-bg-elv);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 6px 12px;
  cursor: pointer;
  transition: all 0.2s;
}

#swagger-ui .swagger-ui .btn:hover {
  background-color: var(--vp-c-bg-soft);
  border-color: var(--vp-c-gray-3);
}

#swagger-ui .swagger-ui select {
  background-color: var(--vp-c-bg-elv);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.875rem;
  padding: 6px 12px;
}

/* 深色主题下的特殊调整 */
html.dark #swagger-ui .swagger-ui .opblock {
  background-color: var(--vp-c-bg-soft);
  border-color: var(--vp-c-divider);
}

html.dark #swagger-ui .swagger-ui .opblock-summary {
  background-color: var(--vp-c-bg-soft);
}

html.dark #swagger-ui .swagger-ui .model-box {
  background-color: var(--vp-c-bg-soft);
  border-color: var(--vp-c-divider);
}

html.dark #swagger-ui .swagger-ui .btn {
  background-color: var(--vp-c-bg-elv);
  border-color: var(--vp-c-divider);
}

html.dark #swagger-ui .swagger-ui .btn:hover {
  background-color: var(--vp-c-bg-soft);
  border-color: var(--vp-c-gray-3);
}

html.dark #swagger-ui .swagger-ui select {
  background-color: var(--vp-c-bg-elv);
  border-color: var(--vp-c-divider);
}

html.dark #swagger-ui .swagger-ui .markdown code {
  background-color: var(--vp-c-bg-mute);
  border-color: var(--vp-c-divider);
}
</style>