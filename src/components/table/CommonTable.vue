<template>
  <div class="ctable t-background">
    <slot name="head"></slot>
    <el-table
      row-class-name="h-64"
      header-row-class-name="h-64"
      v-bind="$attrs"
      style="width: 100%"
    >
      <template v-for="(value, name) in slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData || {}"></slot>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts">
export default {
  name: 'CommonTable',
};
</script>

<script lang="ts" setup>
import { useSlots } from 'vue';

const slots = useSlots();
</script>

<style lang="less" scoped>
.ctable {
  padding: 20px 0;
  border-radius: 8px;
}
</style>
