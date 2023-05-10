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
        <delConfirm
          v-model="showLoginOutConfirm"
          persistent
          width="360"
          title="LOGINOUT"
          text="This operation will log out. Do you want to continue?"
        >
          <template #activator="{ props }">
            <v-btn v-bind="props" class="sort_right_while">LOGINOUT</v-btn>
          </template>
          <template #actions>
            <v-btn
              variant="text"
              color="teal-accent-4"
              @click="showLoginOutConfirm = false"
              >CANCEL</v-btn
            >
            <v-btn variant="text" color="teal-accent-4" @click="loginOut"
              >COMFIRM</v-btn
            >
          </template>
        </delConfirm>
        <v-btn class="sort_right_red">DELETE ACCOUNT</v-btn>
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
import { ref } from 'vue';

import delConfirm from '@/components/delConfirm/delConfirm.vue';

import { useUserStore } from '@/store/user';

const userStore = useUserStore();
const showLoginOutConfirm = ref(false);

const loginOut = () => {
  userStore.loginOut();
};
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
    .v-btn {
      height: 2.5rem;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0 1.5rem;
      border-radius: 0.5rem;
      background-size: 150% !important;
      background-position-x: 25% !important;
      margin-left: 1.25rem;
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
@media screen and (max-width: 900px) {
  .sort {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.25rem;
    &_right {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      .v-btn {
        width: 100%;
        margin-left: 0;
      }
    }
  }
}
</style>
