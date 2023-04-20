<template>
  <div class="ctable t-background">
    <slot name="head"></slot>
    <el-table
      row-class-name="h-64"
      header-row-class-name="h-64"
      v-bind="$attrs"
      style="width: 100%"
    >
      <slot></slot>
    </el-table>
  </div>
</template>

<script lang="ts">
export default {
  name: 'CommonTable',
};
</script>

<script lang="ts" setup></script>

<style lang="less" scoped>
.ctable {
  padding: 20px 0;
  border-radius: 8px;
}
</style>
