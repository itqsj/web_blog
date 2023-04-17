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
