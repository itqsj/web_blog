<template>
  <div class="page dark">
    <div class="page_aside">
      <Aside></Aside>
    </div>
    <div class="page_body">
      <el-affix :offset="13" style="width: 100%" @change="affixChange">
        <Head :is-fixed="isFixed"></Head>
      </el-affix>
      <div class="page_body_conten">
        <Analytics></Analytics>
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
import { onMounted, h, ref } from 'vue';
import { useUserStore } from '@/store/user';
import { useRouter } from 'vue-router';

import { ElNotification } from 'element-plus';
import Aside from './aside/Aside.vue';
import Head from '@/components/Head.vue';
import Analytics from '@/pages/analytics/Analytics.vue';

import { verifyToken } from '@/api/api_user';
import { ResVerifyInt } from '@/types/user';

const userStore = useUserStore();
const router = useRouter();
const isFixed = ref(false);

onMounted(() => {
  verify();
});

const verify = async () => {
  let token: string = userStore.getToken;
  if (!token) {
    token = window.sessionStorage.getItem('token') as string;
  }

  const { code } = (await verifyToken({ token })) as ResVerifyInt;
  if (code === 200) {
    console.log(200);
  } else if (code === 4004) {
    window.sessionStorage.clear();
    ElNotification({
      title: '提示',
      message: h('i', { style: 'color: teal' }, '当前token失效！请重新登录'),
    });
    router.push('/login');
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
  background: #f0f2f5;
  &_aside {
    width: 250px;
    height: calc(100% - 32px);
    padding: 16px;
    box-sizing: content-box;
  }
  &_body {
    overflow: auto;
    flex: 1;
    height: 100%;
    margin: 16px 16px 16px 0;
    &_content {
    }
  }
}
</style>
