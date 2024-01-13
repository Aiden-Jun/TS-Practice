import {IProductRepository, ProductRepository} from './product-repository.js';
import {IUserRepository, UserRepository} from './user-repository.js';

export interface IRepository {
  get User(): IUserRepository;
  get Product(): IProductRepository;
}

export class Repository implements IRepository {
  private userRepository: IUserRepository;
  private productRepository: IProductRepository;

  private static instance: IRepository;
  static get Instance() {
    if (Repository.instance === undefined) {
      Repository.instance = new Repository();
    }
    return Repository.instance;
  }

  private constructor() {
    this.userRepository = new UserRepository('users.csv');
    this.productRepository = new ProductRepository();
  }

  get User(): IUserRepository {
    return this.userRepository;
  }
  get Product(): IProductRepository {
    return this.productRepository;
  }
}
