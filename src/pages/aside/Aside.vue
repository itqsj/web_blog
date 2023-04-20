<template>
  <div class="aside t-background t-boxshadow">
    <div class="aside_title">
      <h3 class="t-color">Otis Admin PRO</h3>
    </div>
    <div class="line"></div>
    <el-menu :default-active="activeIndex" :collapse-transition="false" router>
      <el-sub-menu index="1" :collapse-transition="false">
        <template #title>
          <img
            class="aside_img"
            src="https://demos.creative-tim.com/otis-admin-pro/static/media/team-3.0ef0be95e6850814c79e.jpg"
            alt=""
          />
          <span class="t-color">Navigator One</span>
        </template>

        <el-menu-item index="/profile" class="t-color">My Profile</el-menu-item>
        <el-menu-item index="/settings" class="t-color">Settings</el-menu-item>
      </el-sub-menu>
      <div class="line"></div>
      <el-sub-menu index="2" :collapse-transition="false">
        <template #title>
          <el-icon><location class="t-color" /></el-icon>
          <span class="t-color">Dashboards</span>
        </template>

        <el-menu-item index="/analytics" class="t-color"
          >Analytics</el-menu-item
        >
      </el-sub-menu>
      <h3 class="aside_text t-color">PAGES</h3>
      <el-sub-menu index="3" :collapse-transition="false">
        <template #title>
          <el-icon><location class="t-color" /></el-icon>
          <span class="t-color">Users</span>
        </template>

        <el-menu-item index="/userList" class="t-color">User List</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="4" :collapse-transition="false">
        <template #title>
          <el-icon><location class="t-color" /></el-icon>
          <span class="t-color">Article</span>
        </template>
        <el-menu-item index="/neArticle" class="t-color"
          >New Article</el-menu-item
        >
        <el-menu-item index="/articleList" class="t-color"
          >Article List</el-menu-item
        >
      </el-sub-menu>
      <el-menu-item
        index="/task"
        class="t-color"
        :style="{
          background: activeIndex === '/task' ? 'rgb(26, 115, 232)' : '',
        }"
        >Task</el-menu-item
      >
    </el-menu>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AsidePage',
};
</script>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const activeIndex = ref('');

watch(
  () => route.path,
  () => {
    activeIndex.value = route.path;
  },
  {
    immediate: true,
  },
);
</script>

<style lang="less" scoped>
.aside {
  overflow: auto;
  width: 100%;
  height: 100%;
  // background: #232526;
  // background: -webkit-linear-gradient(to right, #414345, #232526);
  // background: linear-gradient(to right, #414345, #232526);
  border-radius: 8px;
  .el-menu {
    transition: width 0.15s;
    -webkit-transition: width 0.15s;
    -moz-transition: width 0.15s;
    -webkit-transition: width 0.15s;
    -o-transition: width 0.15s;
    font-weight: 600;
    :deep(.el-menu-item) {
      overflow: hidden;
      width: 218px;
      border-radius: 0.5rem;
      margin: 0.3125rem auto 0;
    }
    :deep(.is-active) {
      .el-sub-menu__title {
        background-color: rgba(255, 255, 255, 0.2);
      }
      .is-active {
        overflow: hidden;
        width: 218px;
        background-color: rgb(26, 115, 232);
        border-radius: 0.5rem;
        margin: 0.3125rem auto 0;
        &:hover {
          background-color: rgb(26, 115, 232);
        }
      }
    }
  }
  &_title {
    padding: 24px 32px 8px;
    text-align: center;
    font-size: 14px;
    letter-spacing: 0.02857em;
    font-weight: 600;
  }
  &_img {
    width: 2.25rem;
    height: 2.25rem;
    margin-right: 0.625rem;
    border-radius: 50%;
  }
  &_text {
    font-size: 0.75rem;
    margin: 1rem 0.5rem 0.5rem;
    padding-left: 1.5rem;
  }
}
</style>

<style></style>
