import type { App } from 'vue';
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
    redirect: '/analytics',
    component: () => import('@/pages/Home.vue'),
    beforeEnter: (to, from) => {
      //to是当用户点击进入当前页面的时候,我们可以进行一些拦截设置
      //from当来自其他页面进入当前页面的时候，我们也可以进行拦截提示用户

      const token = window.sessionStorage.getItem('token');
      if (!token) {
        return false;
      }
    },
    children: [
      {
        path: '/analytics',
        name: 'Analytics',
        meta: {
          title: 'Analytics',
          keepAlive: true,
          requireAuth: false,
        },
        component: () => import('@/pages/analytics/Analytics.vue'),
      },
      {
        path: '/profile',
        name: 'Profile',
        meta: {
          title: 'Profile',
          keepAlive: true,
          requireAuth: false,
        },
        component: () => import('@/pages/profile/Profile.vue'),
      },
      {
        path: '/userList',
        name: 'UserList',
        meta: {
          title: 'UserList',
          keepAlive: true,
          requireAuth: false,
        },
        component: () => import('@/pages/user/UserList.vue'),
      },
      {
        path: '/settings',
        name: 'Settings',
        meta: {
          title: 'Settings',
          keepAlive: true,
          requireAuth: false,
        },
        component: () => import('@/pages/profile/settings/Settings.vue'),
      },
      {
        path: '/task',
        name: 'task',
        meta: {
          title: 'Task',
          keepAlive: true,
          requireAuth: false,
        },
        component: () => import('@/pages/task/Task.vue'),
      },
      {
        path: '/addTask',
        name: 'addTask',
        meta: {
          title: 'addTask',
          keepAlive: true,
          requireAuth: false,
        },
        component: () => import('@/pages/task/addTask/AddTaskVue.vue'),
      },
      {
        path: '/taskDetail',
        name: 'taskDetail',
        meta: {
          title: 'taskDetail',
          keepAlive: true,
          requireAuth: false,
        },
        component: () => import('@/pages/task/taskDetail/TaskDetail.vue'),
      },
      {
        path: '/newArticle',
        name: 'newArticle',
        meta: {
          title: 'newArticle',
          keepAlive: true,
          requireAuth: false,
        },
        component: () => import('@/pages/article/newArticle/NewArticle.vue'),
      },
      {
        path: '/articleList',
        name: 'articleList',
        meta: {
          title: 'articleList',
          keepAlive: true,
          requireAuth: false,
        },
        component: () => import('@/pages/article/articleList/ArticleList.vue'),
      },
      {
        path: '/articleDetail',
        name: 'articleDetail',
        meta: {
          title: 'articleDetail',
          keepAlive: true,
          requireAuth: false,
        },
        component: () =>
          import('@/pages/article/articleDetail/ArticleDetail.vue'),
      },
      {
        path: '/chatBot',
        name: 'chatBot',
        meta: {
          title: 'chatBot',
          keepAlive: true,
          requireAuth: false,
        },
        component: () => import('@/pages/chatBot/ChatBot.vue'),
      },
      {
        path: '/codeSandBox',
        name: 'codeSandBox',
        meta: {
          title: 'codeSandBox',
          keepAlive: true,
          requireAuth: false,
        },
        component: () => import('@/pages/codeSandBox/CodeSandBox.vue'),
      },
      {
        path: '/flowChart',
        name: 'flowChart',
        meta: {
          title: 'flowChart',
          keepAlive: true,
          requireAuth: false,
        },
        component: () => import('@/pages/flowChart/FlowChart.vue'),
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 配置路由器
export function setupRouter(app: App<Element>) {
  app.use(router);
}
