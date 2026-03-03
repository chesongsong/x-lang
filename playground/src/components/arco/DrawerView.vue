<template>
  <div style="margin: 8px 0">
    <div style="margin-bottom: 8px">
      <AButton type="primary" @click="visible = true">打开{{ title }}</AButton>
    </div>
    <ADrawer
      :visible="visible"
      :title="title"
      :placement="placement"
      :width="size"
      :mask-closable="true"
      :closable="true"
      :footer="false"
      :unmount-on-close="false"
      @cancel="visible = false"
    >
      <div style="line-height: 1.6">{{ content }}</div>
    </ADrawer>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Drawer as ADrawer, Button as AButton } from "@arco-design/web-vue";
import "@arco-design/web-vue/es/drawer/style/css.js";
import "@arco-design/web-vue/es/button/style/css.js";

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
