<template>
  <div>
    <div class="page t-boxshadow t-background">
      <h3 class="t-color">Article Details</h3>
      <section class="page_body">
        <div class="page_body_left">
          <ImgSort></ImgSort>
        </div>
        <div class="page_body_right">
          <InfoSort></InfoSort>
        </div>
      </section>
    </div>
    <div class="other t-boxshadow t-background">
      <OtherList></OtherList>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ArticleDetail',
};
</script>

<script lang="ts" setup>
import ImgSort from './ImgSort.vue';
import InfoSort from './InfoSort.vue';
import OtherList from './OtherList.vue';
</script>

<style lang="less" scoped>
.page {
  margin-top: 1.875rem;
  padding: 1.5rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
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
    gap: 2.5rem;
    &_right {
      flex: 1.7;
    }
    &_left {
      overflow: hidden;
      flex: 1;
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
</style>
