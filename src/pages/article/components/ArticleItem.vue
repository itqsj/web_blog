<template>
  <div class="card t-boxshadow t-background enter">
    <div class="card_img">
      <!-- <img :src="data.img" alt="" /> -->
      <v-carousel
        hide-delimiter-background
        show-arrows="hover"
        :interval="300"
        height="auto"
      >
        <v-carousel-item v-for="(item, index) in data.cover_img" :key="index">
          <CommonImg lazy cover :src="item"></CommonImg>
        </v-carousel-item>
      </v-carousel>
    </div>
    <div class="card_body">
      <div class="card_body_operat">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="Detail"
          placement="bottom"
        >
          <v-btn class="v-btn--icon" @click="goDetail">
            <el-icon style="color: #e82567" :size="18"><Checked /></el-icon>
          </v-btn>
        </el-tooltip>

        <el-tooltip
          class="box-item"
          effect="dark"
          content="Edit"
          placement="bottom"
        >
          <v-btn class="v-btn--icon" @click="handleEdit">
            <el-icon :size="18" style="color: #1a73e8"><EditPen /></el-icon>
          </v-btn>
        </el-tooltip>

        <delConfirm
          v-model="showDel"
          persistent
          width="360"
          :loading="delLoading"
        >
          <template #activator="{ props }">
            <el-tooltip
              class="box-item"
              effect="dark"
              content="Del"
              placement="bottom"
            >
              <v-btn v-bind="props" class="v-btn--icon">
                <el-icon style="color: #e82567" :size="18"><Delete /></el-icon>
              </v-btn>
            </el-tooltip>
          </template>
          <template #actions>
            <v-btn variant="text" color="teal-accent-4" @click="closeDel"
              >CANCEL</v-btn
            >
            <v-btn variant="text" color="teal-accent-4" @click="handleDel"
              >COMFIRM</v-btn
            >
          </template>
        </delConfirm>
      </div>
      <h4 class="font-20">{{ data.title }}</h4>
      <p class="font-16">
        {{ data.introduce }}
      </p>
      <div class="line mtop-16 mbouttom-16"></div>
    </div>
    <div class="card_footer font-16">
      <div>creator: {{ data.author_name }}</div>
      <div class="flex_center">
        <el-icon class="mright-5"><Stopwatch /></el-icon>
        {{ formatDate(data.pub_time) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ArticleItem',
};
</script>

<script lang="ts" setup>
import { toRefs, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import delConfirm from '@/components/delConfirm/delConfirm.vue';
import { ElNotification } from 'element-plus';
import CommonImg from '@/components/img/CommonImg.vue';

import type { ArticleInt } from '@/types/article';
import { articleDel } from '@/api/api_article';
import formatDate from '@/util/formatDate';

const props = defineProps({
  data: {
    type: Object as () => ArticleInt,
    default: () => ({}),
  },
});
const emit = defineEmits(['del']);
const router = useRouter();
const { data } = toRefs(props);
const showDel = ref(false);
const delLoading = ref(false);
const isShow = ref(false);

onMounted(() => {
  setTimeout(() => {
    isShow.value = true;
  }, 300);
});

const goDetail = () => {
  const query = {
    id: data.value._id,
  };
  router.push({
    path: '/articleDetail',
    query,
  });
};

const handleDel = async () => {
  delLoading.value = true;
  const params = {
    _id: data.value._id,
  };
  const { code, message } = await articleDel(params);
  if (code === 200) {
    emit('del', data.value._id);
  }
  delLoading.value = false;
  ElNotification({
    type: 'success',
    title: '提示',
    message,
  });
  showDel.value = false;
};

const closeDel = () => {
  if (!delLoading.value) {
    showDel.value = false;
  }
};

const handleEdit = () => {
  const query = {
    id: data.value._id,
  };
  router.push({
    path: '/newArticle',
    query,
  });
};
</script>

<style lang="less" scoped>
.card {
  position: absolute;
  border-radius: 8px;
  // transition: all 0.3s ease;

  &:hover {
    .card_img {
      transform: translate(0, -3.4375rem);
    }
  }
  &_img {
    z-index: 20;
    position: relative;
    top: -20px;
    width: 95%;
    margin: auto;
    transition: all 300ms cubic-bezier(0.34, 1.61, 0.7, 1) 0s;
    .v-carousel {
      overflow: hidden;
      width: 100%;
      aspect-ratio: 1.5/1;
      :deep(.v-responsive) {
        overflow: hidden;
        width: 100%;
        aspect-ratio: 1.5/1;
      }
    }
    img {
      width: 100%;
      aspect-ratio: 1.5/1;
      object-fit: contain;
      border-radius: 8px;
    }
  }
  &_body {
    position: relative;
    &_operat {
      position: absolute;
      top: -4.375rem;
      display: flex;
      justify-content: center;
      gap: 2.5rem;
      width: 100%;
      font-size: 1.125rem;
    }
    h4 {
      color: rgb(123, 128, 154);
      text-align: center;
      font-weight: 500;
    }
    p {
      color: rgb(123, 128, 154);
      padding: 12px 24px 8px 24px;
      text-align: center;
      font-weight: 300;
    }
  }
  &_footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgb(123, 128, 154);
    padding: 4px 24px 24px;
    box-sizing: border-box;
  }
}
</style>
