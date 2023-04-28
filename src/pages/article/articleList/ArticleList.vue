<template>
  <div class="container">
    <el-affix :offset="105">
      <v-expand-x-transition>
        <div v-show="showFilter" class="container_filter">
          <FiltersForm></FiltersForm>
        </div>
      </v-expand-x-transition>
    </el-affix>

    <div class="container_right">
      <div class="container_right_head">
        <h4 class="t-color">Article List</h4>
        <div>
          <v-btn
            variant="text"
            class="t-color"
            @click="showFilter = !showFilter"
          >
            <el-icon style="margin-right: 5px"><Filter /></el-icon>
            Filters
          </v-btn>
          <v-btn
            variant="text"
            class="t-color"
            @click="showFilter = !showFilter"
          >
            NEW
          </v-btn>
        </div>
      </div>
      <div class="container_right_list">
        <waterfall ref="waterfallref" style="width: 100%">
          <ArticleItem
            v-for="(item, index) in list"
            :key="index"
            :data="item"
            @del="articleDel"
          ></ArticleItem>
        </waterfall>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ArticleList',
};
</script>
<script lang="ts" setup>
import { ref, onBeforeMount, nextTick } from 'vue';
import ArticleItem from '../components/ArticleItem.vue';
import FiltersForm from './FiltersForm.vue';
import waterfall from '@/components/waterfall/waterfall.vue';

import { articleList } from '@/api/api_article';
import type { ArticleInt } from '@/types/article';

const showFilter = ref(true);
const list = ref<ArticleInt[]>([]);
const waterfallref = ref();

onBeforeMount(() => {
  getList();
});

const imgLoad = () => {
  waterfallref.value.setPosition();
};

const articleDel = (id: string) => {
  list.value = list.value.filter((item) => item._id !== id);
};

const getList = async () => {
  const params = {
    page: 1,
    pageSize: 10,
  };

  const { code, data } = await articleList(params);

  if (code === 200) {
    list.value = data.list;
    nextTick(() => {
      imgLoad();
    });
  }
};
</script>

<style lang="less" scoped>
.container {
  margin: 1rem;
  display: flex;
  justify-content: space-between;
  // gap: 1.5rem;
  margin-top: 1.75rem;
  div {
    border-radius: 0.5rem;
  }
  &_filter {
    height: 80vh;
    // padding: 1rem;
  }
  &_right {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    flex: 1;
    width: 100%;
    &_list {
      overflow: hidden;
      width: 100%;
      padding: 4rem 0 1rem;
      box-sizing: border-box;
      // height: 300px;
    }
    &_head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      h4 {
        font-size: 2.0833rem;
      }
    }
  }
}
</style>
