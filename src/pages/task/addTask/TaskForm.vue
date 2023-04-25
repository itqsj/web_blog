<template>
  <div class="form t-boxshadow t-background">
    <h3 class="form_title t-color">Task Information</h3>
    <div class="form_body">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item prop="name">
          <PlaInput
            v-model="ruleForm.name"
            placeholder="Task Title"
            size="large"
            border-animate
          />
        </el-form-item>
        <div class="form_body_flex">
          <el-form-item prop="priority">
            <CommonSelect
              v-model="ruleForm.priority"
              :options="priorityOptions"
              placeholder="priority"
              size="large"
            ></CommonSelect>
          </el-form-item>
          <el-form-item prop="needTime">
            <CommonSelect
              v-model="ruleForm.needTime"
              :options="timeOptions"
              placeholder="needTime"
              size="large"
            ></CommonSelect>
          </el-form-item>
        </div>
        <el-form-item prop="content">
          <Tinymce ref="tinymceRef" v-model="ruleForm.content"></Tinymce>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ArticleForm',
};
</script>

<script lang="ts" setup>
import { Component, reactive, ref } from 'vue';

import PlaInput from '@/components/input/PlaInput.vue';
import Tinymce from '@/components/tinymce/Tinymce.vue';
import CommonSelect from '@/components/select/CommonSelect.vue';

import type { FormInstance, FormRules } from 'element-plus';

const ruleFormRef = ref<FormInstance>();
const tinymceRef = ref();
const ruleForm = reactive({
  name: '',
  priority: '',
  needTime: '',
  content: '',
});
const rules: FormRules = {
  name: [
    { required: true, message: 'Please input Task Title', trigger: 'blur' },
  ],
  priority: [
    {
      required: true,
      message: 'Please select Task priority',
      trigger: 'blur',
    },
  ],
  needTime: [
    {
      required: true,
      message: 'Please select Task time',
      trigger: 'blur',
    },
  ],
  content: [
    {
      required: true,
      message: 'Please select Task content',
      trigger: 'blur',
    },
  ],
};
const timeOptions = [
  {
    label: '1天',
    value: 1,
  },
  {
    label: '2天',
    value: 2,
  },
  {
    label: '3天',
    value: 3,
  },
];
const priorityOptions = [
  {
    label: '高',
    value: 1,
  },
  {
    label: '较高',
    value: 2,
  },
  {
    label: '低',
    value: 3,
  },
];

defineExpose({
  ruleFormRef,
  ruleForm,
  tinymceRef,
});
</script>

<style lang="less" scoped>
.form {
  height: 100%;
  padding: 1.5rem;
  border-radius: 8px;
  box-sizing: border-box;
  &_title {
    font-size: 1.25rem;
    line-height: 1.375;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-weight: 700;
  }
  &_body {
    margin-top: 1.5rem;
    &_flex {
      display: flex;
      justify-content: space-between;
      gap: 1.5rem;
    }
  }
  .el-form-item {
    width: 100%;
    margin-bottom: 2.1875rem;
  }
}
</style>
