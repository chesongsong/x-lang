<template>
  <div class="x-form-demo">
    <div v-if="title" class="x-form-title">{{ title }}</div>
    <div v-if="description" class="x-form-desc">{{ description }}</div>
    <AForm :model="formModel" layout="vertical">
      <div class="x-form-grid" :style="{ gridTemplateColumns: gridColumns }">
        <div
          v-for="field in fields"
          :key="field.prop"
          class="x-form-cell"
          :style="{ gridColumn: 'span ' + spanToColumns(field.span) }"
        >
          <AFormItem :label="field.label" :required="field.required">
            <AInput
              v-if="isType(field, 'text')"
              v-model="formModel[field.prop]"
              :placeholder="field.placeholder"
            />
            <ATextarea
              v-else-if="isType(field, 'textarea')"
              v-model="formModel[field.prop]"
              :auto-size="{ minRows: field.rows, maxRows: field.rows + 2 }"
              :placeholder="field.placeholder"
            />
            <ASelect
              v-else-if="isType(field, 'select')"
              v-model="formModel[field.prop]"
              :placeholder="field.placeholder"
            >
              <AOption v-for="opt in field.options" :key="opt" :value="opt">{{ opt }}</AOption>
            </ASelect>
            <ADatePicker
              v-else-if="isType(field, 'date')"
              v-model="formModel[field.prop]"
              style="width: 100%"
              :placeholder="field.placeholder || '请选择日期'"
            />
            <AInputNumber
              v-else-if="isType(field, 'number')"
              v-model="formModel[field.prop]"
              style="width: 100%"
              :placeholder="field.placeholder"
              :min="0"
            />
            <ARadioGroup
              v-else-if="isType(field, 'radio')"
              v-model="formModel[field.prop]"
            >
              <ARadio v-for="opt in field.options" :key="opt" :value="opt">{{ opt }}</ARadio>
            </ARadioGroup>
            <ACheckboxGroup
              v-else-if="isType(field, 'checkbox')"
              v-model="formModel[field.prop]"
            >
              <ACheckbox v-for="opt in field.options" :key="opt" :value="opt">{{ opt }}</ACheckbox>
            </ACheckboxGroup>
            <ASwitch v-else-if="isType(field, 'switch')" v-model="formModel[field.prop]" />
            <AInput v-else v-model="formModel[field.prop]" :placeholder="field.placeholder" />
          </AFormItem>
        </div>
      </div>
      <div class="x-form-actions">
        <AButton type="primary" @click="handleSubmit">{{ submitText }}</AButton>
        <AButton @click="handleReset">{{ resetText }}</AButton>
      </div>
    </AForm>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from "vue";
import {
  Form as AForm,
  FormItem as AFormItem,
  Input as AInput,
  Textarea as ATextarea,
  Select as ASelect,
  Option as AOption,
  DatePicker as ADatePicker,
  InputNumber as AInputNumber,
  RadioGroup as ARadioGroup,
  Radio as ARadio,
  CheckboxGroup as ACheckboxGroup,
  Checkbox as ACheckbox,
  Switch as ASwitch,
  Button as AButton,
  Message,
} from "@arco-design/web-vue";
import "@arco-design/web-vue/es/form/style/css.js";
import "@arco-design/web-vue/es/input/style/css.js";
import "@arco-design/web-vue/es/textarea/style/css.js";
import "@arco-design/web-vue/es/select/style/css.js";
import "@arco-design/web-vue/es/date-picker/style/css.js";
import "@arco-design/web-vue/es/input-number/style/css.js";
import "@arco-design/web-vue/es/radio/style/css.js";
import "@arco-design/web-vue/es/checkbox/style/css.js";
import "@arco-design/web-vue/es/switch/style/css.js";
import "@arco-design/web-vue/es/button/style/css.js";
import "@arco-design/web-vue/es/message/style/css.js";

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
  Message.success("已提交表单");
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
