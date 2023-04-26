<template>
  <v-text-field v-bind="$attrs" />
</template>

<script lang="ts">
export default {
  name: 'CommonInput',
};
</script>
<script lang="ts" setup></script>

<style lang="less" scoped>
.v-text-field {
  :deep(input) {
    transition-duration: 1s !important;
    transition-delay: 1s !important;
  }
}
</style>
