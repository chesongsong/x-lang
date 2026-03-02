<template>
  <div style="padding: 6px 0">
    <AProgress
      :percent="percentage"
      :status="progressStatus"
      :stroke-width="strokeWidth"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Progress as AProgress } from "ant-design-vue";

const props = defineProps<{
  percentage: number;
  status: string;
  strokeWidth: number;
  textInside: boolean;
}>();

const progressStatus = computed(() =>
  props.status === "success" ? "success" : props.status === "exception" ? "exception" : undefined,
);
</script>
