// 클라이언트
export interface IUser {
  email: string;
  nickname: string;
  userType: string;
  money: number;
  id: string;
}

// 클라이언트
export interface IProduct {
  id: number;
  title: string;
  description: string;
  sellerId: number;
  buyerId: number | null;
  isSelling: boolean;
}
