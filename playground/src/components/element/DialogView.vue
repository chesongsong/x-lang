<template>
  <div style="margin: 8px 0">
    <div style="margin-bottom: 8px">
      <ElButton type="primary" @click="visible = true">{{ triggerText }}</ElButton>
    </div>
    <ElDialog
      :model-value="visible"
      :title="title"
      :width="width"
      :append-to-body="false"
      :show-close="true"
      :close-on-click-modal="true"
      :close-on-press-escape="false"
      @close="visible = false"
    >
      <div style="line-height: 1.6; white-space: pre-wrap">{{ content }}</div>
      <template #footer>
        <div style="display: flex; justify-content: flex-end; gap: 8px">
          <ElButton @click="visible = false">取消</ElButton>
          <ElButton type="primary" @click="visible = false">确认</ElButton>
        </div>
      </template>
    </ElDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { ElDialog, ElButton } from "element-plus";
import "element-plus/es/components/dialog/style/css";
import "element-plus/es/components/button/style/css";

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
