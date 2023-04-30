<template>
  <teleport :to="appendTo">
    <Transition name="slide-fade">
      <div v-show="modelValue" class="overlay" @click="close">
        <slot v-if="defaultSlot"></slot>
        <loading v-else></loading>
      </div>
    </Transition>
  </teleport>
</template>

<script lang="ts">
export default {
  name: 'OverlayVue',
};
</script>

<script lang="ts" setup>
import { toRefs, watch, ref, useSlots, computed } from 'vue';

import loading from '../loading/loading.vue';

const props = defineProps({
  appendTo: {
    type: String,
    default: 'body',
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  clickClose: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue']);
const { appendTo, modelValue, clickClose } = toRefs(props);
const show = ref<boolean>(false);
const slots = useSlots();

const defaultSlot = computed(() => slots.default && slots.default().length);

watch(
  () => modelValue.value,
  () => {
    if (!modelValue.value) {
      setTimeout(() => {
        show.value = modelValue.value;
      }, 300);
    } else {
      show.value = modelValue.value;
    }
  },
  {
    immediate: true,
  },
);

const close = () => {
  if (!clickClose.value) {
    return;
  }
  show.value = false;
  emit('update:modelValue', false);
};
</script>

<style lang="less" scoped>
.overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2022;
  width: 100vw;
  height: 100vh;
  background: var(--el-bg-color-overlay);
}

.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10%);
  opacity: 0;
}
</style>
