<template>
  <div>
    <div class="page">
      <commonTabs
        v-model:model-value="activeTab"
        class="page_tab"
        :tabs="tabs"
      />
      <div class="page_body">
        <el-affix :offset="105">
          <div class="page_body_left t-background t-boxshadow t-clolr">
            <SettingNavigat @navigat="navigat" />
          </div>
        </el-affix>

        <div class="page_body_right">
          <div class="page_body_right_item t-background t-boxshadow">
            <ProfileSort ref="profileSort" :user-info="userInfo" />
          </div>
          <div class="page_body_right_item t-background t-boxshadow">
            <h3 class="font-20 t-color">Basic Info</h3>
            <BasicInfo ref="basicInfo" :user-info="userInfo" />
          </div>
          <div class="page_body_right_item t-background t-boxshadow">
            <h3 class="font-20 t-color">Change Password</h3>
            <ChangePwd ref="changePwd" />
          </div>
          <div class="page_body_right_item t-background t-boxshadow">
            <h3 class="font-20 t-color">Sessions</h3>
            <SessionsSort ref="sessionsSort" />
          </div>
          <div class="page_body_right_item t-background t-boxshadow">
            <AccountDel ref="accountDel" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SettingsPage',
};
</script>
<script lang="ts" setup>
import { ref, toRefs } from 'vue';

import commonTabs from '@/components/tabs/commonTabs.vue';
import SettingNavigat from './SettingNavigat.vue';
import ProfileSort from './ProfileSort.vue';
import BasicInfo from './BasicInfo.vue';
import ChangePwd from './ChangePwd.vue';
import AccountDel from './AccountDel.vue';
import SessionsSort from './SessionsSort.vue';

import { useUserStore } from '@/store/user';

const { userInfo } = toRefs(useUserStore());

const tabs = [
  {
    label: 'App',
    value: 1,
  },
  {
    label: 'Message',
    value: 2,
  },
  {
    label: 'Setting',
    value: 3,
  },
];
const profileSort = ref();
const basicInfo = ref();
const changePwd = ref();
const sessionsSort = ref();
const accountDel = ref();

const navigat = (name: string) => {
  switch (name) {
    case 'profileSort':
      profileSort.value.$el.scrollIntoView({
        behavior: 'smooth', // 定义动画过渡效果， "auto"或 "smooth" 之一。默认为 "auto"
        block: 'start', // 定义垂直方向的对齐， "start", "center", "end", 或 "nearest"之一。默认为 "start"
        // inline: 'nearest' // 定义水平方向的对齐， "start", "center", "end", 或 "nearest"之一。默认为 "nearest"
      });
      break;
    case 'basicInfo':
      basicInfo.value.$el.scrollIntoView({
        behavior: 'smooth', // 定义动画过渡效果， "auto"或 "smooth" 之一。默认为 "auto"
        block: 'start', // 定义垂直方向的对齐， "start", "center", "end", 或 "nearest"之一。默认为 "start"
        // inline: 'nearest' // 定义水平方向的对齐， "start", "center", "end", 或 "nearest"之一。默认为 "nearest"
      });
      break;
    case 'changePwd':
      changePwd.value.$el.scrollIntoView({
        behavior: 'smooth', // 定义动画过渡效果， "auto"或 "smooth" 之一。默认为 "auto"
        block: 'start', // 定义垂直方向的对齐， "start", "center", "end", 或 "nearest"之一。默认为 "start"
        // inline: 'nearest' // 定义水平方向的对齐， "start", "center", "end", 或 "nearest"之一。默认为 "nearest"
      });
      break;
    case 'sessionsSort':
      sessionsSort.value.$el.scrollIntoView({
        behavior: 'smooth', // 定义动画过渡效果， "auto"或 "smooth" 之一。默认为 "auto"
        block: 'start', // 定义垂直方向的对齐， "start", "center", "end", 或 "nearest"之一。默认为 "start"
        // inline: 'nearest' // 定义水平方向的对齐， "start", "center", "end", 或 "nearest"之一。默认为 "nearest"
      });
      break;
    case 'accountDel':
      accountDel.value.$el.scrollIntoView({
        behavior: 'smooth', // 定义动画过渡效果， "auto"或 "smooth" 之一。默认为 "auto"
        block: 'start', // 定义垂直方向的对齐， "start", "center", "end", 或 "nearest"之一。默认为 "start"
        // inline: 'nearest' // 定义水平方向的对齐， "start", "center", "end", 或 "nearest"之一。默认为 "nearest"
      });
      break;
  }
};
const activeTab = ref(1);
</script>

<style lang="less" scoped>
.page {
  margin: 1rem;
  &_body {
    display: flex;
    justify-content: space-between;
    gap: 1.5rem;
    margin-top: 1.75rem;
    div {
      border-radius: 0.5rem;
    }
    &_left {
      width: 17.5rem;
      padding: 1rem;
      box-sizing: border-box;
    }
    &_right {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      flex: 1;
      &_item {
        padding: 1rem;
        box-sizing: border-box;
        // height: 300px;
      }
    }
  }
}

@media screen and (max-width: 900px) {
  .page {
    margin: 0;
    &_tab {
      display: none;
    }
    &_body {
      gap: 0;

      .el-affix {
        display: none;
      }
    }
  }
}
</style>
