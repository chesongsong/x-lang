<template>
  <div class="agent-chat" :class="roleClass">
    <div class="bubble">
      <div class="content">{{ content }}</div>
      <div v-if="options.length" class="options">
        <AButton
          v-for="opt in options"
          :key="opt.value"
          size="small"
          :disabled="selectedValue !== ''"
          @click="handleSelect(opt)"
        >
          {{ opt.label }}
        </AButton>
      </div>
      <div v-if="selectedLabel" class="selected">已选择：{{ selectedLabel }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from "vue";
import { Button as AButton } from "ant-design-vue";
import type { RenderContext } from "@x-langjs/render";
import { XLANG_CTX_KEY } from "../_define-vue-component.js";

interface OptionItem {
  label: string;
  value: string;
}

const props = defineProps<{
  role: string;
  content: string;
  questionId: string;
  options: OptionItem[];
}>();

const ctx = inject<RenderContext | null>(XLANG_CTX_KEY, null);
const selectedValue = ref("");
const selectedLabel = ref("");

const roleClass = computed(() => (props.role === "user" ? "is-user" : "is-agent"));

function handleSelect(option: OptionItem) {
  if (selectedValue.value) return;
  selectedValue.value = option.value;
  selectedLabel.value = option.label;
  ctx?.emit("agentchat", "select", {
    questionId: props.questionId,
    value: option.value,
    label: option.label,
    role: props.role,
  });
}
</script>

<style scoped>
.agent-chat {
  display: flex;
  margin: 8px 0;
}

.agent-chat.is-agent {
  justify-content: flex-start;
}

.agent-chat.is-user {
  justify-content: flex-end;
}

.bubble {
  max-width: 78%;
  background: #f6f7fb;
  border: 1px solid #e3e6ef;
  border-radius: 12px;
  padding: 12px 14px;
  display: grid;
  gap: 10px;
}

.agent-chat.is-user .bubble {
  background: #e8f0ff;
  border-color: #c7d6ff;
}

.content {
  font-size: 14px;
  color: #1f2a44;
  white-space: pre-wrap;
}

.options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.selected {
  font-size: 12px;
  color: #6b7280;
}
</style>
