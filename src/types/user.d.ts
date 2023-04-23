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
