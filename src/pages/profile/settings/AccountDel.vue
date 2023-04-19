<template>
  <div>
    <div class="sort">
      <div class="sort_left">
        <h3 class="font-20 t-color">Delete Account</h3>
        <p class="mtop-15">
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
      </div>
      <div class="sort_right">
        <el-button class="sort_right_while">DEACTIVATE</el-button>
        <el-button class="sort_right_red">DELETE ACCOUNT</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AccountDel',
};
</script>

<script lang="ts" setup>
import { reactive } from 'vue';

import PlaInput from '@/components/input/PlaInput.vue';

const formInline = reactive({
  user: '',
});
</script>

<style lang="less" scoped>
.sort {
  display: flex;
  align-items: center;
  justify-content: space-between;
  &_left {
    p {
      color: rgb(123, 128, 154);
    }
  }
  &_right {
    .el-button {
      height: 2.5rem;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0 1.5rem;
      border-radius: 0.5rem;
      background-size: 150% !important;
      background-position-x: 25% !important;
    }
    &_while {
      font-family: Roboto, Helvetica, Arial, sans-serif;
      border: 1px solid rgb(123, 128, 154);
      color: rgb(123, 128, 154);
    }
    &_red {
      background-image: linear-gradient(
        195deg,
        rgb(239, 83, 80),
        rgb(229, 57, 53)
      );
      color: rgb(255, 255, 255);
      box-shadow: rgb(244 67 53 / 15%) 0rem 0.1875rem 0.1875rem 0rem,
        rgb(244 67 53 / 20%) 0rem 0.1875rem 0.0625rem -0.125rem,
        rgb(244 67 53 / 15%) 0rem 0.0625rem 0.3125rem 0rem;
    }
  }
}
</style>
