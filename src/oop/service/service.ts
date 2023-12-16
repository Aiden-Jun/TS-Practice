import {IProduct} from '../specification/interfaces';
import AuthService, {IAuthService} from './auth-service';
import {IProductService, ProductService} from './product-service';

export interface IService {
  get Auth(): IAuthService;
  get Product(): IProductService;
}

export default class Service implements IService {
  private static instance: Service;
  private authService: IAuthService;
  private productService: IProductService;

  private constructor() {
    this.authService = new AuthService();
    this.productService = new ProductService();
  }

  static get Instance() {
    if (Service.instance === undefined) {
      Service.instance = new Service();
    }
    return Service.instance;
  }

  get Auth() {
    return this.authService;
  }

  get Product() {
    return this.productService;
  }
}
