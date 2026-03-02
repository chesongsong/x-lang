<template>
  <ATable :data-source="rows" :columns="columns" :pagination="false" size="small" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Table as ATable } from "ant-design-vue";

interface RenderTableColumn {
  readonly name: string;
  readonly values: readonly unknown[];
}

const props = defineProps<{
  columns: readonly RenderTableColumn[];
}>();

const columns = computed(() =>
  [
    { title: "#", key: "_index", width: 50, customRender: ({ index }: { index: number }) => index + 1 },
    ...props.columns.map((c) => ({
      title: c.name,
      dataIndex: c.name,
      key: c.name,
    })),
  ],
);

const rows = computed(() => {
  const rowCount = props.columns[0]?.values.length ?? 0;
  const result: Record<string, unknown>[] = [];
  for (let i = 0; i < rowCount; i++) {
    const row: Record<string, unknown> = { key: i };
    for (const col of props.columns) {
      row[col.name] = col.values[i];
    }
    result.push(row);
  }
  return result;
});
</script>
