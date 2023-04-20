<template>
  <div class="form t-boxshadow t-background">
    <h3 class="form_title t-color">Article Information</h3>
    <div class="form_body">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item prop="title">
          <PlaInput
            v-model="ruleForm.title"
            placeholder="Article Title"
            size="large"
            border-animate
          />
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
import { reactive, ref } from 'vue';

import PlaInput from '@/components/input/PlaInput.vue';

import type { FormInstance, FormRules } from 'element-plus';

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  title: '',
});
const rules: FormRules = {
  title: [
    { required: true, message: 'Please input Article Title', trigger: 'blur' },
  ],
};
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
  }
}
</style>
