import AuthScreen, {IAuthScreen} from './auth-screen.js';
import HomeScreen, {IHomeScreen} from './home-screen.js';
import {ILoginUser} from '../../specification/interfaces.js';

export default class App {
  private authScreen: IAuthScreen;
  private homeScreen: IHomeScreen;
  private loginButtonIn: HTMLElement;
  private user: ILoginUser | undefined;

  constructor() {
    this.authScreen = new AuthScreen();
    this.homeScreen = new HomeScreen();
    this.loginButtonIn = window.document.getElementById('login-button-in') as HTMLElement;
    this.loginButtonIn.addEventListener('click', async () => {
      this.user = await this.authScreen.signIn();
      if (this.user === undefined) {
        alert('Bad email or password');
      } else {
        this.authScreen.turnOff();
        this.homeScreen.setUserProfile(this.user);
        this.homeScreen.showHomePage();
      }
    });
  }

  async main() {
    this.authScreen.showIndexPage();
  }
}
