<template>
  <el-input v-bind="$attrs" />
</template>

<script lang="ts">
export default {
  name: 'BorInput',
};
</script>
<script lang="ts" setup></script>

<style lang="less" scoped>
.el-input {
  :deep(.el-input__wrapper) {
    position: relative;
    box-shadow: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    &::after {
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0;
      transform: translate(-50%, 2px);
      content: '';
      border-bottom: 2px solid #1a73e8;
      transition: all 0.3s;
    }
    &:focus-within {
      &::after {
        width: 100%;
      }
    }
  }
}
.el-textarea {
  // :deep(.el-textarea__inner) {
  :deep(.el-textarea__inner) {
    box-shadow: none;
  }
  position: relative;

  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  &::after {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    transform: translate(-50%, 2px);
    content: '';
    border-bottom: 2px solid #1a73e8;
    transition: all 0.3s;
  }
  &:focus-within {
    &::after {
      width: 100%;
    }
  }
  // }
}
</style>
