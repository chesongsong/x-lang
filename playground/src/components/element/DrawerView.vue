<template>
  <div style="margin: 8px 0">
    <div style="margin-bottom: 8px">
      <ElButton type="primary" @click="visible = true">打开{{ title }}</ElButton>
    </div>
    <ElDrawer
      :model-value="visible"
      :title="title"
      :direction="direction"
      :size="size"
      :append-to-body="false"
      :modal="true"
      :show-close="true"
      @close="visible = false"
    >
      <div style="line-height: 1.6">{{ content }}</div>
    </ElDrawer>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { ElDrawer, ElButton } from "element-plus";
import "element-plus/es/components/drawer/style/css";
import "element-plus/es/components/button/style/css";

const props = defineProps<{
  title: string;
  content: string;
  placement: string;
  size: string | number;
  open: boolean;
}>();

const visible = ref(props.open);
watch(
  () => props.open,
  (next) => {
    visible.value = next;
  },
);

const direction = computed(() => {
  if (props.placement === "left") return "ltr";
  if (props.placement === "top") return "ttb";
  if (props.placement === "bottom") return "btt";
  return "rtl";
});
</script>
