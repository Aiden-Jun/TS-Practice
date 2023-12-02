import {Repository} from '../repository/repository';
import {ILoginUser} from '../specification/interfaces';
import BaseService from './base-service';

export interface IAuthService {
  checkEmailExistence(entEmail: string): Promise<boolean>;
  addUser(email: string, password: string, name: string, usertype: string): void;
  getUser(email: string, password: string): ILoginUser | undefined;
  doesThisEmailExist(email: string): boolean;
}

export default class AuthService extends BaseService implements IAuthService {
  addUser(): void {}
  checkEmailExistence = async (): Promise<boolean> => {
    return true;
  };
  getUser(): ILoginUser | undefined {
    return;
  }
}
