<template>
  <el-skeleton
    :class="{ dark_skeleton: isDark, light_skeleton: !isDark }"
    :loading="loading"
    animated
  >
    <template #template>
      <slot name="template"></slot>
    </template>
    <template #default>
      <Transition>
        <div v-show="showContent">
          <slot></slot>
        </div>
      </Transition>
    </template>
  </el-skeleton>
</template>

<script lang="ts">
export default {
  name: 'TaskItem',
};
</script>
<script lang="ts" setup>
import { toRefs, ref, watch, nextTick } from 'vue';
import { isDark } from '@/composables';

const props = defineProps({
  loading: {
    type: Boolean,
    default: true,
  },
});
const { loading } = toRefs(props);
const showContent = ref<boolean>(false);

watch(
  () => loading.value,
  () => {
    if (!loading.value) {
      nextTick(() => {
        showContent.value = true;
      });
    }
  },
);
</script>

<style lang="less" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.dark_skeleton {
  :deep(.el-skeleton__item) {
    --el-skeleton-color: rgba(233, 235, 238, 0.05);
  }
}
.light_skeleton {
  :deep(.el-skeleton__item) {
    --el-skeleton-color: rgba(233, 235, 238, 0.6);
  }
}
</style>
