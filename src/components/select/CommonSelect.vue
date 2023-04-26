<template>
  <div class="select" :class="{ border_animate: borderAnimate }">
    <el-select-v2
      v-model="value"
      v-bind="$attrs"
      @focus="focus"
      @change="change"
      @blur="blur"
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
import { toRefs, ref, watch } from 'vue';
type ValueInt = string | number;

const props = defineProps({
  placeholder: {
    type: String,
    default: '请选择',
  },
  borderAnimate: {
    type: Boolean,
    default: true,
  },
  modelValue: {
    type: String as () => ValueInt,
    default: '',
  },
});
const emit = defineEmits(['focus', 'blur', 'change', 'update:modelValue']);

const isFacus = ref<boolean>(false);
const hasVal = ref<boolean>(false);
const value = ref<number | string>();

const { placeholder, modelValue } = toRefs(props);

const focus = () => {
  isFacus.value = true;
  emit('focus');
};

watch(
  () => modelValue.value,
  () => {
    if (value.value !== modelValue.value) {
      value.value = modelValue.value;
    }
    hasVal.value = !!modelValue.value;
  },
  {
    immediate: true,
  },
);

const blur = () => {
  isFacus.value = false;
  emit('blur');
};

const change = (data: number) => {
  hasVal.value = !!value.value;
  emit('update:modelValue', value.value);
  emit('change', data);
};
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
