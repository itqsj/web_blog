<template>
  <div class="tabs">
    <div
      class="tabs_bar t-background t-boxshadow"
      :style="{
        width: activeWidth + 'px',
        transform: `translateX(${activeLeft}px )`,
      }"
    ></div>
    <div
      v-for="(item, index) in tabs"
      :key="index"
      :class="{ tabs_active: modelValue === item.value }"
      class="tabs_item t-color t-background"
      @click="() => handleClick(item.value)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'CommonTable',
};
</script>

<script lang="ts" setup>
import { ref, defineProps, toRefs, onMounted, nextTick } from 'vue';

import { TabsInt } from '@/types/user';

interface Props {
  tabs: TabsInt[];
  modelValue: string | number;
}

const emit = defineEmits(['update:modelValue']);
const props = withDefaults(defineProps<Props>(), {
  tabs: () => [],
  modelValue: 1,
});
const activeWidth = ref(0);
const activeLeft = ref(0);

onMounted(() => {
  console.log(modelValue.value);
  const active = document.querySelector('.tabs_active') as HTMLElement;
  activeWidth.value = active.offsetWidth;
});

const handleClick = (value: number | string) => {
  emit('update:modelValue', value);

  nextTick(() => {
    const active = document.querySelector('.tabs_active') as HTMLElement;
    activeWidth.value = active.offsetWidth;
    activeLeft.value = active.offsetLeft;
  });
};

const { tabs, modelValue } = toRefs(props);
</script>

<style lang="less" scoped>
.tabs {
  position: relative;
  display: inline-flex;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-size: 1rem;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 0.625rem;
  &_bar {
    position: absolute;
    left: 0;
    top: 0;
    width: 50px;
    height: 2.5rem;
    border: 0px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.75rem;
    box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem,
      rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;
    // background-color: rgb(255, 255, 255);
    transition: all 0.3s;
  }
  // :deep(.el-tabs__active-bar) {
  //   height: 100%;
  //   border: 0px solid rgba(0, 0, 0, 0.125);
  //   border-radius: 0.75rem;
  //   box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem,
  //     rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;
  //   // background-color: rgb(255, 255, 255);
  // }
  // :deep(.el-tabs__item) {
  //   z-index: 10;
  //   min-width: 100px;
  //   text-align: center;
  //   background-color: transparent;
  // }
  // :deep(.el-tabs__header) {
  //   background-color: rgba(0, 0, 0, 0.05);
  //   border-radius: 0.625rem;
  //   overflow: hidden;
  // }
  &_item {
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 9.375rem;
    height: 2.5rem;
    padding: 0 0.9375rem;
    cursor: pointer;
    background: transparent;
  }
}
</style>
