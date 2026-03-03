<template>
  <div style="padding: 8px 0">
    <ACollapse :default-active-key="activeKeys">
      <ACollapseItem v-for="(item, i) in items" :key="String(i)" :header="item.title">
        <div style="line-height: 1.6">{{ item.content }}</div>
      </ACollapseItem>
    </ACollapse>
  </div>
</template>

<script setup lang="ts">
import { Collapse as ACollapse, CollapseItem as ACollapseItem } from "@arco-design/web-vue";
import "@arco-design/web-vue/es/collapse/style/css.js";

defineProps<{
  items: readonly { title: string; content: string }[];
  activeKeys: readonly string[];
}>();
</script>
