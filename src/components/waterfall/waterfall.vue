<template>
  <div ref="waterfall" class="waterfall">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'WaterFall',
};
</script>

<script lang="ts" setup>
import {
  onMounted,
  ref,
  defineExpose,
  defineProps,
  toRefs,
  nextTick,
} from 'vue';

const waterfall = ref();
const itemWidth = ref(0);

const props = defineProps({
  info: {
    type: Object,
    default: () => ({
      space: 30,
      columns: 3,
    }),
  },
});
const { info } = toRefs(props);

onMounted(() => {
  setWarpWith();
});

const setWarpWith = () => {
  itemWidth.value =
    (waterfall.value.clientWidth -
      (info.value.columns - 1) * info.value.space) /
    info.value.columns;
};

const setPosition = () => {
  const nextTops = new Array(info.value.columns).fill(0);
  const children: HTMLElement[] = Array.from(waterfall.value.children);
  for (let i = 0; i < children.length; i++) {
    const item = children[i];
    const minTop = Math.min.apply(null, nextTops);
    const index = nextTops.indexOf(minTop);
    const left = index * info.value.space + index * itemWidth.value;

    children[i].style.width = itemWidth.value + 'px';
    item.style.top = `${minTop}px`;
    item.style.left = left + 'px';
    nextTops[index] += item.clientHeight + info.value.space + 50;
  }

  const maxHeight = Math.max.apply(null, nextTops);
  waterfall.value.style.height = maxHeight + 'px';
};

defineExpose({
  setPosition,
  setWarpWith,
});
</script>

<style lang="less" scoped>
.waterfall {
  position: relative;
}
</style>
