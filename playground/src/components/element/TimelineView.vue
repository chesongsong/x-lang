<template>
  <div style="padding: 8px 0">
    <ElTimeline>
      <ElTimelineItem
        v-for="(item, i) in items"
        :key="i"
        :timestamp="item.time"
        :type="item.type"
      >
        {{ item.title }}
      </ElTimelineItem>
    </ElTimeline>
  </div>
</template>

<script setup lang="ts">
import { ElTimeline, ElTimelineItem } from "element-plus";
import "element-plus/es/components/timeline/style/css";

defineProps<{
  items: readonly { title: string; time: string; type: string }[];
}>();
</script>
