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
        <div class="form_body_flex">
          <el-form-item prop="cate_id">
            <CommonSelect
              v-model="ruleForm.cate_id"
              :options="cateOptions"
              placeholder="priority"
              size="large"
            ></CommonSelect>
          </el-form-item>
          <el-form-item prop="state">
            <CommonSelect
              v-model="ruleForm.state"
              :options="stateOptions"
              placeholder="Article state"
              size="large"
              border-animate
            />
          </el-form-item>
        </div>
        <el-form-item prop="introduce">
          <!-- <v-textarea
            v-model="ruleForm.introduce"
            :rows="2"
            color="blue-accent-4"
            label="introduce"
          ></v-textarea> -->
          <BorInput
            v-model="ruleForm.introduce"
            :rows="4"
            type="textarea"
            placeholder="Article Introduce"
          ></BorInput>
        </el-form-item>
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
import { reactive, ref, onBeforeMount } from 'vue';

import PlaInput from '@/components/input/PlaInput.vue';
import BorInput from '@/components/input/BorInput.vue';
import Tinymce from '@/components/tinymce/Tinymce.vue';
import CommonSelect from '@/components/select/CommonSelect.vue';

import type { FormInstance, FormRules } from 'element-plus';
import type { ParamsListInt } from '@/types/index';
import type { AddArticleParams } from '@/types/article';
import { cateList } from '@/api/api_cate';

interface SelectItem {
  value: string;
  label: string;
}

const ruleFormRef = ref<FormInstance>();
const cateOptions = ref<SelectItem[]>([]);
const tinymceRef = ref();
const ruleForm = reactive<AddArticleParams>({
  title: '',
  cate_id: '',
  tags: [],
  content: '',
  introduce: '',
  state: '1',
  cover_img: [],
});
const rules: FormRules = {
  title: [
    { required: true, message: 'Please input Article Title', trigger: 'blur' },
  ],
  cate_id: [
    {
      required: true,
      message: 'Please select Article category',
      trigger: 'blur',
    },
  ],
  state: [
    {
      required: false,
      message: 'Please select Article state',
      trigger: 'blur',
    },
  ],
  tags: [
    {
      required: false,
      message: 'Please select Article tags',
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
  introduce: [
    {
      required: true,
      message: 'Please select Task introduce',
      trigger: 'blur',
    },
  ],
};
const stateOptions = [
  {
    label: '上线',
    value: '1',
  },
  {
    label: '草稿',
    value: '2',
  },
  {
    label: '下线',
    value: '3',
  },
];

onBeforeMount(() => {
  getCateList();
});

const getCateList = async () => {
  const params: ParamsListInt = {
    page: 1,
    pageSize: 10,
  };
  const { code, data } = await cateList(params);
  if (code === 200) {
    cateOptions.value = data.list.map((item) => ({
      label: item.name,
      value: item._id,
    }));
  }
};

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

@media screen and (max-width: 900px) {
  .form {
    padding: 1.5rem 0.8rem;
    &_body_flex {
      flex-direction: column;
    }
  }
}
</style>
