<template>
  <div v-if="isFinish" class="page">
    <div class="page_placeholder"></div>
    <v-expand-x-transition>
      <div v-show="isShowAside" class="page_aside">
        <Aside></Aside>
      </div>
    </v-expand-x-transition>
    <div class="page_body">
      <el-affix :offset="13" style="width: 100%" @change="affixChange">
        <Head :is-fixed="isFixed"></Head>
      </el-affix>
      <div class="page_body_content">
        <router-view v-slot="{ Component }">
          <Transition name="fade" mode="out-in" appear>
            <keep-alive
              :include="[
                'TaskPage',
                'ProfilePage',
                'ChatBot',
                'UserList',
                'CodeSandBox',
                'FlowChart',
              ]"
            >
              <component :is="Component" />
            </keep-alive>
          </Transition>
        </router-view>
      </div>
      <div class="page_body_footer">
        <div class="page_body_footer_left">
          © 2022, made with by Creative qsj for a better web.
        </div>
        <div class="page_body_footer_right">
          Creative qsj About Us Blog License
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HomePage',
};
</script>
<script lang="ts" setup>
import { onBeforeMount, h, ref, toRefs, onBeforeUnmount } from 'vue';
import { useUserStore } from '@/store/user';
import { useThemeStore } from '@/store/theme';

import { ElNotification } from 'element-plus';
import Aside from './aside/Aside.vue';
import Head from '@/components/head/Head.vue';
// import CommonTable from '@/components/table/CommonTable.vue';
// import Analytics from '@/pages/analytics/Analytics.vue';

import { useCommonStore } from '@/store/common';
import { verifyToken, userInfo } from '@/api/api_user';
import { windowResize } from '@/util/resize';

const userStore = useUserStore();
const { isShowAside, updateIsPhone } = toRefs(useCommonStore());
const themeStore = useThemeStore();
const isFixed = ref(false);
const isFinish = ref(false);

onBeforeMount(() => {
  // console.log(navigator.userAgent);
  // useGithubFetch('/repos/itqsj/web_blog/events');
  verify();
  window.addEventListener('resize', windowResize);
  ElNotification({
    title: '提示',
    type: 'info',
    message:
      '由于当前网址使用的是https协议，七牛当前斤支持http,访问图片时，自动将http转换为https，导致图片无法访问，后续会将七牛绑定的域名升级为https来解决此问题',
  });
  if (window.innerWidth < 900) {
    updateIsPhone.value(true);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', windowResize);
});

const verify = async () => {
  let token: string = userStore.getToken;
  if (!token) {
    token = window.sessionStorage.getItem('token') as string;
  }

  const { code, data } = await verifyToken({ token });

  if (code === 200) {
    window.sessionStorage.setItem('token', data.token);
    userStore.updateToken(data.token);

    getUserinfo();
  } else {
    ElNotification({
      title: '提示',
      message: h('i', { style: 'color: teal' }, '当前token失效！请重新登录'),
    });
    userStore.loginOut();
  }
};
const getUserinfo = async () => {
  const { code, data } = await userInfo();
  if (code === 200) {
    userStore.updateUserInfo(data);
    isFinish.value = true;
    // themeStore.changeCodeLink();
  }
};
const affixChange = (fixed: boolean) => {
  isFixed.value = fixed;
};
</script>

<style scoped lang="less">
.page {
  display: flex;
  overflow: hidden;
  height: 100vh;
  box-sizing: border-box;
  // background: #f0f2f5;
  &_placeholder {
    width: 1rem;
    background: transparent;
  }
  &_aside {
    width: 15.625rem;
    height: calc(100% - 2rem);
    padding: 1rem 0 1rem 0;
    box-sizing: content-box;
    transition: all 0.3s;
  }
  &_body {
    overflow: auto;
    flex: 1;
    height: 100%;
    padding: 1rem;
    position: relative;
    &_content {
      max-width: 125rem;
      margin: 0 auto;
    }
    &_footer {
      display: flex;
      justify-content: space-between;
      padding: 1.5rem;
      opacity: 1;
      background: transparent;
      color: rgb(123, 128, 154);
      box-sizing: border-box;
    }
  }
}
</style>
