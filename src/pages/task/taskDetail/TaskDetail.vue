<template>
  <div class="container">
    <div class="container_head">
      <h4 class="t-color">TASK DETAIL</h4>
      <div class="container_head_right">
        <v-btn variant="text" class="t-color" @click="showImg = !showImg">
          IMG
        </v-btn>
        <v-btn variant="text" class="t-color"> EDIT </v-btn>
      </div>
    </div>
    <v-expand-transition>
      <v-card v-show="showImg" title="Img" class="t-boxshadow">
        <div class="card">
          <img class="card_img" src="@/assets/img/pic1.jpg" alt="" />
        </div>
      </v-card>
    </v-expand-transition>
    <div style="height: 30px"></div>
    <v-card title="Basic info" class="t-boxshadow">
      <TaskBasicInfo :data="task"></TaskBasicInfo>
    </v-card>

    <div style="height: 30px"></div>
    <v-card title="Basic info" class="t-boxshadow">
      <EchoTinymce class="content" :data="task?.content"></EchoTinymce>
    </v-card>
    <Overlay v-model="loading"> </Overlay>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TaskDetail',
};
</script>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import TaskBasicInfo from './taskBasicInfo.vue';
import Overlay from '@/components/mask/Overlay.vue';
import EchoTinymce from '@/components/tinymce/EchoTinymce.vue';

import type { TaskInt } from '@/types/task';
import { taskDetail } from '@/api/api_task';

const route = useRoute();
const task = ref<TaskInt>();
const loading = ref(false);
let _id = '';

onMounted(() => {
  _id = route.query.id as string;
  getTaskDetail();
});

const getTaskDetail = async () => {
  loading.value = true;
  const params = {
    _id,
  };
  const { code, data } = await taskDetail(params);
  if (code === 200) {
    task.value = data;
  }
  loading.value = false;
};

const showImg = ref(false);
</script>

<style lang="less" scoped>
.container {
  max-width: 1400px;
  margin: 0 auto;
  &_head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    h4 {
      font-size: 28px;
      font-weight: 500;
    }
    &_right {
      display: flex;
      gap: 20px;
      .v-btn {
        font-weight: 600;
        font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI',
          Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
        font-size: 0.875rem;
      }
    }
  }
  .v-card {
    // margin-top: 30px;
  }
  .card {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 24px 24px;
    box-sizing: border-box;
    &_img {
      width: 80%;
      max-height: 720px;
      margin: 0 auto;
      border-radius: 8px;
      object-fit: contain;
    }
  }

  .content {
    padding: 0 24px 24px;
    box-sizing: border-box;
    :deep(img) {
      max-width: 100%;
      object-fit: contain;
    }
  }
}
</style>
