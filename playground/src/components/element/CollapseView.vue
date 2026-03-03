<template>
  <div style="padding: 8px 0">
    <ElCollapse v-model="activeNames">
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
import { ref, watch } from "vue";
import { ElCollapse, ElCollapseItem } from "element-plus";
import "element-plus/es/components/collapse/style/css";

const props = defineProps<{
  items: readonly { title: string; content: string }[];
  activeKeys: readonly string[];
}>();

const activeNames = ref<string[]>([...props.activeKeys]);
watch(
  () => props.activeKeys,
  (next) => {
    activeNames.value = [...next];
  },
);
</script>
