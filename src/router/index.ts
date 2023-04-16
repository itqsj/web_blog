import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      keepAlive: true,
      requireAuth: false,
    },
    component: () => import('@/pages/login/LoginPage.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      title: '主页',
      keepAlive: true,
      requireAuth: false,
    },
    component: () => import('@/pages/Home.vue'),
    beforeEnter: (to, from) => {
      //to是当用户点击进入当前页面的时候,我们可以进行一些拦截设置
      //from当来自其他页面进入当前页面的时候，我们也可以进行拦截提示用户

      const token = window.sessionStorage.getItem('token');
      if (!token) {
        return false;
      }
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
