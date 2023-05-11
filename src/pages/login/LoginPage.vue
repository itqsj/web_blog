<template>
  <div class="page">
    <div class="page_left">
      <!-- <img class="page_left_bg" src="@/assets/img/lg_bg.jpeg" alt="" /> -->
    </div>
    <div class="page_right">
      <h3 class="t-color">Welcome to admin! 👋🏻</h3>
      <p class="t-color font-14 mtop-15 page_right_txt">
        Please sign-in to your account and start the adventure
      </p>
      <LoginForm></LoginForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from './LoginForm.vue';
</script>

<script lang="ts">
export default {
  name: 'LoginPage',
};
</script>

<style scoped lang="less">
.page {
  display: flex;
  justify-content: space-between;
  height: 100vh;
  &_left {
    flex: 7;
    height: 100%;
    vertical-align: top;
    background: #16bffd;
    background: -webkit-linear-gradient(to right, #cb3066, #16bffd);
    background: linear-gradient(to right, #cb3066, #16bffd);
    &_bg {
      width: 100%;
      height: 100%;
      object-fit: cover;
      vertical-align: top;
      background: linear-gradient(
          195deg,
          rgba(66, 66, 74, 0.6),
          rgba(25, 25, 25, 0.6)
        )
        center center / cover no-repeat;
    }
  }
  &_right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 2;
    min-width: 430px;
    height: 100%;
    padding: 50px;
    h3 {
      margin: 0px 0px 0.375rem;
      font-family: Inter, sans-serif, -apple-system, BlinkMacSystemFont,
        'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif,
        'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
      font-size: 1.25rem;
      line-height: 1.334;
      letter-spacing: 0px;
      color: rgba(58, 53, 65, 0.87);
      font-weight: 600;
    }
    &_txt {
      color: rgba(58, 53, 65, 0.68);
    }
  }
}

@media screen and (max-width: 500px) {
  .page {
    &_left {
      display: none;
    }
    &_right {
      min-width: 100%;
      padding: 30px;
    }
  }
}
</style>
