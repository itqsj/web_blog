<template>
  <div class="card">
    <div class="card_img">
      <CommonImg :src="data.cover_img[0]" alt="" />
    </div>
    <div class="card_body">
      <p class="font-16">Article#{{ index + 1 }}</p>
      <h4 class="font-20 t-color ellipsis-2">{{ data.title }}</h4>
      <p class="font-16 ellipsis-2">
        {{ data.introduce }}
      </p>
      <div class="line mtop-16 mbouttom-16"></div>
    </div>
    <div class="card_footer font-14">
      <el-button color="#626aef" :dark="isDark" plain @click="goDetail"
        >VIEW ARTICLE</el-button
      >
      <div class="card_footer_right flex_center">
        <img
          src="	https://demos.creative-tim.com/otis-admin-pro/static/media/marie.c28f32663b6432b46f78.jpg"
          alt=""
        />
        <img
          src="	https://demos.creative-tim.com/otis-admin-pro/static/media/marie.c28f32663b6432b46f78.jpg"
          alt=""
          :style="{ left: '-0.4rem' }"
        />
        <img
          src="	https://demos.creative-tim.com/otis-admin-pro/static/media/marie.c28f32663b6432b46f78.jpg"
          alt=""
          :style="{ left: '-0.8rem' }"
        />
        <img
          src="	https://demos.creative-tim.com/otis-admin-pro/static/media/marie.c28f32663b6432b46f78.jpg"
          alt=""
          :style="{ left: '-1.2rem' }"
        />
        <img
          src="	https://demos.creative-tim.com/otis-admin-pro/static/media/marie.c28f32663b6432b46f78.jpg"
          alt=""
          :style="{ left: '-1.6rem' }"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ArticlePanel',
};
</script>

<script lang="ts" setup>
import { toRefs } from 'vue';
import { useRouter } from 'vue-router';

import CommonImg from '@/components/img/CommonImg.vue';

import { isDark } from '@/composables';
import type { ArticleInt } from '@/types/article';

const router = useRouter();
const props = defineProps({
  data: {
    type: Object as () => ArticleInt,
    default: () => ({}),
  },
  index: {
    type: Number,
    default: 0,
  },
});
const { data, index } = toRefs(props);

const goDetail = () => {
  const query = {
    id: data.value._id,
  };
  router.push({
    path: '/articleDetail',
    query,
  });
};
</script>

<style lang="less" scoped>
.card {
  border-radius: 8px;

  //   &:hover {
  //     .card_img {
  //       top: -68px;
  //     }
  //   }
  &_img {
    overflow: hidden;
    z-index: 20;
    position: relative;
    // top: -20px;
    margin: 0 1rem;
    border-radius: 0.5rem;
    transition: all 300ms cubic-bezier(0.34, 1.61, 0.7, 1) 0s;
    img {
      width: 100%;
      aspect-ratio: 1.5/1;
      object-fit: contain;
      border-radius: 8px;
    }
  }
  &_body {
    position: relative;
    h4 {
      padding: 0 1rem;
      font-weight: 500;
      box-sizing: border-box;
    }
    p {
      color: rgb(123, 128, 154);
      margin: 0.875rem 1rem;
      font-weight: 300;
    }
  }
  &_footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgb(123, 128, 154);
    padding: 0.25rem 1rem 1.5rem;
    box-sizing: border-box;
    &_right {
      img {
        position: relative;
        width: 1.25rem;
        height: 1.25rem;
        border-radius: 50%;
        transition: all 0.3s;
        &:hover {
          z-index: 2;
        }
      }
    }
  }
}
</style>
