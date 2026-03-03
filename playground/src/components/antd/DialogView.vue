<template>
  <div style="margin: 8px 0">
    <div style="margin-bottom: 8px">
      <AButton type="primary" @click="visible = true">{{ triggerText }}</AButton>
    </div>
    <AModal
      :open="visible"
      :title="title"
      :width="width"
      :footer="undefined"
      :closable="true"
      :maskClosable="true"
      :getContainer="false"
      @cancel="visible = false"
    >
      <div style="line-height: 1.6; white-space: pre-wrap">{{ content }}</div>
    </AModal>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Modal as AModal, Button as AButton } from "ant-design-vue";

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
