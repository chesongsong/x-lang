<template>
  <div ref="chartRef" class="chart-view" :style="{ height: heightStyle }"></div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import * as echarts from "echarts";

const props = defineProps<{
  option: Record<string, unknown>;
  height: number;
}>();

const chartRef = ref<HTMLDivElement | null>(null);
let instance: echarts.ECharts | null = null;
let resizeObserver: ResizeObserver | null = null;

const heightStyle = computed(() => `${props.height}px`);

function initChart() {
  if (!chartRef.value) return;
  instance = echarts.init(chartRef.value);
  instance.setOption(props.option ?? {}, true);

  resizeObserver = new ResizeObserver(() => {
    instance?.resize();
  });
  resizeObserver.observe(chartRef.value);
}

function disposeChart() {
  if (resizeObserver && chartRef.value) {
    resizeObserver.unobserve(chartRef.value);
  }
  resizeObserver = null;
  instance?.dispose();
  instance = null;
}

onMounted(() => {
  initChart();
});

onBeforeUnmount(() => {
  disposeChart();
});

watch(
  () => props.option,
  (next) => {
    if (!instance) return;
    instance.setOption(next ?? {}, true);
  },
  { deep: true },
);
</script>

<style scoped>
.chart-view {
  width: 100%;
  min-height: 220px;
}
</style>
