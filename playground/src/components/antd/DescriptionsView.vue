<template>
  <div style="padding: 4px 0">
    <ADescriptions :title="title || undefined" :column="column" :bordered="border">
      <ADescriptions.Item v-for="(item, i) in items" :key="i" :label="item.label">
        {{ item.value }}
      </ADescriptions.Item>
    </ADescriptions>
  </div>
</template>

<script setup lang="ts">
import { Descriptions as ADescriptions } from "ant-design-vue";

defineProps<{
  title: string;
  items: readonly { label: string; value: string }[];
  column: number;
  border: boolean;
}>();
</script>
