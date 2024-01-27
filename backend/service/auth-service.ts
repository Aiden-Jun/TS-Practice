import {IRepository, Repository} from '../repository/repository.js';
import {IUserRepository, UserRepository} from '../repository/user-repository.js';
import {ILoginUser} from '../specification/interfaces.js';

export interface IAuthService {
  addUser(email: string, password: string, name: string, usertype: string): void;

  getUser(email: string, password: string): Promise<ILoginUser | undefined>;

  doesThisEmailExist(email: string): Promise<boolean>;
}

export default class AuthService implements IAuthService {
  private repository: IRepository;
  private userRepository: IUserRepository;

  constructor() {
    this.repository = Repository.Instance;
    this.userRepository = this.repository.User;
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
    const userRepository = this.repository.User;
    userRepository.createUser(email, password, name, userType);
  }

  async getUser(email: string, password: string): Promise<ILoginUser | undefined> {
    const user = await this.userRepository.findUserByEmailAndPassword(email, password);
    if (user === undefined) {
      return;
    }

    return user.LoginUser;
  }
}
