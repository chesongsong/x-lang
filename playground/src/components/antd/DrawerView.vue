<template>
  <div style="margin: 8px 0">
    <div style="margin-bottom: 8px">
      <AButton type="primary" @click="visible = true">打开{{ title }}</AButton>
    </div>
    <ADrawer
      :open="visible"
      :title="title"
      :placement="placement"
      :width="size"
      :closable="true"
      :maskClosable="true"
      :getContainer="false"
      @close="visible = false"
    >
      <div style="line-height: 1.6">{{ content }}</div>
    </ADrawer>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Drawer as ADrawer, Button as AButton } from "ant-design-vue";

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
</script>
