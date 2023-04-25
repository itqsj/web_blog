<template>
  <div class="select" :class="{ border_animate: borderAnimate }">
    <el-select-v2
      ref="select"
      v-bind="$attrs"
      @focus="focus"
      @blur="blur"
      @change="change"
    />
    <span
      :style="{
        transform: hasVal ? 'translate(0, -75%)' : '',
        top: hasVal ? '0' : '',
        fontSize: hasVal ? '12px' : '',
      }"
      class="select_placeholder t-background placeholder"
      >{{ placeholder }}</span
    >
  </div>
</template>

<script lang="ts">
export default {
  name: 'CommonSelect',
};
</script>
<script lang="ts" setup>
// click placeholder有问题
import { toRefs, ref, onMounted } from 'vue';

const props = defineProps({
  placeholder: {
    type: String,
    default: '请选择',
  },
  borderAnimate: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(['focus', 'blur', 'change']);

const isFacus = ref<boolean>(false);
const select = ref();
const hasVal = ref<boolean>(false);

const { placeholder } = toRefs(props);

const focus = () => {
  isFacus.value = true;
  emit('focus');
};
const blur = () => {
  isFacus.value = false;
  emit('blur');
};

const change = (value: string) => {
  hasVal.value = !!value;

  emit('change', value);
};

onMounted(() => {
  hasVal.value = !!select.value.modelValue;
});
</script>

<style lang="less" scoped>
.select {
  position: relative;
  width: 100%;
  border-radius: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  &_placeholder {
    position: absolute;
    top: 45%;
    left: 0.7rem;
    font-size: 16px;
    line-height: normal;
    // background: #fff;
    transition: all 0.2s;
    transform: translate(0, -50%);
  }
}
.el-select-v2 {
  width: 100%;
  :deep(.el-select-v2__wrapper) {
    position: relative;
    border: none;
  }
  :deep(.el-select-v2__input-wrapper) {
    width: 100%;
  }
}

.border_animate {
  box-shadow: none !important;
  .el-select-v2 {
    :deep(.el-select-v2__wrapper) {
      position: relative;
      border: none;
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
}
</style>
