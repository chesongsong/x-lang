<template>
  <div style="padding: 8px 0">
    <AStatistic
      :title="title"
      :value="value"
      :prefix="prefix || undefined"
      :suffix="suffix || undefined"
    />
  </div>
</template>

<script setup lang="ts">
import { Statistic as AStatistic } from "ant-design-vue";

defineProps<{
  title: string;
  value: number;
  prefix: string;
  suffix: string;
}>();
</script>
