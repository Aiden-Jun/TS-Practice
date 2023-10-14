import AuthService, {IAuthService} from './auth-service';

export interface IService {
  get AuthService(): IAuthService;
}

export default class Service implements IService {
  public static instance: Service;
  private authService: IAuthService;

  private constructor() {
    this.authService = new AuthService();
  }

  static get Instance() {
    if (Service.instance === undefined) {
      Service.instance = new Service();
    }
    return Service.instance;
  }

  get AuthService() {
    return this.authService;
  }
}
