import http from './index';

interface ParamsInt {
  token?: string;
}

// 登录
export function verifyToken(data: ParamsInt) {
  return http({
    url: '/api/user/verifyToken',
    data,
  });
}
