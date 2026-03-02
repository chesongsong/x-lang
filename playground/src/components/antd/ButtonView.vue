<template>
  <div style="padding: 4px 0">
    <AButton :type="(type as any)" :size="(size as any)" @click="handleClick">{{ text }}</AButton>
  </div>
</template>

<script setup lang="ts">
import { Button as AButton } from "ant-design-vue";

const props = defineProps<{
  text: string;
  type: string;
  size: string;
  onClick?: string;
}>();

function handleClick() {
  if (props.onClick) alert(props.onClick);
}
</script>
