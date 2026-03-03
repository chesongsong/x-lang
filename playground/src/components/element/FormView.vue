<template>
  <div class="x-form-demo">
    <div v-if="title" class="x-form-title">{{ title }}</div>
    <div v-if="description" class="x-form-desc">{{ description }}</div>
    <ElForm :model="formModel" :label-width="labelWidthValue" label-position="right">
      <div class="x-form-grid" :style="{ gridTemplateColumns: gridColumns }">
        <div
          v-for="field in fields"
          :key="field.prop"
          class="x-form-cell"
          :style="{ gridColumn: 'span ' + spanToColumns(field.span) }"
        >
          <ElFormItem :label="field.label" :required="field.required">
            <ElInput
              v-if="isType(field, 'text')"
              v-model="formModel[field.prop]"
              :placeholder="field.placeholder"
            />
            <ElInput
              v-else-if="isType(field, 'textarea')"
              v-model="formModel[field.prop]"
              type="textarea"
              :rows="field.rows"
              :placeholder="field.placeholder"
            />
            <ElSelect
              v-else-if="isType(field, 'select')"
              v-model="formModel[field.prop]"
              :placeholder="field.placeholder"
            >
              <ElOption v-for="opt in field.options" :key="opt" :label="opt" :value="opt" />
            </ElSelect>
            <ElDatePicker
              v-else-if="isType(field, 'date')"
              v-model="formModel[field.prop]"
              type="date"
              :placeholder="field.placeholder || '请选择日期'"
            />
            <ElInputNumber
              v-else-if="isType(field, 'number')"
              v-model="formModel[field.prop]"
              :placeholder="field.placeholder"
              :min="0"
            />
            <ElRadioGroup
              v-else-if="isType(field, 'radio')"
              v-model="formModel[field.prop]"
            >
              <ElRadio v-for="opt in field.options" :key="opt" :label="opt">{{ opt }}</ElRadio>
            </ElRadioGroup>
            <ElCheckboxGroup
              v-else-if="isType(field, 'checkbox')"
              v-model="formModel[field.prop]"
            >
              <ElCheckbox v-for="opt in field.options" :key="opt" :label="opt">{{ opt }}</ElCheckbox>
            </ElCheckboxGroup>
            <ElSwitch v-else-if="isType(field, 'switch')" v-model="formModel[field.prop]" />
            <ElInput v-else v-model="formModel[field.prop]" :placeholder="field.placeholder" />
          </ElFormItem>
        </div>
      </div>
      <div class="x-form-actions">
        <ElButton type="primary" @click="handleSubmit">{{ submitText }}</ElButton>
        <ElButton @click="handleReset">{{ resetText }}</ElButton>
      </div>
    </ElForm>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from "vue";
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElInputNumber,
  ElRadio,
  ElRadioGroup,
  ElCheckbox,
  ElCheckboxGroup,
  ElSwitch,
  ElButton,
  ElMessage,
} from "element-plus";
import "element-plus/es/components/form/style/css";
import "element-plus/es/components/form-item/style/css";
import "element-plus/es/components/input/style/css";
import "element-plus/es/components/select/style/css";
import "element-plus/es/components/option/style/css";
import "element-plus/es/components/date-picker/style/css";
import "element-plus/es/components/input-number/style/css";
import "element-plus/es/components/radio/style/css";
import "element-plus/es/components/radio-group/style/css";
import "element-plus/es/components/checkbox/style/css";
import "element-plus/es/components/checkbox-group/style/css";
import "element-plus/es/components/switch/style/css";
import "element-plus/es/components/button/style/css";
import "element-plus/es/components/message/style/css";

interface FormField {
  label: string;
  prop: string;
  type: string;
  placeholder: string;
  required: boolean;
  options: string[];
  span: number;
  rows: number;
}

const props = defineProps<{
  title: string;
  description: string;
  fields: FormField[];
  submitText: string;
  resetText: string;
  labelWidth: string | number;
  column: number;
}>();

const formModel = reactive<Record<string, unknown>>({});

const gridColumns = computed(() => {
  const cols = Math.max(1, props.column || 1);
  return `repeat(${cols}, minmax(0, 1fr))`;
});

const labelWidthValue = computed(() => {
  if (typeof props.labelWidth === "number") {
    return `${props.labelWidth}px`;
  }
  return props.labelWidth || "120px";
});

function isType(field: FormField, type: string) {
  return (field.type || "text").toLowerCase() === type;
}

function spanToColumns(span?: number) {
  const cols = Math.max(1, props.column || 1);
  const safeSpan = Number.isFinite(span) ? (span as number) : 12;
  const perCol = 24 / cols;
  return Math.min(cols, Math.max(1, Math.round(safeSpan / perCol)));
}

function defaultValue(field: FormField) {
  const type = (field.type || "text").toLowerCase();
  if (type === "checkbox") return [];
  if (type === "switch") return false;
  if (type === "number") return 0;
  return "";
}

function syncModel(fields: FormField[]) {
  for (const field of fields) {
    if (!(field.prop in formModel)) {
      formModel[field.prop] = defaultValue(field);
    }
  }
}

watch(
  () => props.fields,
  (fields) => syncModel(fields),
  { immediate: true, deep: true },
);

function handleSubmit() {
  ElMessage.success("已提交表单");
}

function handleReset() {
  for (const field of props.fields) {
    formModel[field.prop] = defaultValue(field);
  }
}
</script>

<style scoped>
.x-form-demo {
  padding: 6px 0;
}

.x-form-title {
  font-weight: 600;
  margin-bottom: 6px;
}

.x-form-desc {
  color: #6b7280;
  margin-bottom: 12px;
}

.x-form-grid {
  display: grid;
  gap: 12px 16px;
}

.x-form-cell {
  min-width: 0;
}

.x-form-actions {
  margin-top: 12px;
  display: flex;
  gap: 12px;
}
</style>
