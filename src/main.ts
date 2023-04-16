import { createApp } from 'vue';
import '@/assets/css/reset.css';
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

app.mount('#app');
