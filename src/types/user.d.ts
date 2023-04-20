export interface ResVerifyInt {
  code: number;
  data: ResVerifyDataInt;
}

export interface ResVerifyDataInt {
  email: string;
  exp: number;
  iat: number;
  id: number;
  nickname: string;
  password: string;
  token: string;
  user_pic: string;
  username: string;
}

export interface TabsInt {
  label: string;
  value: string | number;
}

//用户
export interface User {
  background: string;
  createdAt: string;
  email: string;
  introduction: string;
  user_pic: string;
  username: string;
  __v: number;
  _id: string;
}

// 请求返回
export interface UsersRes {
  data: UsersDataRes;
  message: string;
  code: number;
}

export interface UsersDataRes {
  count: number;
  page: number;
  pageSize: number;
  users: User[];
}

// 请求
//获取用户列表
export interface UsersParamsInt {
  page: number;
  pageSize: number;
}

//verifyToken
export interface VerifyParamsInt {
  token: string;
}
