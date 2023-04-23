import http from './index';

import { TokenInt } from '@/types/user';
import { ParamsInt } from '@/types/index';

// 登录
export function verifyToken(data: TokenInt) {
  return http({
    url: '/api/user/verifyToken',
    data,
  });
}

// 用户列表
export function userList(params: ParamsInt) {
  return http({
    url: '/api/user/list',
    method: 'get',
    params,
  });
}

// 用户信息
export function userInfo() {
  return http({
    url: '/api/user/info',
    method: 'get',
  });
}
