import {ILoginUser} from '../../specification/interfaces.js';

export interface IAuthScreen {
  showIndexPage(): void;
  showSignInPage(): void;
  showSignUpPage(): void;
}

export default class AuthScreen implements IAuthScreen {
  private indexPage: HTMLElement | null;
  private loginPage: HTMLElement | null;
  private signUpPage: HTMLElement | null;

  private signUpButton: HTMLElement | null;
  private loginButton: HTMLElement | null;
  private loginButtonIn: HTMLElement | null;
  private backButtons: HTMLCollectionOf<Element> | null;

  private emailInput: HTMLElement | null;
  private passwordInput: HTMLElement | null;

  constructor() {
    this.indexPage = window.document.getElementById('index-page');
    this.loginPage = window.document.getElementById('login-page');
    this.signUpPage = window.document.getElementById('sign-up-page');

    this.signUpButton = window.document.getElementById('sign-up-button');
    this.loginButton = window.document.getElementById('login-button');
    this.loginButtonIn = window.document.getElementById('login-button-in');
    this.backButtons = window.document.getElementsByClassName('back-button');

    this.emailInput = window.document.getElementById('email-input') as HTMLInputElement;
    this.passwordInput = window.document.getElementById('password-input') as HTMLInputElement;
  }

  showIndexPage = () => {
    if (this.indexPage && this.loginPage && this.signUpPage) {
      this.indexPage.style.display = 'block';
      this.loginPage.style.display = 'none';
      this.signUpPage.style.display = 'none';
    }
  };

  showSignInPage = () => {
    if (this.indexPage && this.loginPage && this.signUpPage) {
      this.indexPage.style.display = 'none';
      this.loginPage.style.display = 'block';
      this.signUpPage.style.display = 'none';
    }
  };

  signIn = () => {
    loginButtonIn.addEventListener('click', async () => {
      console.log(emailInput.value);
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST', // GET POST PUT PATCH DELETE
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          email: emailInput.value,
          password: passwordInput.value,
        }),
      });
      const result = await res.json();
      console.log(result);
    });
  };

  showSignUpPage = () => {
    if (this.indexPage && this.loginPage && this.signUpPage) {
      this.indexPage.style.display = 'none';
      this.loginPage.style.display = 'none';
      this.signUpPage.style.display = 'block';
    }
  };
}
