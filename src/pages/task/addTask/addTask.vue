<template>
  <div>
    <div class="page">
      <h3 class="page_title t-color">New Task</h3>
      <p class="page_txt mtop-10">
        We’re constantly trying to express ourselves and actualize our dreams.
        If you have the opportunity to play.
      </p>
      <div class="page_body">
        <div class="page_body_left">
          <PicCard
            ref="imgsRef"
            :data="picData"
            :show-footer="false"
            :is-btn="true"
          ></PicCard>
        </div>
        <div class="page_body_right">
          <TaskForm ref="taskFormRef"> </TaskForm>
        </div>
      </div>
      <div class="page_footer">
        <v-btn
          class="page_footer_add mtop-15 mright-20"
          :loading="submitLoading"
          @click="handleSubmit"
          >SUBMIT</v-btn
        >
      </div>
    </div>
    <Overlay v-model="loading"> </Overlay>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AddTask',
};
</script>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import PicCard from '@/components/card/PicCard.vue';
import TaskForm from './TaskForm.vue';
import { ElNotification } from 'element-plus';
import Overlay from '@/components/mask/Overlay.vue';

import { taskAdd, taskDetail, taskEdit } from '@/api/api_task';
import type { AddTaskParams, IdParamsInt } from '@/types/task';
import type { FormInstance } from 'element-plus';
import pic1 from '@/assets/img/pic1.jpg';

interface TaskFormRef {
  ruleFormRef: FormInstance;
  ruleForm: AddTaskParams;
  tinymceRef: {
    setContent: (data: string) => void;
  };
}

const router = useRouter();
const route = useRoute();
const picData = {
  img: pic1,
  title: 'Cozy 5 Stars Apartment',
  content:
    'The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Barcelona.',
};
const taskFormRef = ref();
const imgsRef = ref();
const submitLoading = ref(false);
const loading = ref(false);
let taskId = '';

const handleSubmit = async () => {
  const { ruleFormRef, ruleForm }: TaskFormRef = taskFormRef.value;
  await ruleFormRef.validate((valid: boolean) => {
    if (valid) {
      if (taskId) {
        editTask(ruleForm);
      } else {
        addTask(ruleForm);
      }
    }
  });
};

const editTask = async (data: AddTaskParams) => {
  submitLoading.value = true;

  const params = {
    ...data,
    _id: taskId,
  };
  params.imgs = imgsRef.value.imgList.join(',');
  params.needTime = data.needTime * 60 * 60 * 24 * 1000;
  const res = await taskEdit(params);

  if (res.code === 200) {
    ElNotification({
      title: '提示',
      type: 'success',
      message: '操作成功',
    });
    router.back();
  }
  submitLoading.value = false;
};

const addTask = async (data: AddTaskParams) => {
  submitLoading.value = true;
  const params = {
    ...data,
  };
  params.imgs = imgsRef.value.imgList.join(',');
  params.needTime = data.needTime * 60 * 60 * 24 * 1000;
  const res = await taskAdd(params);

  if (res.code === 200) {
    ElNotification({
      title: '提示',
      type: 'success',
      message: '操作成功',
    });
    router.back();
  }
  submitLoading.value = false;
};

const init = () => {
  taskId = route.query.id as string;
  if (taskId) {
    getTask();
  }
};

const getTask = async () => {
  loading.value = true;
  const params: IdParamsInt = {
    _id: taskId,
  };

  const { code, data } = await taskDetail(params);
  if (code === 200) {
    taskFormRef.value.ruleForm.name = data.name;
    taskFormRef.value.ruleForm.content = data.content;
    taskFormRef.value.ruleForm.priority = data.priority;
    taskFormRef.value.ruleForm.needTime = data.needTime / 1000 / 24 / 60 / 60;
    taskFormRef.value.tinymceRef.setContent(data.content);
    nextTick(() => {
      try {
        imgsRef.value.imgList = data.imgs.split(',');
      } catch {
        imgsRef.value.imgList = [];
      }
      loading.value = false;
    });
  }
};

onMounted(init);
</script>

<style lang="less" scoped>
.page {
  padding-left: 1rem;
  box-sizing: border-box;
  &_title {
    font-size: 1.5rem;
    line-height: 1.375;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    letter-spacing: 0.00735em;
    // color: rgb(52, 71, 103);
    font-weight: 600;
    padding-top: 1.5rem;
    box-sizing: border-box;
  }
  &_txt {
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.6;
    letter-spacing: 0.01071em;
    color: rgb(123, 128, 154);
  }
  &_body {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1.5rem;
    margin-top: 4.5rem;
    &_left {
    }
    &_right {
      //   background-color: #fff;
    }
  }
  &_footer {
    display: flex;
    justify-content: flex-end;
    &_add {
      padding: 0.5625rem 1rem;
      background-image: linear-gradient(
        195deg,
        rgb(73, 163, 241),
        rgb(26, 115, 232)
      );
      background-position-y: initial;
      background-repeat: initial;
      background-attachment: initial;
      background-origin: initial;
      background-clip: initial;
      background-color: initial;
      color: rgb(255, 255, 255);
      box-sizing: border-box;
      box-shadow: rgb(26 115 232 / 15%) 0rem 0.1875rem 0.1875rem 0rem,
        rgb(26 115 232 / 20%) 0rem 0.1875rem 0.0625rem -0.125rem,
        rgb(26 115 232 / 15%) 0rem 0.0625rem 0.3125rem 0rem;
      background-size: 150% !important;
      background-position-x: 25% !important;
    }
  }
}
</style>
