<template>
  <div class="sort">
    <h3 class="sort_title t-color">Minimal Bar Stool</h3>
    <el-rate v-model="rate" size="large" allow-half class="t-color" />
    <div class="sort_tags">
      <h6 class="sort_tags_title t-color">Tags</h6>
      <ul>
        <li>IN STOCK</li>
        <li>IN STOCK</li>
      </ul>
    </div>
    <div class="sort_des">
      <h6 class="sort_des_title">Description</h6>
      <ol>
        <li>
          <i></i> The most beautiful curves of this swivel stool adds an elegant
          touch to any environment
        </li>
        <li><i></i>Memory swivel seat returns to original seat position</li>
        <li><i></i>Comfortable integrated layered chair seat cushion design</li>
        <li><i></i>Fully assembled! No assembly required</li>
      </ol>
    </div>
    <div class="sort_content">
      <h6 class="sort_content_title">Article</h6>
      <div>ArticleDetail</div>
    </div>
    <button class="sort_btn">Edit Article</button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'InfoSort',
};
</script>

<script lang="ts" setup>
import { ref } from 'vue';

const rate = ref(1);
</script>

<style lang="less" scoped>
.sort {
  &_title {
    font-size: 1.6rem;
    line-height: 1.375;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-weight: 700;
  }
  .el-rate {
    :deep(.el-rate__icon) {
      font-size: 1.5rem;
    }
  }
  &_tags {
    font-size: 1rem;
    &_title {
      line-height: 1.625;
      font-family: Roboto, Helvetica, Arial, sans-serif;
      letter-spacing: 0.0075em;
      font-weight: 600;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 0.625rem;
      li {
        padding: 0.55em 0.9em;
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        line-height: 1;
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        border-radius: 0.375rem;
        background: rgb(188, 226, 190);
        color: rgb(51, 149, 55);
      }
    }
  }
  &_des {
    &_title {
      font-family: Roboto, Helvetica, Arial, sans-serif;
      font-size: 0.875rem;
      line-height: 1.5;
      letter-spacing: 0.02857em;
      color: rgb(123, 128, 154);
      margin-top: 24px;
      margin-bottom: 8px;
      margin-left: 4px;
      background: transparent;
    }
    ol {
      li {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        align-items: center;
        font-family: Roboto, Helvetica, Arial, sans-serif;
        font-size: 1rem;
        line-height: 1.6;
        letter-spacing: 0.01071em;
        color: rgb(123, 128, 154);
        padding-left: 0.5rem;
        i {
          display: inline-block;
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          background: rgb(123, 128, 154);
        }
      }
    }
  }
  &_content {
    &_title {
      font-family: Roboto, Helvetica, Arial, sans-serif;
      font-size: 0.875rem;
      line-height: 1.5;
      letter-spacing: 0.02857em;
      color: rgb(123, 128, 154);
      margin-top: 24px;
      margin-bottom: 15px;
      margin-left: 4px;
      background: transparent;
    }
  }
  &_btn {
    font-family: Roboto, Helvetica, Arial, sans-serif;
    letter-spacing: 0.02857em;
    align-items: center;
    font-size: 0.75rem;
    font-weight: 700;
    border-radius: 0.5rem;
    line-height: 1.4;
    text-align: center;
    padding: 0.5625rem 1.5rem;
    background-image: linear-gradient(
      195deg,
      rgb(73, 163, 241),
      rgb(26, 115, 232)
    );
    color: rgb(255, 255, 255);
    box-shadow: rgb(26 115 232 / 15%) 0rem 0.1875rem 0.1875rem 0rem,
      rgb(26 115 232 / 20%) 0rem 0.1875rem 0.0625rem -0.125rem,
      rgb(26 115 232 / 15%) 0rem 0.0625rem 0.3125rem 0rem;
    background-size: 150% !important;
    background-position-x: 25% !important;
    margin-top: 1.5rem;
    border: none;
    transition: all 150ms ease-in 0s;
    cursor: pointer;
  }
}
</style>
