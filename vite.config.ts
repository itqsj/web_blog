import { defineConfig, splitVendorChunkPlugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import viteCompression from 'vite-plugin-compression';
import { Plugin as importToCDN, autoComplete } from 'vite-plugin-cdn-import';
// build视图依赖文件分析
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  resolve: {
    //设置别名
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    vue(),
    splitVendorChunkPlugin(),
    visualizer({
      emitFile: false,
      filename: 'stats.html', //分析图生成的文件名
      open: true, //如果存在本地非要我有端口，将在打包后自动展示
    }),
    viteCompression({
      verbose: true, //是否在控制台输出压缩结果
      disable: false, //是否禁用（开关）
      threshold: 1024, //体积大于1024才会被压缩
      algorithm: 'gzip', //压缩算法，可选【‘gzip’,'brotliCompress','deflate','deflateRaw',】
      ext: '.gz', //文件后缀
    }),
    importToCDN({
      modules: [
        autoComplete('lodash'),
        autoComplete('vue'),
        {
          name: 'vue-demi',
          var: 'VueDemi',
          path: `https://unpkg.com/vue-demi@0.13.11`,
        },
        // {
        //   name: 'vue',
        //   var: 'Vue',
        //   path: `https://unpkg.com/vue@3.2.45/dist/vue.global.js`,
        // },
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
          name: '@element-plus/icons-vue',
          var: 'ElementPlusIconsVue',
          path: '//unpkg.com/@element-plus/icons-vue',
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
        //   path: 'https://cdnjs.cloudflare.com/ajax/libs/Vue.Draggable/2.24.3/vuedraggable.umd.js',
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
        // {
        //   name: 'md-editor-v3',
        //   var: 'MdEditor',
        //   path: 'https://cdn.jsdelivr.net/npm/md-editor-v3@3.0.1/lib/md-editor-v3.umd.js',
        //   css: 'https://unpkg.com/md-editor-v3@3.0.1/lib/style.css',
        // },
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
  build: {
    outDir: 'dist', //输出
    minify: 'terser', //压缩方式
    terserOptions: {
      compress: {
        drop_console: true, //剔除console，debugger
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        //静态资源分类打包
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString();
          }
        },
      },
    },
  },
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
