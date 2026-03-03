<template>
  <div style="padding: 8px 0">
    <ATimeline>
      <ATimelineItem v-for="(item, i) in items" :key="i" :label="item.time">
        {{ item.title }}
      </ATimelineItem>
    </ATimeline>
  </div>
</template>

<script setup lang="ts">
import { Timeline as ATimeline, TimelineItem as ATimelineItem } from "@arco-design/web-vue";
import "@arco-design/web-vue/es/timeline/style/css.js";

defineProps<{
  items: readonly { title: string; time: string; type: string }[];
}>();
</script>
