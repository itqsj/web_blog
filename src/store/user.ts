import { defineStore } from 'pinia';
import { UserInfoInt } from '@/types/user';

interface StateInt {
  _token: string;
  _userInfo: UserInfoInt;
}

const userState: StateInt = {
  _token: '',
  _userInfo: {} as UserInfoInt,
};

export const useUserStore = defineStore('user', {
  // id必填，且需要唯一
  state: () => userState,
  getters: {
    getToken: (state) => state._token,
    getUserInfo: (state) => state._userInfo as UserInfoInt,
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
