export interface ILoginUser {
  id: string;
  email: string;
  nickname: string;
  money: number;
  userType: 'seller' | 'buyer';
}

export interface IProduct {
  id: string;
  title: string;
}
