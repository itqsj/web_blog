import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  // id必填，且需要唯一
  state: () => ({
    _token: '',
  }),
  getters: {
    token: (state) => state._token,
  },
  actions: {
    updateToken(token: string) {
      this._token = token;
    },
  },
});
