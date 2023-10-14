import {ILoginUser} from '../Specification/interfaces';

export interface IAuthService {
  checkEmailExistence(entEmail: string): Promise<boolean>;
  addUser(): void;
  getUser(): ILoginUser | undefined;
}

export default class AuthService implements IAuthService {
  addUser(): void {}
  checkEmailExistence = async (): Promise<boolean> => {
    return true;
  };
  getUser(): ILoginUser | undefined {
    return;
  }
}
