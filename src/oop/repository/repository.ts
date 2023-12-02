import {IProductRepository, ProductRepository} from './product-repository';
import {IUserRepository, UserRepository} from './user-repository';

export interface IRepository {
  get User(): IUserRepository;
  get Product(): IProductRepository;
}

export class Repository implements IRepository {
  private userRepository: IUserRepository;
  private productRepository: IProductRepository;

  static instance: IRepository;
  static get Instance() {
    if (Repository.instance === undefined) {
      Repository.instance = new Repository();
    }
    return Repository.instance;
  }

  private constructor() {
    this.userRepository = new UserRepository();
    this.productRepository = new ProductRepository();
  }

  get User(): IUserRepository {
    return this.userRepository;
  }
  get Product(): IProductRepository {
    return this.productRepository;
  }
}
