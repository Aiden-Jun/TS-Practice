import AuthScreen, {IAuthScreen} from './auth-screen';

export interface IStore {
  init(): Promise<void>;
}

export default class Store {
  private authScreen: IAuthScreen;

  constructor() {
    this.authScreen = new AuthScreen();
  }

  async init() {}
}
