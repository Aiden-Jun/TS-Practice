import {IProduct} from '../specification/interfaces';
import AuthService, {IAuthService} from './auth-service';
import {IBaseService} from './base-service';
import {IProductService, ProductService} from './product-service';

export interface IService {
  get Auth(): IAuthService;
  get Product(): IProductService;
}

export default class Service implements IService {
  public static instance: Service;
  private serviceMap = new Map<string, IBaseService>();

  private constructor() {
    this.serviceMap.set('auth', new AuthService());
    this.serviceMap.set('product', new ProductService());
  }

  static get Instance() {
    if (Service.instance === undefined) {
      Service.instance = new Service();
    }
    return Service.instance;
  }

  get Auth() {
    return this.serviceMap.get('auth') as IAuthService;
  }

  get Product() {
    return this.serviceMap.get('product') as IProductService;
  }
}
