import {IRepository, Repository} from '../repository/repository';
import {ILoginUser} from '../specification/interfaces';

export interface IAuthService {
  checkEmailExistence(entEmail: string): Promise<boolean>;
  addUser(email: string, password: string, name: string, usertype: string): void;
  getUser(email: string, password: string): ILoginUser | undefined;
  doesThisEmailExist(email: string): Promise<boolean>;
}

export default class AuthService implements IAuthService {
  private repository: IRepository;

  constructor() {
    this.repository = Repository.Instance;
  }

  async doesThisEmailExist(email: string): Promise<boolean> {
    const userRepository = this.repository.User;
    const user = await userRepository.findUserByEmail(email);
    console.log(user);
    if (user) {
      return true;
    } else {
      return false;
    }
  }
  addUser(email: string, password: string, name: string, userType: string): void {
    const user_repository = this.repository.User;
    user_repository.createUser(email, password, name, userType);
  }
  checkEmailExistence = async (): Promise<boolean> => {
    return true;
  };
  getUser(): ILoginUser | undefined {
    return;
  }
}
