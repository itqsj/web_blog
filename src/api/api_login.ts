import http from './index';
import { TokenInt } from '@/types/user';

interface ParamsInt {
  email: string;
  password: string;
}

// 登录
export function login(data: ParamsInt) {
  return http<TokenInt>({
    url: '/api/lg/login',
    data,
  });
}
