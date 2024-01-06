import {TypeUser} from '../specification/types';

export interface IUser {
  get Email(): string;
}
export default class User implements IUser {
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
}
