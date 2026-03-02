<template>
  <AResult :title="title" :sub-title="subTitle || undefined" :status="resultStatus" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Result as AResult } from "@arco-design/web-vue";
import "@arco-design/web-vue/es/result/style/css.js";

const props = defineProps<{
  title: string;
  subTitle: string;
  icon: string;
}>();

const resultStatus = computed(() =>
  (["success", "warning", "info", "error"].includes(props.icon) ? props.icon : "success") as "success" | "warning" | "info" | "error",
);
</script>
