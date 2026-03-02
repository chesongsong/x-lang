<template>
  <ElSkeleton animated :loading="true">
    <template #template>
      <div style="border: 1px solid #ebeef5; border-radius: 4px; padding: 16px">
        <ElSkeletonItem variant="h3" style="width: 40%; margin-bottom: 12px" />
        <ElSkeletonItem variant="text" style="width: 100%" />
        <ElSkeletonItem variant="text" style="width: 80%; margin-top: 8px" />
      </div>
    </template>
  </ElSkeleton>
</template>

<script setup lang="ts">
import { ElSkeleton, ElSkeletonItem } from "element-plus";
import "element-plus/es/components/skeleton/style/css";
import "element-plus/es/components/skeleton-item/style/css";
</script>
