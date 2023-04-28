import http from './index';
import type { TokenInt } from '@/types/user';
import type { EncryptedInt } from '@/types/index';

// 登录
export function login(data: EncryptedInt) {
  return http<TokenInt>({
    url: '/api/lg/login',
    data,
  });
}
