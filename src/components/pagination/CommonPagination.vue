<template>
  <div class="pagination t-background">
    <el-pagination v-bind="$attrs" background />
  </div>
</template>

<script lang="ts">
export default {
  name: 'CommonTable',
};
</script>

<script lang="ts" setup></script>

<style lang="less" scoped>
.pagination {
  :deep(.number) {
    border: 1px solid rgb(222, 226, 230);
    border-radius: 50%;
  }
  :deep(.btn-prev) {
    border-radius: 50%;
  }
  :deep(.btn-next) {
    border-radius: 50%;
  }
  :deep(.is-active) {
    background-image: linear-gradient(
      195deg,
      rgb(73, 163, 241),
      rgb(26, 115, 232)
    );
    border: 0px;
  }
}
</style>
