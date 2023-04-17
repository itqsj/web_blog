import http from './index';

interface ParamsInt {
  email: string;
  password: string;
}

// 登录
export function login(data: ParamsInt) {
  return http({
    url: '/api/lg/login',
    data,
  });
}
