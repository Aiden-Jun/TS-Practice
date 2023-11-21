export interface IUser {
  get Email(): string;
}
export default class User implements IUser {
  private email: string;
  private password: string;
  private nickname: string;

  constructor(email: string, password: string, nickname: string) {
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
