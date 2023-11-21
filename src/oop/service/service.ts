import AuthService, {IAuthService} from './auth-service';
import {IBaseService} from './base-service';

export interface IService {
  get AuthService(): IAuthService;
}

export default class Service implements IService {
  public static instance: Service;
  private authService: IAuthService;
  private serviceMap = new Map<string, IBaseService>();

  private constructor() {
    this.serviceMap.set('service', new AuthService());
  }

  static get Instance() {
    if (Service.instance === undefined) {
      Service.instance = new Service();
    }
    return Service.instance;
  }

  get AuthService() {
    return this.serviceMap.get('service') as IAuthService;
  }
}
