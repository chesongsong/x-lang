<template>
  <div style="padding: 8px 0">
    <ElCollapse :model-value="activeNames">
      <ElCollapseItem
        v-for="(item, i) in items"
        :key="i"
        :name="String(i)"
        :title="item.title"
      >
        <div style="line-height: 1.6">{{ item.content }}</div>
      </ElCollapseItem>
    </ElCollapse>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ElCollapse, ElCollapseItem } from "element-plus";
import "element-plus/es/components/collapse/style/css";

const props = defineProps<{
  items: readonly { title: string; content: string }[];
  activeKeys: readonly string[];
}>();

const activeNames = computed(() => props.activeKeys);
</script>
