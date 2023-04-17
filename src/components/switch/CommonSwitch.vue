<template>
  <el-switch v-bind="$attrs" />
</template>

<script lang="ts">
export default {
  name: 'CommonSwitch',
};
</script>
<script lang="ts" setup></script>

<style lang="less" scoped>
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
