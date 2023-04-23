<template>
  <div class="table">
    <CommonTable class="table_body" :data="regionList" style="width: 100%">
      <el-table-column label="Region" prop="ename">
        <template #default="{ row }">
          <div class="item">
            <h4 class="item_head">Region：</h4>
            <p class="item_txt t-color">{{ row.name }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Users" prop="value">
        <template #default="{ row }">
          <div class="item">
            <h4 class="item_head">Users：</h4>
            <p class="item_txt">{{ row.value }}</p>
          </div>
        </template>
      </el-table-column>
    </CommonTable>
  </div>
</template>

<script lang="ts">
export default {
  name: 'RegionEcharts',
};
</script>

<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue';

import CommonTable from '@/components/table/CommonTable.vue';

import { RegionAnalyticsInt } from '@/types/analytics';

import { RegionInt } from '@/types/analytics';

const regionList = ref<RegionInt[]>([
  { name: '南海诸岛' },
  { ename: 'beijing', name: '北京' },
  { ename: 'tianjin', name: '天津' },
  { ename: 'shanghai', name: '上海' },
  { ename: 'chongqing', name: '重庆' },
  { ename: 'hebei', name: '河北' },
  { ename: 'henan', name: '河南' },
  { ename: 'yunnan', name: '云南' },
  { ename: 'liaoning', name: '辽宁' },
  { ename: 'heilongjiang', name: '黑龙江' },
  { ename: 'hunan', name: '湖南' },
  { ename: 'anhui', name: '安徽' },
  { ename: 'shandong', name: '山东' },
  { ename: 'xinjiang', name: '新疆' },
  { ename: 'jiangsu', name: '江苏' },
  { ename: 'zhejiang', name: '浙江' },
  { ename: 'jiangxi', name: '江西' },
  { ename: 'hubei', name: '湖北' },
  { ename: 'guangxi', name: '广西' },
  { ename: 'gansu', name: '甘肃' },
  { ename: 'shanxi', name: '山西' },
  { ename: 'neimenggu', name: '内蒙古' },
  { ename: 'shanxi1', name: '陕西' },
  { ename: 'jilin', name: '吉林' },
  { ename: 'fujian', name: '福建' },
  { ename: 'guizhou', name: '贵州' },
  { ename: 'guangdong', name: '广东' },
  { ename: 'qinghai', name: '青海' },
  { ename: 'xizang', name: '西藏' },
  { ename: 'sichuan', name: '四川' },
  { ename: 'ningxia', name: '宁夏' },
  { ename: 'hainan', name: '海南' },
  { name: '台湾' },
  { ename: 'xianggang', name: '香港' },
  { ename: 'aomen', name: '澳门' },
]);

const composeValue = () => {
  for (let i = 0; i < regionList.value.length; i++) {
    regionList.value[i].value = Math.ceil(Math.random() * 1000 - 1);
  }
};

const tableData = ref<RegionAnalyticsInt[]>([
  {
    region: 'GuangXi',
    users: 10,
  },
]);

onBeforeMount(() => {
  composeValue();
});
</script>

<style lang="less" scoped>
.table {
  overflow: auto;
  height: 100%;
  :deep(.ctable) {
    padding-top: 0px;
  }
  :deep(thead) {
    display: none;
  }
  &_body {
    // padding-top: 1.25rem;
    .item {
      display: flex;
      flex-direction: column;
      gap: 0.3125rem;
      &_head {
        font-family: Roboto, Helvetica, Arial, sans-serif;
        font-size: 0.75rem;
        line-height: 1.25;
        letter-spacing: 0.03333em;
        text-transform: capitalize;
        color: rgb(123, 128, 154);
        font-weight: 600;
      }
      &_txt {
        font-family: Roboto, Helvetica, Arial, sans-serif;
        font-size: 0.875rem;
        line-height: 1.5;
        letter-spacing: 0.02857em;
        text-transform: capitalize;
      }
    }
  }
  :deep(.el-table__cell) {
    background-color: transparent;
  }
}
</style>
