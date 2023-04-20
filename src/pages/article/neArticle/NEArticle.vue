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
          <ArticleForm></ArticleForm>
        </div>
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
import PicCard from '@/components/card/PicCard.vue';
import ArticleForm from './ArticleForm.vue';

import pic1 from '@/assets/img/pic1.jpg';

const picData = {
  img: pic1,
  title: 'Cozy 5 Stars Apartment',
  content:
    'The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Barcelona.',
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
}
</style>
