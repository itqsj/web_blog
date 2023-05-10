import { useCommonStore } from '@/store/common';
const commonStore = useCommonStore();

export const windowResize = () => {
  // 有关浏览器类型的信息都藏在USER-AGENT里面，首先读取navigator.userAgent里面的信息，为了方便利用toLowerCase方法转成小写的形式
  const sUserAgent: any = navigator.userAgent.toLowerCase();
  //调用match方法进行匹配属于哪一类浏览器，一下判断都是移动端浏览器
  const bIsIpad = sUserAgent.match(/ipad/i) == 'ipad';
  const bIsIphoneOs = sUserAgent.match(/iphone os/i) == 'iphone os';
  const bIsMidp = sUserAgent.match(/midp/i) == 'midp';
  const bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4';
  const bIsUc = sUserAgent.match(/ucweb/i) == 'ucweb';
  const bIsAndroid = sUserAgent.match(/android/i) == 'android';
  const bIsCE = sUserAgent.match(/windows ce/i) == 'windows ce';
  const bIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile';
  //如果匹配上面的浏览器就跳转打开移动端页面

  if (
    bIsIpad ||
    bIsIphoneOs ||
    bIsMidp ||
    bIsUc7 ||
    bIsUc ||
    bIsAndroid ||
    bIsCE ||
    bIsWM
  ) {
    //如果是移动端就跳转打开移动端页面
    commonStore.updateIsPhone(true);
  } else {
    if (window.innerWidth < 900) {
      commonStore.updateIsPhone(true);
    } else {
      //Pc端进入不需要其他操作
      commonStore.updateIsPhone(false);
    }
  }
};
