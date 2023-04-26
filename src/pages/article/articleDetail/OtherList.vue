<template>
  <div class="panel">
    <h3 class="panel_title t-color">Other Article</h3>
    <div class="panel_table">
      <CommonTable
        class="table"
        :data="list"
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
        <el-table-column label="Date" :formatter="formatterDate" sortable />
        <el-table-column label="State" :formatter="formatterState" sortable />
        <el-table-column sortable>
          <template #default="{ row }">
            <span class="table_detail" @click="goDetail(row)">详情</span>
          </template>
        </el-table-column>
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
import { ref, toRefs } from 'vue';
import { useRouter } from 'vue-router';

import CommonTable from '@/components/table/CommonTable.vue';

import type { TableColumnCtx } from 'element-plus';
import formatDate from '@/util/formatDate';
import type { ArticleInt } from '@/types/article';

const props = defineProps({
  list: {
    type: Array as () => ArticleInt[],
    default: () => [],
  },
});
const emit = defineEmits(['refresh']);
const router = useRouter();
const { list } = toRefs(props);

const formatterDate = (row: ArticleInt, column: TableColumnCtx<ArticleInt>) => {
  return formatDate(row.pub_time);
};

const formatterState = (
  row: ArticleInt,
  column: TableColumnCtx<ArticleInt>,
) => {
  switch (row.state) {
    case '1':
      return '已上线';
    case '2':
      return '草稿';
    case '3':
      return '已下线';
    default:
      return '--';
  }
};

const goDetail = (row: ArticleInt) => {
  const query = {
    id: row._id,
  };
  router.replace({
    path: '/articleDetail',
    query,
  });
  emit('refresh');
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
      &_detail {
        color: #3f94ee;
        cursor: pointer;
      }
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
