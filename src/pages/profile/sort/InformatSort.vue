<template>
  <div class="sort">
    <h3>My Basic Information</h3>
    <p class="sort_introd">
      {{ userInfo.introduction }}
    </p>
    <ul>
      <li class="sort_li">
        <span class="sort_li_left t-color">id: </span>
        <span class="sort_li_right"> {{ userInfo._id }}</span>
      </li>
      <li class="sort_li">
        <span class="sort_li_left t-color">Full Name: </span>
        <span class="sort_li_right">{{ userInfo.username }}</span>
      </li>
      <li class="sort_li">
        <span class="sort_li_left t-color">Email: </span>
        <span class="sort_li_right">{{ userInfo.email }}</span>
      </li>
      <li class="sort_li">
        <span class="sort_li_left t-color">Location: </span>
        <span class="sort_li_right">USA</span>
      </li>
      <li class="sort_li">
        <span class="sort_li_left t-color">CreatedAt: </span>
        <span class="sort_li_right">{{ formatDate(userInfo.createdAt) }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: 'InformatSort',
};
</script>
<script lang="ts" setup>
import { toRefs } from 'vue';

import type { UserInfoInt } from '@/types/user';
import formatDate from '@/util/formatDate';

const props = defineProps({
  userInfo: {
    type: Object as () => UserInfoInt,
    default: null,
  },
});

const { userInfo } = toRefs(props);
</script>

<style lang="less" scoped>
.sort {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  padding: 0 1rem 0.5rem;
  box-sizing: border-box;
  h3 {
    letter-spacing: 0.0075em;
    text-transform: capitalize;
    font-size: 1.125rem;
  }
  &_introd {
    font-size: 0.875rem;
    line-height: 1.8;
    letter-spacing: 0.02857em;
    opacity: 1;
    text-transform: none;
    vertical-align: unset;
    text-decoration: none;
    color: rgb(123, 128, 154);
    font-weight: 300;
    margin: 1rem 0;
  }

  &_li {
    font-size: 0.875rem;
    line-height: 1.5;
    letter-spacing: 0.02857em;
    padding: 0.5rem 0;
    &_left {
      // color: rgb(52, 71, 103);
      font-weight: 700;
    }
    &_right {
      margin-left: 0.5rem;
      color: rgb(123, 128, 154);
    }
  }
}
</style>
