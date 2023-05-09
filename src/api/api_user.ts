import http from './index';

import { ParamsListInt } from '@/types/index';
import type {
  User,
  TokenInt,
  UserInfoInt,
  UsersDataRes,
  ResetPwdInt,
  UpdateUserInt,
} from '@/types/user';

interface VerifyRes extends User, TokenInt {}
// 登录
export function verifyToken(data: TokenInt) {
  return http<VerifyRes>({
    url: '/api/user/verifyToken',
    data,
  });
}

// 用户列表
export function userList(params: ParamsListInt) {
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

// 重置密码
export function resetPwd(data: ResetPwdInt) {
  return http({
    url: '/api/user/resetpwd',
    method: 'post',
    data,
  });
}

// 更改信息
export function updateInfo(data: UpdateUserInt) {
  return http({
    url: '/api/user/updateInfo',
    method: 'post',
    data,
  });
}
