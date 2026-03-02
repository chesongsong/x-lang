<template>
  <div style="padding: 6px 0">
    <ARate
      :value="value"
      :count="max"
      :disabled="disabled"
      :allow-half="allowHalf"
    />
  </div>
</template>

<script setup lang="ts">
import { Rate as ARate } from "ant-design-vue";

defineProps<{
  value: number;
  max: number;
  disabled: boolean;
  allowHalf: boolean;
}>();
</script>
