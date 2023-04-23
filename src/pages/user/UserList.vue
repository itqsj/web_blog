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
                <el-dropdown trigger="click" @command="handleCommand">
                  <el-button>
                    <span class="table_thead_dropdown_span">
                      {{ pageSize }} </span
                    ><el-icon class="el-icon--right"><arrow-down /></el-icon>
                  </el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item :command="10">10</el-dropdown-item>
                      <el-dropdown-item :command="15">15</el-dropdown-item>
                      <el-dropdown-item :command="20">20</el-dropdown-item>
                      <el-dropdown-item :command="25">25</el-dropdown-item>
                      <el-dropdown-item :command="30">30</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
                <span>entries per page</span>
              </div>
            </div>
          </template>
          <el-table-column
            prop="createdAt"
            label="Date"
            :formatter="formatterDate"
            sortable
          />
          <el-table-column prop="user_pic" label="Pic" />
          <el-table-column prop="username" label="Name" />
          <el-table-column prop="email" label="Email" />
          <el-table-column prop="introduction" label="Introduction" />
          <el-table-column prop="background" label="Background" />
        </CommonTable>
        <div class="page_panel_footer">
          <p class="t-color page_panel_footer_txt">
            Showing {{ page }} to {{ pageSize }} of {{ count }} entries
          </p>
          <CommonPagination
            v-model:current-page="page"
            v-model:page-size="pageSize"
            background
            layout="prev, pager, next"
            :total="count"
            @current-change="handleCurrentChange"
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
import { onMounted, ref } from 'vue';

import CommonTable from '@/components/table/CommonTable.vue';
import CommonPagination from '@/components/pagination/CommonPagination.vue';

import { userList } from '@/api/api_user';
import { User, UsersDataRes } from '@/types/user';
import { ResInt } from '@/types/index';
import { ParamsInt } from '@/types/index';
import type { TableColumnCtx } from 'element-plus';
import formatDate from '@/util/formatDate';

const page = ref<number>(1);
const pageSize = ref<number>(10);
const count = ref<number>(0);

const formatterDate = (row: User, column: TableColumnCtx<User>) => {
  const date = parseInt(row.createdAt);
  return formatDate(date);
};

const tableData = ref<User[]>([]);

const getUsers = async () => {
  const params: ParamsInt = {
    page: page.value,
    pageSize: pageSize.value,
  };
  const res = (await userList(params)) as ResInt<UsersDataRes>;

  if (res.code === 200) {
    tableData.value = res.data.users || [];
    count.value = res.data.count;
  }
};

const handleCommand = (command: number) => {
  pageSize.value = command;
  getUsers();
};

const handleCurrentChange = (currentPage: number) => {
  page.value = currentPage;
  getUsers();
};

onMounted(() => {
  getUsers();
  console.log(navigator.userAgent);
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log(position);
    },
    (error) => {
      console.log(error);
    },
  );
});
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
      padding-bottom: 1.25rem;
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
