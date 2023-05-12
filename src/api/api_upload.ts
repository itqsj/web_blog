import http from './index';
import { FileResInt } from '@/types/upload';

// 上传文件
export function uploadFile(data: FormData) {
  return http<FileResInt>({
    url: '/upload/file',
    headers: { 'Content-Type': 'multipart/form-data' },
    data,
  });
}
