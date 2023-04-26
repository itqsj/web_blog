<template>
  <div class="card t-boxshadow t-background">
    <div class="card_img">
      <!-- <img :src="data.img" alt="" /> -->
      <v-carousel :show-arrows="false" height="auto">
        <v-carousel-item
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          cover
        ></v-carousel-item>

        <v-carousel-item
          src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
          cover
        ></v-carousel-item>

        <v-carousel-item
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          cover
        ></v-carousel-item>
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
          <el-icon style="color: #e82567" @click="goDetail"
            ><Checked
          /></el-icon>
        </el-tooltip>

        <el-tooltip
          class="box-item"
          effect="dark"
          content="Edit"
          placement="bottom"
        >
          <el-icon style="color: #1a73e8" @click="handleEdit"
            ><EditPen
          /></el-icon>
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
              <el-icon style="color: #e82567" v-bind="props"
                ><Delete
              /></el-icon>
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
      <div>$899/night</div>
      <div class="flex_center">
        <el-icon class="mright-5"><LocationFilled /></el-icon>Barcelona, Spain
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
import { toRefs, ref } from 'vue';
import { useRouter } from 'vue-router';

import delConfirm from '@/components/delConfirm/delConfirm.vue';
import { ElNotification } from 'element-plus';

import type { ArticleInt } from '@/types/article';
import { articleDel } from '@/api/api_article';

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
  border-radius: 8px;

  &:hover {
    .card_img {
      transform: translate(0, -35px);
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
      top: -40px;
      display: flex;
      justify-content: center;
      gap: 50px;
      width: 100%;
      font-size: 18px;
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
