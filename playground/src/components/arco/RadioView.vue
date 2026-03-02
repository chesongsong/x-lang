<template>
  <div style="padding: 8px 0">
    <ARadioGroup :model-value="selected" @update:model-value="onChange">
      <ARadio v-for="opt in options" :key="opt" :value="opt">
        {{ opt }}
      </ARadio>
    </ARadioGroup>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { RadioGroup as ARadioGroup, Radio as ARadio } from "@arco-design/web-vue";
import "@arco-design/web-vue/es/radio/style/css.js";
import type { RenderContext } from "@x-lang/render";
import { XLANG_CTX_KEY } from "../_define-vue-component";

defineProps<{
  options: readonly string[];
  selected: string;
}>();

const ctx = inject<RenderContext>(XLANG_CTX_KEY)!;

function onChange(val: string) {
  ctx.emit("change", val);
}
</script>
