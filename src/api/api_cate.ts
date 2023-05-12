import http from './index';
import { ParamsListInt } from '@/types/index';
import type { CateInt } from '@/types/cate';
import type { DataInt } from '@/types/index';

// 分类列表
export function cateList(params: ParamsListInt) {
  return http<DataInt<CateInt[]>>({
    url: '/cate/list',
    params,
    method: 'get',
  });
}
