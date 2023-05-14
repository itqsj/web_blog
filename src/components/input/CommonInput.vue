<template>
  <v-text-field v-bind="$attrs">
    <template v-for="(value, name) in slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}"></slot>
    </template>
  </v-text-field>
</template>

<script lang="ts">
export default {
  name: 'CommonInput',
};
</script>
<script lang="ts" setup>
import { useSlots } from 'vue';

const slots = useSlots();
</script>

<style lang="less" scoped>
.v-text-field {
  :deep(input) {
    transition-duration: 1s !important;
    transition-delay: 1s !important;
  }
}
</style>
