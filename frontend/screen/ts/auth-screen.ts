import {ILoginUser} from '../../specification/interfaces.js';

export interface IAuthScreen {
  showIndexPage(): void;
  showSignInPage(): void;
  showSignUpPage(): void;
  signIn(email: string, password: string): Promise<ILoginUser | undefined>;
  signUp(
    email: string,
    password: string,
    nickname: string,
    userType: 'seller' | 'buyer',
    money: number,
  ): Promise<boolean>;
}

export default class AuthScreen implements IAuthScreen {
  private indexPage: HTMLElement | null;
  private loginPage: HTMLElement | null;
  private signUpPage: HTMLElement | null;

  private signUpButton: HTMLElement | null;
  private loginButton: HTMLElement | null;
  private loginButtonIn: HTMLElement | null;
  private backButtons: HTMLCollectionOf<Element> | null;

  constructor() {
    this.indexPage = window.document.getElementById('index-page');
    this.loginPage = window.document.getElementById('login-page');
    this.signUpPage = window.document.getElementById('sign-up-page');
    this.signUpButton = window.document.getElementById('sign-up-button');
    this.loginButton = window.document.getElementById('login-button');
    this.loginButtonIn = window.document.getElementById('login-button-in');
    this.backButtons = window.document.getElementsByClassName('back-button');
  }

  showIndexPage = () => {
    if (this.indexPage && this.loginPage && this.signUpPage) {
      this.indexPage.style.display = 'block';
      this.loginPage.style.display = 'none';
      this.signUpPage.style.display = 'none';
    }
  };

  showSignUpPage = () => {
    if (this.indexPage && this.loginPage && this.signUpPage) {
      this.indexPage.style.display = 'none';
      this.loginPage.style.display = 'none';
      this.signUpPage.style.display = 'block';
    }
  };

  showSignInPage = () => {
    if (this.indexPage && this.loginPage && this.signUpPage) {
      this.indexPage.style.display = 'none';
      this.loginPage.style.display = 'block';
      this.signUpPage.style.display = 'none';
    }
  };

  turnOff = () => {
    if (this.indexPage && this.loginPage && this.signUpPage) {
      this.indexPage.style.display = 'none';
      this.loginPage.style.display = 'none';
      this.signUpPage.style.display = 'none';
    }
  };

  signIn = async (email: string, password: string) => {
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST', // GET POST PUT PATCH DELETE
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const {user}: {user: ILoginUser | undefined} = await res.json();
    return user;
  };

  signUp = async (
    email: string,
    password: string,
    nickname: string,
    userType: 'seller' | 'buyer',
    money: number,
  ) => {
    const res = await fetch('http://localhost:3000/sign-up', {
      method: 'POST', // GET POST PUT PATCH DELETE
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        email,
        password,
        nickname,
        userType,
        money,
      }),
    });
    const {isSignedUp}: {isSignedUp: boolean} = await res.json();
    return isSignedUp;
  };

  setUserProfile = (user: ILoginUser) => {
    const nickNameProfile = window.document.getElementById('nick-name');
    nickNameProfile!.textContent = user.nickname;
  };
}
