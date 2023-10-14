import AuthScreen, {IAuthScreen} from './auth-screen';
import HomeScreen, {IHomeScreen} from './home-screen';
import {ILoginUser} from '../Specification/interfaces';

export interface IStore {
  init(): Promise<void>;
}

export default class Store implements IStore {
  private authScreen: IAuthScreen;
  private homeScreen: IHomeScreen;
  private loginUser: ILoginUser | undefined;

  constructor() {
    this.authScreen = new AuthScreen();
    this.homeScreen = new HomeScreen();
  }

  async init() {
    const choice = await this.authScreen.showOptionPrompt();
    if (choice === 'login') {
      this.loginUser = await this.authScreen.signInUI();
      if (this.loginUser === undefined) {
        console.log('No accounts found, try again.');
        this.init();
      } else {
        this.homeScreen.homeUI(this.loginUser);
      }
    } else {
      const result = await this.authScreen.signUpUI();
      if (result === false) {
        this.authScreen.showOptionPrompt();
      } else {
        this.authScreen.signInUI();
      }
    }
  }
}
