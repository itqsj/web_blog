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
      },
      dark: {
        color: 'rgb(255, 255, 255)',
        boxShadow:
          'rgb(0 0 0 / 14%) 0rem 0.125rem 0.125rem 0rem,rgb(0 0 0 / 20%) 0rem 0.1875rem 0.0625rem -0.125rem,rgb(0 0 0 / 12%) 0rem 0.0625rem 0.3125rem 0rem',
        background: 'rgb(32, 41, 64)',
      },
    },
  }),
  getters: {
    getThemStyle: (state) => {
      const tar = isDark.value ? 'dark' : 'light';
      return state._themStyle[tar];
    },
  },
  actions: {},
});
