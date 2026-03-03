<template>
  <div style="padding: 8px 0">
    <ACollapse :activeKey="activeKeys">
      <ACollapsePanel v-for="(item, i) in items" :key="String(i)" :header="item.title">
        <div style="line-height: 1.6">{{ item.content }}</div>
      </ACollapsePanel>
    </ACollapse>
  </div>
</template>

<script setup lang="ts">
import { Collapse as ACollapse } from "ant-design-vue";

const ACollapsePanel = ACollapse.Panel;

defineProps<{
  items: readonly { title: string; content: string }[];
  activeKeys: readonly string[];
}>();
</script>
