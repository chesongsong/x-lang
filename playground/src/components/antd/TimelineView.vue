<template>
  <div style="padding: 8px 0">
    <ATimeline>
      <ATimelineItem v-for="(item, i) in items" :key="i" :color="item.type">
        <div style="font-size: 12px; color: #8c8c8c">{{ item.time }}</div>
        <div>{{ item.title }}</div>
      </ATimelineItem>
    </ATimeline>
  </div>
</template>

<script setup lang="ts">
import { Timeline as ATimeline, TimelineItem as ATimelineItem } from "ant-design-vue";

defineProps<{
  items: readonly { title: string; time: string; type: string }[];
}>();
</script>
