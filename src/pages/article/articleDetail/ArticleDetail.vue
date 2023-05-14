<template>
  <div>
    <div class="page">
      <h3 class="t-color">Article Details</h3>
      <section class="page_body">
        <div class="page_body_left t-boxshadow t-background">
          <ImgSort :data="article"></ImgSort>
        </div>
        <div class="page_body_right t-boxshadow t-background">
          <InfoSort :data="article"></InfoSort>
        </div>
      </section>
    </div>
    <div class="other t-boxshadow t-background">
      <OtherList :list="articles" @refresh="init"></OtherList>
    </div>
    <Overlay v-model="loading"> </Overlay>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ArticleDetail',
};
</script>

<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';

import ImgSort from './ImgSort.vue';
import InfoSort from './InfoSort.vue';
import OtherList from './OtherList.vue';
import Overlay from '@/components/mask/Overlay.vue';

import { articleDetail, articleList } from '@/api/api_article';
import type { ArticleInt, ArticleListParams } from '@/types/article';

const route = useRoute();
const article = ref<ArticleInt | null>(null);
const loading = ref(false);
const articles = ref<ArticleInt[]>([]);
let articleId = '';

onBeforeMount(() => {
  init();
});

const init = () => {
  if (route.query.id) {
    if (route.query.id === articleId) {
      setTimeout(() => {
        init();
      }, 0);
      return;
    }
    articleId = route.query.id as string;
    getDetail();
  }
};

const getDetail = async () => {
  loading.value = true;
  const params = {
    _id: articleId,
  };

  const { code, data } = await articleDetail(params);

  if (code === 200) {
    article.value = data;
  }
  getList();
};

const getList = async () => {
  const params: ArticleListParams = {
    page: 1,
    pageSize: 10,
    not_id: articleId,
  };
  const { code, data } = await articleList(params);
  if (code === 200) {
    articles.value = data.list;
  }
  loading.value = false;
};
</script>

<style lang="less" scoped>
.page {
  margin-top: 1.875rem;
  h3 {
    font-size: 1.25rem;
    line-height: 1.375;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }
  &_body {
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    gap: 1.5rem;
    &_right {
      flex: 1.7;
      width: 100%;
      padding: 1.5rem;
      box-sizing: border-box;
      border-radius: 0.5rem;
    }
    &_left {
      overflow: hidden;
      flex: 1;
      width: 100%;
      padding: 1.5rem;
      box-sizing: border-box;
      border-radius: 0.5rem;
      align-self: flex-start;
      img {
        width: 100%;
        border-radius: 0.5rem;
        box-shadow: rgb(0 0 0 / 10%) 0rem 0.625rem 0.9375rem -0.1875rem,
          rgb(0 0 0 / 5%) 0rem 0.25rem 0.375rem -0.125rem;
        object-fit: contain;
      }
    }
  }
}
.other {
  margin-top: 2.25rem;
  padding: 1.5rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
}

@media screen and (max-width: 1200px) {
  .page {
    padding: 1rem;
    &_body {
      flex-direction: column;
    }
  }
}
</style>
