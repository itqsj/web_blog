<template>
  <div>
    <div class="sort t-color">
      <el-form :model="formInline" label-position="top">
        <el-form-item label="Current Password">
          <PlaInput
            v-model="formInline.user"
            size="large"
            placeholder="Current Password"
          />
        </el-form-item>
        <el-form-item label="New Password">
          <PlaInput
            v-model="formInline.user"
            size="large"
            placeholder="New Password"
          />
        </el-form-item>
        <el-form-item label="Comfirm New Password">
          <PlaInput
            v-model="formInline.user"
            size="large"
            placeholder="Comfirm New Password"
          />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'BasicInfo',
};
</script>
<script lang="ts" setup>
import { reactive } from 'vue';

import PlaInput from '@/components/input/PlaInput.vue';

const formInline = reactive({
  user: '',
});
</script>

<style scoped lang="less">
.sort {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.2rem;
  .el-form {
    width: 100%;
  }

  &_row {
    display: flex;
    justify-content: space-between;
    gap: 1.5rem;
    .el-form-item {
      flex: 1;
    }
  }
}
</style>
