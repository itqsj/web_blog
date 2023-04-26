import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from '@/router';
import { setupStore } from './store';
import { setupVuetify } from '@/plugins/vuetify';
import { setupElementPlus, setupElementPlusIcon } from '@/plugins/elementPlus';

// 公共样式
import '@/assets/css/reset.css';
import '@/assets/css/global.less';
import './style.css';
// element ui
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import '@/assets/css/theme.less';
// vuetify
import 'vuetify/styles';

const app = createApp(App);
// 挂载路由
setupRouter(app);
// 挂载pinia
setupStore(app);
//挂载ElementPlus
setupElementPlus(app);
//挂载ElementPlusIcon
setupElementPlusIcon(app);
// 挂载vuetify
setupVuetify(app);

app.mount('#app');
