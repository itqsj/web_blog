<template>
  <div class="head">
    <div class="head_left">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }"
          ><el-icon><HomeFilled /></el-icon
        ></el-breadcrumb-item>
        <el-breadcrumb-item>Dashboards</el-breadcrumb-item>
        <el-breadcrumb-item> Analytics</el-breadcrumb-item>
      </el-breadcrumb>
      <h3>Analytics</h3>
    </div>
    <div class="head_center">
      <el-icon v-show="false"><Expand /></el-icon>
      <el-icon><Fold /></el-icon>
    </div>
    <div class="head_right">
      <el-input
        v-model="search"
        class="w-50 m-2"
        size="large"
        placeholder="Please Input"
      />
      <el-icon><Avatar /></el-icon>
      <el-icon><Setting /></el-icon>
      <el-badge :value="3" class="item">
        <el-icon><Bell /></el-icon>
      </el-badge>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HeaderPage',
};
</script>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { ArrowRight } from '@element-plus/icons-vue';

const props = defineProps({
  isFixed: {
    type: Boolean,
    default: false,
  },
});

const styleObj = {
  fixed: {
    background: '#ffffff',
    boxShadow: '32px 32px 64px #d9d9d9, -32px -32px 64px #f0f2f5',
  },
  noFixed: {
    background: '#f0f2f5',
    boxShadow: '',
  },
};
const style = ref(styleObj.fixed);
const search = ref('');

watch(
  () => props.isFixed,
  () => {
    style.value = props.isFixed ? styleObj.fixed : styleObj.noFixed;
  },
  {
    immediate: true,
  },
);
</script>

<style lang="less" scoped>
.head {
  display: flex;
  align-items: center;
  width: 100%;
  height: 75px;
  padding: 0 16px;
  background: v-bind('style.background');
  box-shadow: v-bind('style.boxShadow');
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
      margin-left: 50px;
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
}
</style>
