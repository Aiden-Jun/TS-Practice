import {TypeUser} from '../specification/types.js';

// 서비스
export interface IUserDomain {
  get Email(): string;
}
export default class UserDomain implements IUserDomain {
  private email: string;
  private userID: string;
  private password: string;
  private nickname: string;
  private money: number;
  private userType: string;

  constructor(userInformation: TypeUser) {
    this.email = userInformation.email;
    this.userID = userInformation.userID;
    this.password = userInformation.password;
    this.nickname = userInformation.nickname;
    this.money = parseInt(userInformation.money);
    this.userType = userInformation.userType;
  }

  get Email() {
    return this.email;
  }

  get Password() {
    return this.password;
  }

  get Nickname() {
    return this.nickname;
  }

  get LoginUser(): IUser {
    const loginUser = {
      email: this.email,
      nickname: this.nickname,
      userType: this.userType,
      money: this.money,
      id: this.userID,
    };
    return loginUser;
  }
}

// 클라이언트
export interface IUser {
  email: string;
  nickname: string;
  userType: string;
  money: number;
  id: string;
}
