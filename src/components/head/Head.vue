<template>
  <div class="head">
    <div class="head_left">
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }"
          ><el-icon><HomeFilled /></el-icon
        ></el-breadcrumb-item>
        <el-breadcrumb-item>Home</el-breadcrumb-item>
        <el-breadcrumb-item> {{ title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <h3 class="t-color">{{ title }}</h3>
    </div>
    <div class="head_center">
      <el-icon v-show="!isShowAside" @click="updateShowAside(true)"
        ><Expand
      /></el-icon>
      <el-icon v-show="isShowAside" @click="updateShowAside(false)"
        ><Fold
      /></el-icon>
    </div>
    <div class="head_right">
      <!-- <el-input
        v-model="search"
        class="w-50 m-2"
        size="large"
        placeholder="Please Input"
      /> -->
      <el-icon @click="router.push('/profile')"><Avatar /></el-icon>
      <el-icon @click="settingDrawer = true"><Setting /></el-icon>
      <!-- <el-badge :value="3" class="item">
        <el-icon><Bell /></el-icon>
      </el-badge> -->
    </div>

    <el-drawer
      v-model="settingDrawer"
      title="UI Configurator"
      :modal="false"
      size="360px"
      :class="{
        't-color': true,
        't-background': isDark,
        't-boxshadow': true,
      }"
    >
      <SettingDrawer @close="settingDrawer = false"></SettingDrawer>
    </el-drawer>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HeaderPage',
};
</script>

<script lang="ts" setup>
import { ref, watch, toRefs, reactive, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import SettingDrawer from '@/components/head/SettingDrawer.vue';

import { useThemeStore } from '@/store/theme';
import { useCommonStore } from '@/store/common';
import { isDark } from '@/composables';

const { getThemStyle } = toRefs(useThemeStore());
const { updateShowAside, isShowAside } = toRefs(useCommonStore());
const route = useRoute();
const router = useRouter();
const props = defineProps({
  isFixed: {
    type: Boolean,
    default: false,
  },
});
const title = ref('');
const styleObj = reactive({
  fixed: {
    background: getThemStyle.value.background,
    boxShadow: getThemStyle.value.boxShadow,
  },
  noFixed: {
    background: 'transparent',
    boxShadow: '',
  },
});
const style = ref(styleObj.fixed);
const search = ref('');
const settingDrawer = ref(false);

// onBeforeRouteUpdate((to, from, next) => {
//   console.log(to, from, next);
//   next();
// });

watch(
  () => route.path,
  () => {
    title.value = route.meta.title as string;
  },
  {
    immediate: true,
  },
);

watchEffect(() => {
  styleObj.fixed = { ...getThemStyle.value };
  style.value = props.isFixed ? styleObj.fixed : styleObj.noFixed;

  if (props.isFixed && !isDark.value) {
    styleObj.fixed.background = '#ffffff';
  }
});
</script>

<style lang="less" scoped>
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 75px;
  padding: 0 16px;
  background: v-bind('style.background');
  box-shadow: v-bind('style.boxShadow');
  // backdrop-filter: saturate(200%) blur(30px);
  transition: all 0.5s;
  border-radius: 8px;
  box-sizing: border-box;
  &_left {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .el-breadcrumb__item {
      :deep(.el-breadcrumb__inner) {
        font-size: 14px;
        cursor: pointer;
      }
    }
    :deep(.el-icon) {
      svg {
        width: 14px;
        height: 14px;
      }
    }
    h3 {
      font-size: 16px;
    }
  }
  &_center {
    flex: 1;
    .el-icon {
      font-size: 18px;
      margin-left: 2rem;
      color: #7b809a;
      cursor: pointer;
    }
  }
  &_right {
    display: flex;
    align-items: center;
    gap: 16px;
    .el-icon {
      font-size: 18px;
      color: #7b809a;
    }
    :deep(.el-input__wrapper) {
      height: 44px;
      background: v-bind('style.background');
    }
  }

  :deep(.el-drawer) {
    .el-drawer__header {
      font-size: 20px;
      font-weight: 600;
      color: inherit;
    }
    .el-drawer__body {
      padding: 0 20px;
    }
  }
}

@media screen and (max-width: 600px) {
  .head_center {
    display: none;
  }
}
</style>
