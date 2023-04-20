<template>
  <div class="input" :class="{ border_animate: borderAnimate }">
    <el-input
      ref="input"
      v-bind="$attrs"
      @focus="focus"
      @blur="blur"
      @change="change"
    />
    <span
      :style="{
        transform: isFacus || hasVal ? 'translate(0, -55%)' : '',
        top: isFacus || hasVal ? '0' : '',
        fontSize: isFacus || hasVal ? '12px' : '',
      }"
      class="input_placeholder t-background placeholder"
      @click="click"
      >{{ placeholder }}</span
    >
  </div>
</template>

<script lang="ts">
export default {
  name: 'PlaInput',
};
</script>
<script lang="ts" setup>
import { toRefs, ref } from 'vue';

const props = defineProps({
  placeholder: {
    type: String,
    default: '请输入',
  },
  borderAnimate: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['focus', 'blur', 'change']);

const isFacus = ref<boolean>(false);
const input = ref();
const hasVal = ref<boolean>(false);

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

const click = () => {
  input.value.focus();
};

const { placeholder, modelValue } = toRefs(props);
</script>

<style lang="less" scoped>
.input {
  position: relative;
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color))
    inset;
  &_placeholder {
    position: absolute;
    top: 50%;
    left: 0.9375rem;
    font-size: 16px;
    line-height: normal;
    // background: #fff;
    transition: all 0.2s;
    transform: translate(0, -50%);
  }
  &:focus-within {
    box-shadow: 0 0 0 2px #1a73e8 inset;
    .input_placeholder {
      color: #1a73e8;
    }
  }
}
.el-input {
  width: 100%;
  :deep(.el-input__wrapper) {
    position: relative;
    // padding-left: 0;
    box-shadow: none;
    input {
      &::placeholder {
        display: none;
      }
    }
  }
}
.el-textarea {
  //   :deep(.el-textarea__inner) {
  //     box-shadow: none;
  //   }
  position: relative;
}

.border_animate {
  box-shadow: none !important;
  .el-input {
    :deep(.el-input__wrapper) {
      position: relative;
      box-shadow: none;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
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
  .el-textarea {
    // :deep(.el-textarea__inner) {
    :deep(.el-textarea__inner) {
      box-shadow: none;
    }
    position: relative;

    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
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
    // }
  }
}
</style>
