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
      <h3 class="font-20 t-color mtop-20 mbottom-10">Password requirements</h3>
      <p class="font-16 mtop-15">
        Please follow this guide for a strong password
      </p>
      <div class="sort_footer">
        <ul class="font-14 mtop-10">
          <li><span /> One special characters</li>
          <li><span /> Min 6 characters</li>
          <li><span /> One number (2 are recommended)</li>
          <li><span /> Change it often</li>
        </ul>
        <v-btn>update password</v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SessionsSort',
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
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
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
  p {
    color: rgb(123, 128, 154);
  }
  ul {
    color: rgb(123, 128, 154);
    li {
      display: flex;
      align-items: center;
      gap: 0.625rem;
      margin-bottom: 0.5rem;
      span {
        display: inline-block;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background: rgb(123, 128, 154);
      }
    }
  }
  &_footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    .v-btn {
      font-family: Roboto, Helvetica, Arial, sans-serif;
      font-size: 0.75rem;
      background-image: linear-gradient(
        195deg,
        rgb(66, 66, 74),
        rgb(25, 25, 25)
      );
      color: rgb(255, 255, 255);
      box-shadow: rgb(52 71 103 / 15%) 0rem 0.1875rem 0.1875rem 0rem,
        rgb(52 71 103 / 20%) 0rem 0.1875rem 0.0625rem -0.125rem,
        rgb(52 71 103 / 15%) 0rem 0.0625rem 0.3125rem 0rem;
      background-size: 150% !important;
      background-position-x: 25% !important;
      font-size: 0.75rem;
      border-radius: 0.5rem;
    }
  }
}
</style>
