import { createApp } from 'vue';
import '@/assets/css/reset.css';
import '@/assets/css/global.less';
import './style.css';
import App from './App.vue';
import router from '@/router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App);
app.use(router);
// 挂载pinia
app.use(store);
//挂载ElementPlus
app.use(ElementPlus);

// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount('#app');
