import AuthScreen, {IAuthScreen} from './auth-screen.js';
import HomeScreen, {IHomeScreen} from './home-screen.js';
import {IUser} from '../../specification/interfaces.js';

export default class App {
  private authScreen: IAuthScreen;
  private homeScreen: IHomeScreen;
  private loginButtonIn: HTMLElement;
  private logOutButton: HTMLElement;
  private user: IUser | undefined;

  constructor() {
    this.authScreen = new AuthScreen();
    this.homeScreen = new HomeScreen();
    this.loginButtonIn = window.document.getElementById('login-button-in') as HTMLElement;
    this.logOutButton = window.document.getElementById('home-logout-button') as HTMLElement;
    this.loginButtonIn.addEventListener('click', async () => {
      this.user = await this.authScreen.signIn();
      if (this.user === undefined) {
        alert('Bad email or password');
      } else {
        this.authScreen.turnOff();
        this.homeScreen.showHomePage(this.user);
      }
    });
    this.logOutButton.addEventListener('click', () => {
      this.homeScreen.logout();
      this.authScreen.showIndexPage();
      this.homeScreen.turnOff();
    });
  }

  async main() {
    this.authScreen.showIndexPage();
  }
}
