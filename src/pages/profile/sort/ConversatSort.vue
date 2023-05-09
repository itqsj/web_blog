<template>
  <div class="sort">
    <h3>My Team</h3>
    <ul v-if="userInfo.team">
      <li class="sort_li">
        <span class="sort_li_left t-color">id: </span>
        <span class="sort_li_right"> {{ userInfo.team._id }}</span>
      </li>
      <li class="sort_li">
        <span class="sort_li_left t-color">name: </span>
        <span class="sort_li_right"> {{ userInfo.team.name }}</span>
      </li>
      <li class="sort_li">
        <span class="sort_li_left t-color">Team Members: </span>
      </li>
      <li v-for="item in members" :key="item._id" class="item">
        <div class="item_left">
          <CommonImg class="item_left_avatar" :src="item.user_pic" alt="" />
          <div class="item_left_info">
            <h5 class="t-color">
              {{ item.username }}
              <h5 v-if="item._id === userInfo._id" style="display: inline">
                (我)
              </h5>
            </h5>
            <span class="ellipsis-2">{{ item.introduction }}</span>
          </div>
        </div>
        <!-- <el-button>reply</el-button> -->
      </li>
    </ul>
    <div v-else class="sort_empty">你当前还没加入团队喔~</div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ConversatSort',
};
</script>
<script lang="ts" setup>
import { onMounted, ref, toRefs } from 'vue';

import CommonImg from '@/components/img/CommonImg.vue';

import type { UserInfoInt } from '@/types/user';
import type { ParamsListInt } from '@/types/index';
import type { User } from '@/types/user';
import { userList } from '@/api/api_user';

const props = defineProps({
  userInfo: {
    type: Object as () => UserInfoInt,
    default: null,
  },
});
const members = ref<User[]>([]);

onMounted(() => {
  getUsers();
});

const getUsers = async () => {
  if (!userInfo.value.team) {
    return;
  }
  const params: ParamsListInt = {
    page: 1,
    pageSize: 50,
  };
  const res = await userList(params);

  if (res.code === 200) {
    members.value = res.data.users || [];
  }
};

const { userInfo } = toRefs(props);
</script>

<style lang="less" scoped>
.sort {
  padding: 0 1rem 0.5rem;
  box-sizing: border-box;
  h3 {
    font-family: Roboto, Helvetica, Arial, sans-serif;
    letter-spacing: 0.0075em;
    text-transform: capitalize;
    font-size: 1.125rem;
  }
  &_empty {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 12.5rem;
    font-size: 0.875rem;
    color: rgba(0, 0, 0, 0.5);
  }
  &_li {
    font-size: 0.875rem;
    line-height: 1.5;
    letter-spacing: 0.02857em;
    padding: 0.5rem 0;
    &_left {
      // color: rgb(52, 71, 103);
      font-weight: 700;
    }
    &_right {
      margin-left: 0.5rem;
      color: rgb(123, 128, 154);
    }
  }
  ul {
    margin-top: 1rem;
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 0;
      margin-bottom: 0.5rem;
      &_left {
        display: flex;
        align-items: center;
        &_avatar {
          height: 3rem;
          width: 3rem;
          border-radius: 50%;
        }
        &_info {
          flex: 1;
          margin-left: 0.625rem;
          h5 {
            font-size: 0.875rem;
            line-height: 1.5;
            letter-spacing: 0.02857em;
            // color: rgb(52, 71, 103);
            font-weight: 600;
          }
          span {
            // display: inline-block;
            font-size: 0.75rem;
            font-weight: 300;
            line-height: 1.25;
            letter-spacing: 0.03333em;
            color: rgb(123, 128, 154);
            margin-top: 0.2rem;
          }
        }
      }
      .el-button {
        border: none;
      }
    }
  }
}
</style>
