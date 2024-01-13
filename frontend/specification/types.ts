export type TLoginUser = {
  email: string;
  nickname: string;
};

export type TypeUser = {
  userID: string;
  email: string;
  password: string;
  nickname: string;
  money: string;
  userType: string;
};

export type TypeProduct = {
  productID: string;
  productName: string;
  productDescription: string;
  productPrice: string;
  sellingStatus: string;
  sellerID: string;
  buyerID: string;
};
