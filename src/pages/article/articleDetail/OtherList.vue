<template>
  <div class="panel">
    <h3 class="panel_title t-color">Other Article</h3>
    <div class="panel_table">
      <CommonTable
        class="table"
        :data="tableData"
        :default-sort="{ prop: 'date', order: 'descending' }"
        style="width: 100%"
      >
        <el-table-column label="Article">
          <template #default="{ row }">
            <div class="panel_table_arcticle">
              <img
                src="https://demos.creative-tim.com/otis-admin-pro/static/media/black-chair.ae677f8f033997d585d0.jpeg"
                alt=""
              />
              <span>{{ row.title }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="REVIEW">
          <template #default="{ row }">
            <el-rate
              v-model="row.review"
              size="large"
              allow-half
              class="t-color"
              disabled
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="createdAt"
          label="Date"
          :formatter="formatterDate"
          sortable
        />
      </CommonTable>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'OtherList',
};
</script>

<script lang="ts" setup>
import { ref } from 'vue';

import CommonTable from '@/components/table/CommonTable.vue';

import type { TableColumnCtx } from 'element-plus';
import formatDate from '@/util/formatDate';
import { ArticleInt } from '@/types/article';

const tableData = ref<ArticleInt[]>([
  {
    _id: '230019',
    title: 'Christopher Knight Home',
    createdAt: Date.now().toString(),
    review: 1,
    cover_img: '',
  },
  {
    _id: '23001',
    title: 'Christopher Knight Home',
    createdAt: Date.now().toString(),
    review: 1,
    cover_img: '',
  },
  {
    _id: '23019',
    title: 'hristopher Knight Home',
    createdAt: Date.now().toString(),
    review: 1,
    cover_img: '',
  },
  {
    _id: '2301',
    title: 'Christopher Knight Home',
    createdAt: Date.now().toString(),
    review: 1,
    cover_img: '',
  },
  {
    _id: '30019',
    title: 'Christopher Knight Home',
    createdAt: Date.now().toString(),
    review: 1,
    cover_img: '',
  },
  {
    _id: '6',
    title: 'Christopher Knight Home',
    createdAt: Date.now().toString(),
    review: 1,
    cover_img: '',
  },
  {
    _id: '1',
    title: 'Christopher Knight Home',
    createdAt: Date.now().toString(),
    review: 1,
    cover_img: '',
  },
  {
    _id: '.',
    title: 'Christopher Knight Home',
    createdAt: Date.now().toString(),
    review: 1,
    cover_img: '',
  },
]);

const formatterDate = (row: ArticleInt, column: TableColumnCtx<ArticleInt>) => {
  const date = parseInt(row.createdAt);
  return formatDate(date);
};
</script>

<style lang="less" scoped>
.panel {
  &_title {
    font-size: 1.25rem;
    line-height: 1.375;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    color: rgb(52, 71, 103);
    font-weight: 600;
  }
  &_table {
    // margin-top: 1rem;
    .table {
      padding-top: 1.25rem;
    }
    :deep(.el-table__cell) {
      background-color: transparent;
    }
    &_arcticle {
      display: flex;
      align-items: center;
      gap: 1rem;
      img {
        width: 3rem;
        border-radius: 50%;
      }
      span {
        font-family: Roboto, Helvetica, Arial, sans-serif;
        font-size: 0.875rem;
        line-height: 1.5;
        letter-spacing: 0.02857em;
        color: rgb(52, 71, 103);
        font-weight: 600;
      }
    }
  }
}
</style>
