<template>
  <div style="padding: 8px 0">
    <ACollapse v-model:activeKey="activeNames">
      <ACollapsePanel v-for="(item, i) in items" :key="String(i)" :header="item.title">
        <div style="line-height: 1.6">{{ item.content }}</div>
      </ACollapsePanel>
    </ACollapse>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Collapse as ACollapse } from "ant-design-vue";

const ACollapsePanel = ACollapse.Panel;

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
