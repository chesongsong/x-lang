<template>
  <div style="margin: 4px 0">
    <ElCard :header="title || undefined" :shadow="cardShadow">
      {{ content }}
    </ElCard>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ElCard } from "element-plus";
import "element-plus/es/components/card/style/css";

const props = defineProps<{
  title: string;
  content: string;
  shadow: string;
}>();

const cardShadow = computed(() => {
  const s = props.shadow || "hover";
  return s === "always" ? "always" : s === "never" ? "never" : "hover";
});
</script>
