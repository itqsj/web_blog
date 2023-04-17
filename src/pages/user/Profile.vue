<template>
  <div>
    <div class="page">
      <img
        class="page_bg"
        src="https://demos.creative-tim.com/otis-admin-pro/static/media/bg-profile.af1219a742e09fc7b612.jpeg"
        alt=""
      />
      <div class="page_card t-background t-boxshadow t-color">
        <UserInfoVue />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ProfilePage',
};
</script>
<script lang="ts" setup>
import UserInfoVue from './UserInfo.vue';
</script>

<style lang="less" scoped>
.page {
  // height: 200vh;
  &_bg {
    width: 100%;
    height: 300px;
    object-fit: cover;
    background: linear-gradient(
          195deg,
          rgba(73, 163, 241, 0.6),
          rgba(26, 115, 232, 0.6)
        )
        50% center / cover,
      transparent;
    border-radius: 8px;
  }
  &_card {
    position: relative;
    min-height: 500px;
    border-radius: 0.75rem;
    box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem,
      rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;
    // overflow: visible;
    margin-top: -64px;
    margin-left: 24px;
    margin-right: 24px;
    padding: 16px;
  }
}
</style>
