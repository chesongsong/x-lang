<template>
  <div style="margin: 4px 0">
    <ACard :title="title || undefined" :hoverable="shadow === 'hover'">
      {{ content }}
    </ACard>
  </div>
</template>

<script setup lang="ts">
import { Card as ACard } from "@arco-design/web-vue";
import "@arco-design/web-vue/es/card/style/css.js";

defineProps<{
  title: string;
  content: string;
  shadow: string;
}>();
</script>
