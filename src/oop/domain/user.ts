export interface IUser {
  get Email(): string;
}
export default class User implements IUser {
  private email: string;
  private password: string;
  private nickname: string;

  constructor(
    userID: string,
    email: string,
    password: string,
    nickname: string,
    money: number,
    usertType: string,
  ) {
    this.email = email;
    this.password = password;
    this.nickname = nickname;
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
