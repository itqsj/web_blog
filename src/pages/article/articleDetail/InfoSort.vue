<template>
  <div v-if="data" class="sort">
    <h3 class="sort_title t-color">{{ data.title }}</h3>
    <el-rate v-model="rate" size="large" allow-half class="t-color" />
    <div class="sort_cell">
      <h6 class="sort_cell_title t-color">Author:</h6>
      <div class="sort_cell_value">{{ data.author_name }}</div>
    </div>
    <div class="sort_cell">
      <h6 class="sort_cell_title t-color">CreatTime:</h6>
      <div class="sort_cell_value">{{ formatDate(data.pub_time) }}</div>
    </div>
    <div class="sort_cell">
      <h6 class="sort_cell_title t-color">Cate:</h6>
      <div class="sort_cell_value">{{ data.cate?.name }}</div>
    </div>
    <div v-if="data.tags.length" class="sort_tags">
      <h6 class="sort_tags_title t-color">Tags</h6>
      <ul>
        <li v-for="(tag, index) in data.tags" :key="index">{{ tag }}</li>
      </ul>
    </div>
    <div class="sort_des">
      <h6 class="sort_des_title">Description</h6>
      <ul>
        <li>
          <!-- <i></i> -->
          {{ data.introduce ? data.introduce : '--' }}
        </li>
      </ul>
    </div>
    <div class="sort_content">
      <h6 class="sort_content_title">Content</h6>
      <EchoTinymce :data="data.content"></EchoTinymce>
    </div>
    <v-btn class="sort_btn" @click="handleEdit">Edit Article</v-btn>
  </div>
</template>

<script lang="ts">
export default {
  name: 'InfoSort',
};
</script>

<script lang="ts" setup>
import { ref, toRefs } from 'vue';
import { useRouter } from 'vue-router';

import EchoTinymce from '@/components/tinymce/EchoTinymce.vue';

import type { ArticleInt } from '@/types/article';
import formatDate from '@/util/formatDate';

const props = defineProps({
  data: {
    type: Object as () => ArticleInt | null,
    default: null,
  },
});
const router = useRouter();
const { data } = toRefs(props);
const rate = ref(1);

const handleEdit = () => {
  const query = {
    id: data.value?._id,
  };
  router.push({
    path: '/newArticle',
    query,
  });
};
</script>

<style lang="less" scoped>
.sort {
  &_title {
    text-align: justify;
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
  &_cell {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1rem;
    line-height: 1.625;
    margin-bottom: 0.8rem;
    &_title {
      font-family: Roboto, Helvetica, Arial, sans-serif;
      letter-spacing: 0.0075em;
      font-weight: 600;
    }
    &_value {
      letter-spacing: 0.01071em;
      color: rgb(123, 128, 154);
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
        text-align: justify;
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
      margin-bottom: 0.5rem;
      margin-left: 4px;
      background: transparent;
    }
    ul {
      li {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        align-items: center;
        font-family: Roboto, Helvetica, Arial, sans-serif;
        font-size: 1rem;
        line-height: 1.6;
        text-align: justify;
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
      margin-top: 0.8rem;
      margin-bottom: 0.8rem;
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
