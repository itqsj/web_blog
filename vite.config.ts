import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import viteCompression from 'vite-plugin-compression';
import { Plugin as importToCDN } from 'vite-plugin-cdn-import';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    //设置别名
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    vue(),
    // viteCompression(),
    importToCDN({
      modules: [
        {
          name: 'vue',
          var: 'Vue',
          path: `https://unpkg.com/vue@3.2.45/dist/vue.global.js`,
        },
        {
          name: 'vue-demi',
          var: 'VueDemi',
          path: `https://unpkg.com/vue-demi@0.13.11`,
        },
        {
          name: 'pinia',
          var: 'Pinia',
          path: 'dist/pinia.iife.min.js',
        },
        {
          name: 'vue-router',
          var: 'VueRouter',
          path: `https://unpkg.com/vue-router@4.1.6`,
        },
        {
          name: 'element-plus',
          var: 'ElementPlus',
          path: 'https://unpkg.com/element-plus@2.3.3/dist/index.full.js',
          css: '//unpkg.com/element-plus/dist/index.css',
        },
        {
          name: 'vuetify',
          var: 'Vuetify',
          path: 'https://cdnjs.cloudflare.com/ajax/libs/vuetify/3.1.13/vuetify.min.js',
          css: 'https://cdnjs.cloudflare.com/ajax/libs/vuetify/3.1.13/vuetify-labs.min.css',
        },
        {
          name: 'echarts',
          var: 'echarts',
          path: 'https://cdn.jsdelivr.net/npm/echarts@5.4.2/dist/echarts.min.js',
        },
        // {
        //   name: 'vuedraggable',
        //   var: 'draggable',
        //   path: 'https://cdnjs.cloudflare.com/ajax/libs/Vue.Draggable/2.20.0/vuedragga1ble.umd.min.js',
        // },
        // {
        //   name: 'vue-advanced-cropper',
        //   var: 'vue-advanced-cropper',
        //   path: 'https://unpkg.com/vue-advanced-cropper@^2.0.0/dist/index.umd.js',
        //   css: 'https://unpkg.com/vue-advanced-cropper@^2.0.0/dist/style.css',
        // },
        {
          name: 'jsencrypt',
          var: 'JSEncrypt',
          path: 'https://cdnjs.cloudflare.com/ajax/libs/jsencrypt/3.3.2/jsencrypt.min.js',
        },
        {
          name: 'highlight.js',
          var: 'hljs',
          path: '//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js',
        },
        {
          name: 'axios',
          var: 'axios',
          path: 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js',
        },
      ],
    }),
  ],
  server: {
    port: 8080, //启动端口
    hmr: {
      host: '127.0.0.1',
      port: 8080,
    },
    // 设置 https 代理
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3007',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ''),
      },
    },
  },
});
