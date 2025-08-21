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