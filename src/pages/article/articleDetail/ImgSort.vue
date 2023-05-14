<template>
  <div class="sort">
    <div class="sort_img">
      <CommonImg :src="data?.cover_img[avtiveImg]" alt="" />
    </div>
    <div
      v-for="(item, index) in data?.cover_img"
      :key="index"
      :class="{ active: index === avtiveImg }"
      class="sort_item"
      @click="avtiveImg = index"
    >
      <div class="sort_item_cover">
        <CommonImg :src="item" alt="" />
      </div>
      封面{{ index }}
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ImgSort',
};
</script>

<script lang="ts" setup>
import { toRefs, ref } from 'vue';
import CommonImg from '@/components/img/CommonImg.vue';
import type { ArticleInt } from '@/types/article';

const props = defineProps({
  data: {
    type: Object as () => ArticleInt | null,
    default: null,
  },
});
const { data } = toRefs(props);
const avtiveImg = ref(0);
</script>

<style lang="less" scoped>
.sort {
  &_img {
    overflow: hidden;
    min-height: 10rem;
    border-radius: 0.5rem;
    box-shadow: rgb(0 0 0 / 10%) 0rem 0.625rem 0.9375rem -0.1875rem,
      rgb(0 0 0 / 5%) 0rem 0.25rem 0.375rem -0.125rem;
    margin-bottom: 1.5rem;
  }
  &_item {
    overflow: hidden;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    min-height: 5rem;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.3s;
    &:last-child {
      margin-bottom: 0;
    }
    &_cover {
      width: 6rem;
      // height: 100%;
      min-height: 3.75rem;
    }
  }
  .active {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
</style>
