<template>
  <div v-infinite-scroll="loadMore" class="container">
    <el-affix :offset="105">
      <v-expand-x-transition>
        <div v-show="showFilter" class="container_filter">
          <FiltersForm :loading="loading" @change="filtersChange"></FiltersForm>
        </div>
      </v-expand-x-transition>
    </el-affix>

    <div class="container_right">
      <div class="container_right_head">
        <h4 class="t-color">Article List</h4>
        <div>
          <v-btn variant="text" class="t-color" @click="handleShowFilter">
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
            v-for="item in list"
            :key="item._id"
            :data="item"
            @del="articleDel"
          ></ArticleItem>
        </waterfall>
        <p v-if="loading" class="container_right_list_load t-color">
          Loading...
        </p>
        <p
          v-else-if="!loading && finish"
          class="container_right_list_load t-color"
        >
          No more
        </p>
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
import { ref, onBeforeMount, nextTick, onBeforeUnmount } from 'vue';
import ArticleItem from '../components/ArticleItem.vue';
import FiltersForm from './FiltersForm.vue';
import waterfall from '@/components/waterfall/waterfall.vue';

import { articleList } from '@/api/api_article';
import { useDefer } from '@/hook/useDefer';
import type {
  ArticleInt,
  ArticleFilterInt,
  ArticleListParams,
} from '@/types/article';

const showFilter = ref(true);
// const list = ref<ArticleInt[]>([]);
const waterfallref = ref();
const loading = ref(false);
const finish = ref(false);
const { list, addToDefer, resetList } = useDefer<ArticleInt>();
let filterData: ArticleFilterInt = {
  startTime: null,
  endTime: null,
  keyWord: '',
  timeRang: [],
  cateIds: [],
};
let page = 1;
let count = 0;

onBeforeMount(() => {
  window.addEventListener('resize', reseize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', reseize);
});

const reseize = () => {
  waterfallref.value.setWarpWith();
  imgLoad();
};

const filtersChange = (data: ArticleFilterInt) => {
  filterData = data;
  page = 1;
  finish.value = false;
  getList();
};

const loadMore = () => {
  if (loading.value || finish.value) {
    return;
  }
  getList();
};

const imgLoad = () => {
  nextTick(() => {
    waterfallref.value.setPosition();
  });
};

const handleShowFilter = () => {
  showFilter.value = !showFilter.value;
  setTimeout(() => {
    reseize();
  }, 300);
};

const articleDel = (id: string) => {
  list.value = list.value.filter((item) => item._id !== id);
};

const getList = async () => {
  loading.value = true;
  const params: ArticleListParams = {
    page,
    pageSize: 10,
  };
  if (filterData.keyWord) {
    params.keyWord = filterData.keyWord;
  }
  if (filterData.timeRang?.length) {
    params.timeRang = filterData.timeRang;
  }
  if (filterData.cateIds.length) {
    params.cateIds = filterData.cateIds;
  }

  const { code, data } = await articleList(params);

  if (code === 200) {
    count = data.count;
    if (page === 1) {
      await resetList(data.list, imgLoad);
    } else {
      await addToDefer(data.list, imgLoad);
    }
    if (count <= list.value.length) {
      finish.value = true;
    }
  }
  page++;
  nextTick(() => {
    loading.value = false;
  });
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
      &_load {
        text-align: center;
      }
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
