import { ref } from 'vue';
import intersectionBy from 'lodash/intersectionBy';
import xorWith from 'lodash/xorWith';
import isEqual from 'lodash/isEqual';

export function useDefer<T>() {
  const list = ref<Array<T>>([]);

  const addToDefer = (newList: Array<T>, callback?: () => void) => {
    return new Promise((resolve) => {
      const start = Date.now();
      requestAnimationFrame(() => {
        if (!newList.length) {
          return resolve(true);
        }

        //16.6 一帧，有空时再做
        if (Date.now() - start < 16.6) {
          const item = newList.shift();
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          list.value.push(item);
          callback && callback();
          return resolve(addToDefer(newList, callback));
        } else {
          return resolve(addToDefer(newList, callback));
        }
      });
    });
  };

  const resetList = async (newList: Array<T>, callback: () => void) => {
    if (list.value.length) {
      list.value = intersectionBy(list.value, newList, '_id');
      callback && callback();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const addList = xorWith(list.value, newList, isEqual); //获取两个数组对象的补集
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await addToDefer(addList, callback);
    } else {
      await addToDefer(newList, callback);
    }
  };

  return { list, addToDefer, resetList };
}
