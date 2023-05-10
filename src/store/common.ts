import { defineStore } from 'pinia';

interface CommonStateInt {
  isPhone: boolean;
  showAside: boolean;
}

const commonState: CommonStateInt = {
  isPhone: false,
  showAside: true,
};

export const useCommonStore = defineStore('common', {
  // id必填，且需要唯一
  state: () => commonState,
  getters: {
    getIsPhone: (state) => state.isPhone,
    isShowAside: (state) => state.showAside,
  },
  actions: {
    updateIsPhone(isPhone: boolean) {
      this.isPhone = isPhone;
    },
    updateShowAside(showAside: boolean) {
      this.showAside = showAside;
    },
  },
});
