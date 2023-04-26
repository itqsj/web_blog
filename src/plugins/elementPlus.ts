import ElementPlus from 'element-plus';
import type { App } from 'vue';

// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

export function setupElementPlusIcon(app: App<Element>) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
  app.use(ElementPlus);
}

export function setupElementPlus(app: App<Element>) {
  app.use(ElementPlus);
}
