// 请求列表
export interface ParamsInt<> {
  page: number;
  pageSize: number;
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
