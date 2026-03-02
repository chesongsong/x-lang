<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap; padding: 4px 0">
    <ATag v-for="(item, i) in items" :key="i" :color="tagColor(item.type)">
      {{ item.text }}
    </ATag>
  </div>
</template>

<script setup lang="ts">
import { Tag as ATag } from "ant-design-vue";

defineProps<{
  items: readonly { text: string; type: string }[];
}>();

function tagColor(t: string): string | undefined {
  if (!t) return undefined;
  const map: Record<string, string> = {
    success: "green",
    warning: "orange",
    danger: "red",
    info: "blue",
    primary: "blue",
  };
  return map[t] ?? "default";
}
</script>
