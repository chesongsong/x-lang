<template>
  <div style="margin: 4px 0">
    <AAlert
      :title="title"
      :content="description || undefined"
      :type="alertType"
      :closable="closable"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Alert as AAlert } from "@arco-design/web-vue";
import "@arco-design/web-vue/es/alert/style/css.js";

const props = defineProps<{
  title: string;
  description: string;
  type: string;
  closable: boolean;
}>();

const alertType = computed(
  () => props.type as "success" | "warning" | "info" | "error" | "normal",
);
</script>
