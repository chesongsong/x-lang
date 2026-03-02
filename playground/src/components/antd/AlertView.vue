<template>
  <div style="margin: 4px 0">
    <AAlert
      :message="title"
      :description="description || undefined"
      :type="alertType"
      :closable="closable"
      show-icon
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Alert as AAlert } from "ant-design-vue";

const props = defineProps<{
  title: string;
  description: string;
  type: string;
  closable: boolean;
}>();

const alertType = computed(
  () => props.type as "success" | "warning" | "info" | "error",
);
</script>
