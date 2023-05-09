// 请求列表
export interface ParamsListInt<> {
  page: number;
  pageSize: number;
  keyWord?: string;
  ids?: Array<string>;
}

// 结果
export interface ResInt<T> {
  code: number;
  message: string;
  data: T;
}

export interface DataInt<T> {
  count: number;
  list: T;
  page: number;
  pageSize: number;
}

interface EncryptedInt {
  cryptData: string;
}
