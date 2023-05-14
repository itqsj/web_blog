<template>
  <el-image v-bind="$attrs">
    <template #placeholder>
      <div
        class="d-flex align-center justify-center fill-height bg-placeholder"
      >
        <v-progress-circular
          color="grey-lighten-4"
          indeterminate
        ></v-progress-circular>
      </div>
    </template>
    <!-- <template #error>
      <div class="image-slot">
        <el-icon><icon-picture /></el-icon>
      </div>
    </template> -->
  </el-image>
</template>

<script lang="ts">
export default {
  name: 'CommonImg',
};
</script>

<script lang="ts" setup>
// import { toRefs } from 'vue';

// const props = defineProps({
//   src: {
//     type: String,
//     default: '',
//   },
// });

// const { src } = toRefs(props);
</script>

<style lang="less" scoped>
.el-image {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}
.bg-placeholder {
  background-color: #ffffff;
}
</style>
