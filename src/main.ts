import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from '@/router';
import store from './store';

const app = createApp(App);
app.use(router);
// 挂载pinia
app.use(store);

app.mount('#app');
