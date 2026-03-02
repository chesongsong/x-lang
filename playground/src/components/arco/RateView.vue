<template>
  <div style="padding: 6px 0">
    <ARate
      :model-value="value"
      :count="max"
      :disabled="disabled"
      :allow-half="allowHalf"
    />
  </div>
</template>

<script setup lang="ts">
import { Rate as ARate } from "@arco-design/web-vue";
import "@arco-design/web-vue/es/rate/style/css.js";

defineProps<{
  value: number;
  max: number;
  disabled: boolean;
  allowHalf: boolean;
}>();
</script>
