<template>
  <div>
    <div class="sort t-color">
      <el-form :model="formInline" label-position="top">
        <div class="sort_row">
          <el-form-item label="First Name">
            <ComInput v-model="formInline.user" placeholder="Alec" />
          </el-form-item>
          <el-form-item label="Last Name">
            <ComInput v-model="formInline.user" placeholder="Thompson" />
          </el-form-item>
        </div>
        <div class="sort_row">
          <el-form-item label="Email">
            <ComInput
              v-model="formInline.user"
              placeholder="example@email.com"
            />
          </el-form-item>
          <el-form-item label="confirmation email">
            <ComInput
              v-model="formInline.user"
              placeholder="example@email.com"
            />
          </el-form-item>
        </div>

        <!-- <el-form-item label="Phone Number">
          <ComInput v-model="formInline.user" placeholder="+40 735 631 620" />
        </el-form-item> -->
        <el-form-item label="introduce">
          <ComInput
            v-model="formInline.user"
            maxlength="512"
            placeholder="Please input introduce"
            show-word-limit
            type="textarea"
            :autosize="{
              minRows: 4,
            }"
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

import ComInput from '@/components/input/BorInput.vue';

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
