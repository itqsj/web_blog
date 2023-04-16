import { defineStore } from 'pinia';
import { isDark } from '@/composables';

export const useThemeStore = defineStore('theme', {
  // id必填，且需要唯一
  state: () => ({
    _themStyle: {
      light: {
        color: '',
        boxShadow:
          'rgb(255 255 255 / 90%) 0px 0px 1px 1px inset,rgb(0 0 0 / 25%) 0px 20px 27px 0px',
        background: 'transparent',
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
