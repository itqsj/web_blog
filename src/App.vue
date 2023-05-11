<script setup lang="ts">
import { toRefs } from 'vue';

import { useThemeStore } from '@/store/theme';

const themeStore = useThemeStore();
const { getThemStyle } = toRefs(themeStore);
</script>

<template>
  <router-view v-slot="{ Component }">
    <Transition name="fade" mode="out-in" appear>
      <keep-alive include="LoginPage">
        <component :is="Component" />
      </keep-alive>
    </Transition>
  </router-view>
</template>
<style lang="less">
.t-codebg {
  background-color: v-bind('getThemStyle.codeBg');
}
.t-color {
  color: v-bind('getThemStyle.color');
}
.t-background {
  background: v-bind('getThemStyle.background');
}
.t-boxshadow {
  box-shadow: v-bind('getThemStyle.boxShadow');
}
/* 开始过渡 */
.fade-enter-from {
  opacity: 0;
  position: relative;
  left: -50px;
}
/* 开始过渡了 */
.fade-enter-active {
  transition: all 0.5s ease;
}
/* 过渡完成 */
.fade-enter-to {
  opacity: 1;
  position: relative;
  left: 0;
}
/* 离开的过渡 */
.fade-leave-from {
  opacity: 1;
  position: relative;
  left: 0;
}
/* 离开中过渡 */
.fade-leave-active {
  transition: all 0.3s;
}
/* 离开完成 */
.fade-leave-to {
  opacity: 0;
  position: relative;
  left: -50px;
}
.el-dialog__body {
  padding-bottom: 20px !important;
}
</style>
