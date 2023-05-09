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
  __v?: number;
  _id: string;
}

export type UpdateUserInt = Partial<
  Pick<User, 'username' | 'email' | 'user_pic' | 'introduction' | 'background'>
>;

export interface UsersDataRes {
  count: number;
  page: number;
  pageSize: number;
  users: User[];
}

//verifyToken
export interface TokenInt {
  token: string;
}

// 团队
export interface TeamInt {
  create_at: string;
  name: string;
  users: Array<string>;
  _id: string;
}

export interface UserInfoInt extends User {
  team: TeamInt;
}

export interface UserStateInt {
  _token: string;
  _userInfo: UserInfoInt | null;
}

// 重置密码表单
export interface ResetPwdInt {
  oldPwd: string;
  newPwd: string;
  comfirmPwd: string;
  email?: string;
}
