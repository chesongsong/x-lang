<template>
  <div style="padding: 4px 0">
    <ADescriptions :title="title || undefined" :column="column" :border="border">
      <ADescriptionsItem v-for="(item, i) in items" :key="i" :label="item.label">
        {{ item.value }}
      </ADescriptionsItem>
    </ADescriptions>
  </div>
</template>

<script setup lang="ts">
import { Descriptions as ADescriptions, DescriptionsItem as ADescriptionsItem } from "@arco-design/web-vue";
import "@arco-design/web-vue/es/descriptions/style/css.js";

defineProps<{
  title: string;
  items: readonly { label: string; value: string }[];
  column: number;
  border: boolean;
}>();
</script>
