import { defineStore } from 'pinia';
import { isDark } from '@/composables';

export const useThemeStore = defineStore('theme', {
  // id必填，且需要唯一
  state: () => ({
    _themStyle: {
      light: {
        color: '#333',
        boxShadow:
          'rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem',
        background: '#ffffff',
        codeBg: '#f5f2f0',
      },
      dark: {
        color: 'rgb(255, 255, 255)',
        boxShadow:
          'rgb(0 0 0 / 14%) 0rem 0.125rem 0.125rem .1rem,rgb(0 0 0 / 20%) 0rem 0.1875rem 1rem -0.125rem,rgb(0 0 0 / 12%) 0rem 0.0625rem 0.3125rem 0rem',
        background: '#222f3e',
        codeBg: '#282a36',
      },
    },
  }),
  getters: {
    getThemStyle: (state) => {
      const tar = isDark.value ? 'dark' : 'light';
      return state._themStyle[tar];
    },
  },
  actions: {
    changeCodeLink() {
      // interface ReplaceLinkInt {
      //   oldEle: HTMLElement | null;
      //   newUrl: string;
      // }
      // 获取head元素
      // const head = document.getElementsByTagName('head')[0];
      // const assistDark =
      //   '//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/styles/atom-one-dark.min.css';
      // const assistLight =
      //   '//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.1/styles/vs.min.css';
      // const defaultDark =
      //   'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/dark.min.css';
      // const defaultLight =
      //   '//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css';
      // const oldUrl = isDark.value ? defaultLight : defaultDark;
      // const newUrl = isDark.value ? defaultDark : defaultLight;
      // const assistOldUrl = isDark.value ? assistLight : assistDark;
      // const assistNewUrl = isDark.value ? assistDark : assistLight;
      // const defaultEle: HTMLElement | null = document.querySelector(
      //   `link[href="${oldUrl}"]`,
      // );
      // const assistEle: HTMLElement | null = document.querySelector(
      //   `link[href="${assistOldUrl}"]`,
      // );
      // replaceLink({ oldEle: defaultEle, newUrl });
      // replaceLink({ oldEle: assistEle, newUrl: assistNewUrl });
      // function replaceLink({ oldEle, newUrl }: ReplaceLinkInt) {
      //   if (oldEle) {
      //     // 创建新的link元素
      //     const newLink = document.createElement('link');
      //     newLink.rel = 'stylesheet';
      //     newLink.type = 'text/css';
      //     newLink.href = newUrl;
      //     // 将新的link元素替换原有的link元素
      //     head.replaceChild(newLink, oldEle);
      //   } else {
      //     // 如果原有的link元素不存在，则创建新的link元素并添加到head元素中
      //     const newLink = document.createElement('link');
      //     newLink.rel = 'stylesheet';
      //     newLink.type = 'text/css';
      //     newLink.href = newUrl;
      //     head.appendChild(newLink);
      //   }
      // }
    },
  },
});
