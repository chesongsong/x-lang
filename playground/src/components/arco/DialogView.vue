<template>
  <div style="margin: 8px 0">
    <div style="margin-bottom: 8px">
      <AButton type="primary" @click="visible = true">{{ triggerText }}</AButton>
    </div>
    <AModal
      :visible="visible"
      :title="title"
      :width="width"
      :footer="true"
      :closable="true"
      :mask-closable="true"
      :unmount-on-close="false"
      @cancel="visible = false"
      @ok="visible = false"
    >
      <div style="line-height: 1.6; white-space: pre-wrap">{{ content }}</div>
    </AModal>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Modal as AModal, Button as AButton } from "@arco-design/web-vue";
import "@arco-design/web-vue/es/modal/style/css.js";
import "@arco-design/web-vue/es/button/style/css.js";

const props = defineProps<{
  title: string;
  content: string;
  open: boolean;
  width: string | number;
  triggerText: string;
}>();

const visible = ref(props.open);
watch(
  () => props.open,
  (next) => {
    visible.value = next;
  },
);
</script>
