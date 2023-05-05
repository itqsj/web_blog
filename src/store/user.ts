import { defineStore } from 'pinia';
import type { UserStateInt, UserInfoInt } from '@/types/user';

const userState: UserStateInt = {
  _token: '',
  _userInfo: null,
};

export const useUserStore = defineStore('user', {
  // id必填，且需要唯一
  state: () => userState,
  getters: {
    getToken: (state) => state._token,
    userInfo: (state) => state._userInfo,
  },
  actions: {
    updateToken(token: string) {
      this._token = token;
    },
    updateUserInfo(user: UserInfoInt) {
      this._userInfo = user;
    },
  },
});
