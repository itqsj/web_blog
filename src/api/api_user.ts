import http from './index';

import { ParamsInt } from '@/types/index';
import { User, TokenInt, UserInfoInt, UsersDataRes } from '@/types/user';

interface VerifyRes extends User, TokenInt {}
// 登录
export function verifyToken(data: TokenInt) {
  return http<VerifyRes>({
    url: '/api/user/verifyToken',
    data,
  });
}

// 用户列表
export function userList(params: ParamsInt) {
  return http<UsersDataRes>({
    url: '/api/user/list',
    method: 'get',
    params,
  });
}

// 用户信息
export function userInfo() {
  return http<UserInfoInt>({
    url: '/api/user/info',
    method: 'get',
  });
}
