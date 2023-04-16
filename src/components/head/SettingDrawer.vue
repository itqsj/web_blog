<template>
  <div class="drawer">
    <div class="line"></div>
    <h4 class="drawer_title">Sidenav Type</h4>
    <p class="drawer_des">Choose between different sidenav types.</p>
    <div class="drawer_select">
      <div class="t-background t-boxshadow">Dark</div>
      <div class="t-background t-boxshadow">Transparent</div>
      <div class="t-background t-boxshadow">White</div>
    </div>
    <div class="line"></div>
    <div class="drawer_switch">
      <h4 class="drawer_title">Navbar Fixed</h4>
      <el-switch v-model="sidenav" />
    </div>
    <div class="line"></div>
    <div class="drawer_switch">
      <h4 class="drawer_title">Sidenav Mini</h4>
      <el-switch v-model="sidenav" />
    </div>
    <div class="line"></div>
    <div class="drawer_switch">
      <h4 class="drawer_title">Light / Dark</h4>
      <el-switch v-model="themeSwitch" @change="themeChange" />
    </div>
    <div class="line"></div>
    <div class="drawer_close">
      <el-button type="primary">Close</el-button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SettingDrawer',
};
</script>

<script lang="ts" setup>
import { ref } from 'vue';

import { toggleDark } from '@/composables';

const sidenav = ref(false);
const themeSwitch = ref(false);

const themeChange = () => {
  toggleDark();
};
</script>

<style lang="less" scoped>
.drawer {
  font-size: 16px;
  &_des {
    font-size: 14px;
    color: #7b809a;
    margin-top: 8px;
  }

  &_select {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    div {
      padding: 9px 20px;
      box-shadow: rgb(52 71 103 / 15%) 0rem 0.1875rem 0.1875rem 0rem,
        rgb(52 71 103 / 20%) 0rem 0.1875rem 0.0625rem -0.125rem,
        rgb(52 71 103 / 15%) 0rem 0.0625rem 0.3125rem 0rem;
      height: 40px;
      box-sizing: border-box;
      border-radius: 8px;
      cursor: pointer;
    }
  }
  &_switch {
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
  }
  &_close {
    .el-button {
      width: 100%;
      height: 37px;
      font-weight: 700;
      background-color: rgb(26, 115, 232);
      color: rgb(255, 255, 255);
      box-shadow: rgb(26 115 232 / 15%) 0rem 0.1875rem 0.1875rem 0rem,
        rgb(26 115 232 / 20%) 0rem 0.1875rem 0.0625rem -0.125rem,
        rgb(26 115 232 / 15%) 0rem 0.0625rem 0.3125rem 0rem;
    }
  }
}

.el-switch {
  transform: scale(0.9);
  :deep(.el-switch__action) {
    background-color: rgb(255, 255, 255);
    box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem,
      rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;
    border: 0.0625rem solid rgb(206, 212, 218);
    color: var(--el-switch-off-color);
    transform: scale(1.6);
  }
}
</style>
