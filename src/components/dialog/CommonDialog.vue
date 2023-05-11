<template>
  <el-dialog
    ref="dialog"
    v-model="show"
    class="common_dialog"
    v-bind="$attrs"
    :show-close="false"
  >
    <template v-for="(value, name) in slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}"></slot>
    </template>
    <template #header>
      <div class="head">
        <h4 class="head_title">{{ title }}</h4>
        <v-btn
          icon="$close"
          density="comfortable"
          variant="plain"
          @click="handleClose"
        ></v-btn>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
export default {
  name: 'CommonDialog',
};
</script>
<script lang="ts" setup>
import { useSlots, onMounted, ref, toRefs, computed } from 'vue';

interface ExposeObjInt {
  [key: string]: any;
  // other properties
}

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const { title, modelValue } = toRefs(props);
const dialog = ref();
const slots = useSlots();
const exposeObj: ExposeObjInt = {};
const emit = defineEmits(['update:modelValue']);

const show = computed({
  get() {
    return modelValue.value;
  },
  set(val) {
    emit('update:modelValue', val);
  },
});

onMounted(() => {
  setRefExpose();
});

const setRefExpose = () => {
  const entries = Object.entries(dialog.value);
  for (const [key, value] of entries) {
    if (key !== 'actions') {
      exposeObj[key] = value;
    }
  }
};

const handleClose = () => {
  show.value = false;
};

defineExpose(exposeObj);
</script>

<style lang="less">
.common_dialog {
  overflow: hidden;
  border-radius: 0.625rem;
  box-shadow: 0 16px 16px -10px rgb(34 47 62 / 15%),
    0 0 40px 1px rgb(34 47 62 / 15%);
  .el-dialog__header {
    margin-right: 0;
    padding: 0.625rem 0.625rem 0.625rem var(--el-dialog-padding-primary);
  }
  .el-dialog__body {
    padding-top: 1.25rem;
  }
}
</style>
<style lang="less" scoped>
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  h4 {
    font-size: 1.25rem;
  }
}
</style>
