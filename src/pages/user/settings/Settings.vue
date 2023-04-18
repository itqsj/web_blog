<template>
  <div>
    <div class="page">
      <commonTabs v-model:model-value="activeTab" :tabs="tabs" />
      <div class="page_body">
        <el-affix :offset="105">
          <div class="page_body_left t-background t-boxshadow t-clolr">
            <SettingNavigat />
          </div>
        </el-affix>

        <div class="page_body_right">
          <div class="page_body_right_item t-background t-boxshadow">
            <ProfileSort />
          </div>
          <div class="page_body_right_item t-background t-boxshadow">
            <h3 class="font-20 t-color">Basic Info</h3>
            <BasicInfo />
          </div>
          <div class="page_body_right_item t-background t-boxshadow">
            <h3 class="font-20 t-color">Change Password</h3>
            <ChangePwd />
          </div>
          <div class="page_body_right_item t-background t-boxshadow">
            <h3 class="font-20 t-color">Sessions</h3>
            <BasicInfo />
          </div>
          <div class="page_body_right_item t-background t-boxshadow">
            <h3 class="font-20 t-color">Delete Account</h3>
            <BasicInfo />
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
import { ref } from 'vue';

import commonTabs from '@/components/tabs/commonTabs.vue';
import SettingNavigat from './SettingNavigat.vue';
import ProfileSort from './ProfileSort.vue';
import BasicInfo from './BasicInfo.vue';
import ChangePwd from './ChangePwd.vue';

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
</style>
