<template>
  <div>
    <div class="page">
      <h3 class="page_title t-color">Make the changes below</h3>
      <p class="page_txt mtop-10">
        We’re constantly trying to express ourselves and actualize our dreams.
        If you have the opportunity to play.
      </p>
      <div class="page_body">
        <div class="page_body_left">
          <PicCard
            :data="picData"
            :show-footer="false"
            :is-btn="true"
          ></PicCard>
        </div>
        <div class="page_body_right">
          <ArticleForm ref="articleFormRef"></ArticleForm>
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
  </div>
</template>

<script lang="ts">
export default {
  name: 'NEArticle',
};
</script>

<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import PicCard from '@/components/card/PicCard.vue';
import ArticleForm from './ArticleForm.vue';
import { ElNotification } from 'element-plus';

import pic1 from '@/assets/img/pic1.jpg';
import type { FormInstance } from 'element-plus';
import type { AddArticleParams, EditArticleParams } from '@/types/article';
import { addArticle, articleDetail, articleEdit } from '@/api/api_article';
import { nextTick } from 'vue';

interface ArticleFormRef {
  ruleFormRef: FormInstance;
  ruleForm: AddArticleParams;
}

const picData = {
  img: pic1,
  title: 'Cozy 5 Stars Apartment',
  content:
    'The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Barcelona.',
};
const router = useRouter();
const route = useRoute();
const submitLoading = ref(false);
const articleFormRef = ref();
let articleId = '';

onBeforeMount(() => {
  if (route.query.id) {
    articleId = route.query.id as string;
    getDetail();
  }
});

const getDetail = async () => {
  const params = {
    _id: articleId,
  };

  const { code, data } = await articleDetail(params);

  if (code === 200) {
    nextTick(() => {
      articleFormRef.value.ruleForm.title = data.title;
      articleFormRef.value.ruleForm.cate_id = data.cate_id;
      articleFormRef.value.ruleForm.state = data.state;
      articleFormRef.value.ruleForm.tags = data.tags;
      articleFormRef.value.ruleForm.introduce = data.introduce;
      articleFormRef.value.ruleForm.cover_img = data.cover_img;
      articleFormRef.value.tinymceRef.setContent(data.content);
    });
  }
};

const handleSubmit = async () => {
  const { ruleFormRef, ruleForm }: ArticleFormRef = articleFormRef.value;

  await ruleFormRef.validate((valid: boolean) => {
    if (valid) {
      if (articleId) {
        edit(ruleForm);
      } else {
        add(ruleForm);
      }
    }
  });
};

const edit = async (data: AddArticleParams) => {
  submitLoading.value = true;
  const params: EditArticleParams = {
    ...data,
    _id: articleId,
  };
  const { code } = await articleEdit(params);
  if (code === 200) {
    ElNotification({
      title: '提示',
      type: 'success',
      message: '操作成功',
    });
    router.push('/articleList');
  }
  submitLoading.value = false;
};

const add = async (data: AddArticleParams) => {
  submitLoading.value = true;
  const params = {
    ...data,
  };
  const res = await addArticle(params);

  if (res.code === 200) {
    ElNotification({
      title: '提示',
      type: 'success',
      message: '操作成功',
    });
    router.push('/articleList');
  }
  submitLoading.value = false;
};
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
