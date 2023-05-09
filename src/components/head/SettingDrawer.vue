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
      <CommonSwitch v-model="sidenav" />
    </div>
    <div class="line"></div>
    <div class="drawer_switch">
      <h4 class="drawer_title">Sidenav Mini</h4>
      <CommonSwitch v-model="sidenav" />
    </div>
    <div class="line"></div>
    <div class="drawer_switch">
      <h4 class="drawer_title">Light / Dark</h4>
      <CommonSwitch v-model="themeSwitch" @change="themeChange" />
    </div>
    <div class="line"></div>
    <div class="drawer_btn">
      <v-btn class="drawer_btn_close" type="primary" @click="emit('close')"
        >Close</v-btn
      >
    </div>
    <div class="line"></div>
    <div class="drawer_btn">
      <delConfirm
        v-model="showLoginOutConfirm"
        persistent
        width="360"
        title="LOGINOUT"
        text="This operation will log out. Do you want to continue?"
      >
        <template #activator="{ props }">
          <v-btn v-bind="props" class="drawer_btn_loginout" type="primary"
            >loginout</v-btn
          >
        </template>
        <template #actions>
          <v-btn
            variant="text"
            color="teal-accent-4"
            @click="showLoginOutConfirm = false"
            >CANCEL</v-btn
          >
          <v-btn variant="text" color="teal-accent-4" @click="loginOut"
            >COMFIRM</v-btn
          >
        </template>
      </delConfirm>
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

import CommonSwitch from '@/components/switch/CommonSwitch.vue';
import delConfirm from '@/components/delConfirm/delConfirm.vue';

import { toggleDark } from '@/composables';
import { useThemeStore } from '@/store/theme';
import { useUserStore } from '@/store/user';
import { useTheme } from 'vuetify';

const emit = defineEmits(['close']);
const themeStore = useThemeStore();
const userStore = useUserStore();
const theme = useTheme();
const sidenav = ref(false);
const themeSwitch = ref(false);
const showLoginOutConfirm = ref(false);

const themeChange = () => {
  toggleDark();
  toggleTheme();
  themeStore.changeCodeLink();
};

const toggleTheme = () =>
  (theme.global.name.value = theme.global.current.value.dark
    ? 'light'
    : 'dark');

const loginOut = () => {
  showLoginOutConfirm.value = false;
  userStore.loginOut();
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
  &_btn {
    &_close {
      background-color: rgb(26, 115, 232);
      box-shadow: rgb(26 115 232 / 15%) 0rem 0.1875rem 0.1875rem 0rem,
        rgb(26 115 232 / 20%) 0rem 0.1875rem 0.0625rem -0.125rem,
        rgb(26 115 232 / 15%) 0rem 0.0625rem 0.3125rem 0rem;
    }
    &_loginout {
      background-image: linear-gradient(195deg, #ef5350, #e53935);
      box-shadow: rgb(244 67 53 / 15%) 0rem 0.1875rem 0.1875rem 0rem,
        rgb(244 67 53 / 20%) 0rem 0.1875rem 0.0625rem -0.125rem,
        rgb(244 67 53 / 15%) 0rem 0.0625rem 0.3125rem 0rem;
    }
    .v-btn {
      width: 100%;
      height: 37px;
      font-weight: 700;
      color: rgb(255, 255, 255);
    }
  }
}
</style>
