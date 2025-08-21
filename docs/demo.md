# Vue Demo

这个页面展示了如何在 VitePress Markdown 文件中使用 Vue。

## 计数器组件示例

以下是一个简单的计数器组件：

<script setup>
import Counter from './.vitepress/components/Counter.vue'
</script>

<Counter />

## 代码

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <div style="padding: 20px; border: 1px solid #ddd; border-radius: 4px;">
    <p>计数器: {{ count }}</p>
    <button @click="increment" style="padding: 5px 10px;">增加</button>
  </div>
</template>
```

要使用这个组件，你需要将上述代码保存为一个 `.vue` 文件（例如 `Counter.vue`），并放在 `.vitepress/components` 目录下。然后在你的 Markdown 文件中通过以下方式导入并使用：

```md
<script setup>
import Counter from './.vitepress/components/Counter.vue'
</script>

<Counter />
```

注意：在实际使用中，你需要确保组件文件的路径是正确的。