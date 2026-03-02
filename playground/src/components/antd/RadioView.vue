<template>
  <div style="padding: 8px 0">
    <ARadio.Group :value="selected" @update:value="onChange">
      <ARadio.Button v-for="opt in options" :key="opt" :value="opt">
        {{ opt }}
      </ARadio.Button>
    </ARadio.Group>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { Radio as ARadio } from "ant-design-vue";
import type { RenderContext } from "@x-lang/render";
import { XLANG_CTX_KEY } from "../_define-vue-component";

defineProps<{
  options: readonly string[];
  selected: string;
}>();

const ctx = inject<RenderContext>(XLANG_CTX_KEY)!;

function onChange(e: { target: { value: string } }) {
  ctx.emit("change", e.target.value);
}
</script>
