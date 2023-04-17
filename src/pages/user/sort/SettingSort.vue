<template>
  <div class="sort">
    <h3>Platform Settings</h3>
    <ul class="sort_item">
      <p>ACCOUNT</p>
      <li>
        <CommonSwitch v-model="valueTrue" />
        <span>Email me when someone follows me</span>
      </li>
      <li>
        <CommonSwitch v-model="value" />
        <span>Email me when someone answers on my post</span>
      </li>
      <li>
        <CommonSwitch v-model="valueTrue" />
        <span>Email me when someone mentions me</span>
      </li>
    </ul>
    <ul class="sort_item">
      <p>APPLICATION</p>
      <li>
        <CommonSwitch v-model="value" />
        <span>New launches and projects</span>
      </li>
      <li>
        <CommonSwitch v-model="valueTrue" />
        <span>Monthly product updates</span>
      </li>
      <li>
        <CommonSwitch v-model="value" />
        <span>Subscribe to newsletter</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SettingSort',
};
</script>
<script lang="ts" setup>
import { ref } from 'vue';

import CommonSwitch from '@/components/switch/CommonSwitch.vue';

const value = ref(false);
const valueTrue = ref(true);
</script>

<style lang="less" scoped>
.sort {
  padding: 0 1rem 0.5rem;
  box-sizing: border-box;
  h3 {
    font-family: Roboto, Helvetica, Arial, sans-serif;
    letter-spacing: 0.0075em;
    text-transform: capitalize;
    font-size: 1.125rem;
  }
  &_item {
    margin-top: 1.5rem;
    p {
      font-family: Roboto, Helvetica, Arial, sans-serif;
      font-size: 0.75rem;
      line-height: 1.25;
      letter-spacing: 0.03333em;
      color: rgb(123, 128, 154);
      font-weight: 700;
    }
    li {
      display: flex;
      align-items: center;
      height: 2.625rem;
      span {
        font-family: Roboto, Helvetica, Arial, sans-serif;
        font-size: 0.875rem;
        line-height: 1.5;
        letter-spacing: 0.02857em;
        color: rgb(123, 128, 154);
        font-weight: 400;
        margin-left: 0.75rem;
      }
    }
  }
}
</style>
