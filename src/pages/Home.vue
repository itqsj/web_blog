<template>
  <div v-if="isFinish" class="page">
    <div class="page_aside">
      <Aside></Aside>
    </div>
    <div class="page_body">
      <el-affix :offset="13" style="width: 100%" @change="affixChange">
        <Head :is-fixed="isFixed"></Head>
      </el-affix>
      <div class="page_body_conten">
        <router-view v-slot="{ Component }">
          <Transition name="fade" mode="out-in" appear>
            <keep-alive include="LoginPage">
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
import { onBeforeMount, h, ref, toRefs } from 'vue';
import { useUserStore } from '@/store/user';
import { useRouter } from 'vue-router';
import { useThemeStore } from '@/store/theme';

import { ElNotification } from 'element-plus';
import Aside from './aside/Aside.vue';
import Head from '@/components/head/Head.vue';
// import CommonTable from '@/components/table/CommonTable.vue';
// import Analytics from '@/pages/analytics/Analytics.vue';

import { verifyToken, userInfo } from '@/api/api_user';
import { ResInt } from '@/types/index';

const userStore = useUserStore();
const { getThemStyle } = toRefs(useThemeStore());
const router = useRouter();
const isFixed = ref(false);
const isFinish = ref(false);

onBeforeMount(() => {
  verify();
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
  } else if (code === 4004) {
    window.sessionStorage.clear();
    ElNotification({
      title: '提示',
      message: h('i', { style: 'color: teal' }, '当前token失效！请重新登录'),
    });
    router.push('/login');
  }
};
const getUserinfo = async () => {
  const { code, data } = await userInfo();
  if (code === 200) {
    userStore.updateUserInfo(data);
    isFinish.value = true;
  }
};
const affixChange = (fixed: boolean) => {
  isFixed.value = fixed;
};
</script>

<style lang="less">
.t-color {
  color: v-bind('getThemStyle.color');
}
.t-background {
  background: v-bind('getThemStyle.background');
}
.t-boxshadow {
  box-shadow: v-bind('getThemStyle.boxShadow');
}
</style>

<style scoped lang="less">
.page {
  display: flex;
  overflow: hidden;
  height: 100vh;
  box-sizing: border-box;
  // background: #f0f2f5;
  &_aside {
    width: 250px;
    height: calc(100% - 32px);
    padding: 16px 0 16px 16px;
    box-sizing: content-box;
    transition: all 0.3s;
  }
  &_body {
    overflow: auto;
    flex: 1;
    height: 100%;
    padding: 16px 16px 16px 16px;
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
@media screen and (max-width: 1400px) {
  .page {
    &_aside {
      width: 0px;
      padding: 0;
    }
  }
}
</style>
