<template>
  <div>
    <div class="page">
      <div class="page_panel t-color t-background t-boxshadow">
        <CommonTable
          class="table"
          :data="tableData"
          :default-sort="{ prop: 'date', order: 'descending' }"
          style="width: 100%"
        >
          <template #head>
            <div class="table_thead">
              <h3 class="t-color">User Datatable</h3>
              <p class="t-color">
                A userList, dependency-free javascript HTML table.
              </p>
              <div class="table_thead_dropdown">
                <el-dropdown trigger="click">
                  <el-button>
                    <span class="table_thead_dropdown_span"> 132 </span
                    ><el-icon class="el-icon--right"><arrow-down /></el-icon>
                  </el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>Action 1</el-dropdown-item>
                      <el-dropdown-item>Action 2</el-dropdown-item>
                      <el-dropdown-item>Action 3</el-dropdown-item>
                      <el-dropdown-item>Action 4</el-dropdown-item>
                      <el-dropdown-item>Action 5</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
                <span>entries per page</span>
              </div>
            </div>
          </template>
          <el-table-column prop="date" label="Date" sortable />
          <el-table-column prop="name" label="Name" />
          <el-table-column
            prop="address"
            label="Address"
            :formatter="formatter"
          />
        </CommonTable>
        <div class="page_panel_footer">
          <p class="t-color page_panel_footer_txt">
            Showing 1 to 10 of 57 entries
          </p>
          <CommonPagination
            background
            layout="prev, pager, next"
            :total="1000"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'UserList',
};
</script>
<script lang="ts" setup>
import CommonTable from '@/components/table/CommonTable.vue';
import CommonPagination from '@/components/pagination/CommonPagination.vue';

import type { TableColumnCtx } from 'element-plus';

interface User {
  date: string;
  name: string;
  address: string;
}

const formatter = (row: User, column: TableColumnCtx<User>) => {
  return row.address;
};

const tableData: User[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
];
</script>

<style lang="less" scoped>
.page {
  &_panel {
    border-radius: 0.5rem;
    margin-top: 3rem;
    padding: 0 1.5rem 1.5rem;
    &_footer {
      display: flex;
      justify-content: space-between;
      &_txt {
        font-size: 0.875rem;
      }
    }
  }
  .table {
    &_thead {
      //   padding: 0 1.5rem;
      box-sizing: border-box;
      &_dropdown {
        display: flex;
        align-items: center;
        margin: 3rem 0 0;
        &_span {
          margin-right: 1.5rem;
        }
        span {
          font-size: 0.75rem;
          margin-left: 0.4375rem;
        }
      }
      .el-button {
        padding: 0.5rem;
      }
      h3 {
        font-size: 1.25rem;
      }
      p {
        font-size: 0.875rem;
        margin-top: 0.5rem;
      }
    }
  }
}
</style>
