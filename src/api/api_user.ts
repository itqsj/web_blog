import http from './index';

import { UsersParamsInt, VerifyParamsInt } from '@/types/user';

// 登录
export function verifyToken(data: VerifyParamsInt) {
  return http({
    url: '/api/user/verifyToken',
    data,
  });
}

// 用户列表
export function userList(params: UsersParamsInt) {
  return http({
    url: '/api/user/list',
    method: 'get',
    params,
  });
}
