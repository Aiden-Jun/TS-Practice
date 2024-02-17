import AuthScreen, {IAuthScreen} from './auth-screen.js';
import HomeScreen, {IHomeScreen} from './home-screen.js';

export default class App {
  private authScreen: IAuthScreen;
  private homeScreen: IHomeScreen;
  private indexPage: HTMLElement;
  private loginPage: HTMLElement;
  private signUpPage: HTMLElement;

  constructor() {
    this.authScreen = new AuthScreen();
    this.homeScreen = new HomeScreen();
    this.indexPage = window.document.getElementById('index-page') as HTMLElement;
    this.loginPage = window.document.getElementById('login-page') as HTMLElement;
    this.signUpPage = window.document.getElementById('sign-up-page') as HTMLElement;
  }

  async main() {
    this.authScreen.showIndexPage();
  }
}
