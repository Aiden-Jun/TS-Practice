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
  turnOff(): void;
}
export default class AuthScreen implements IAuthScreen {
  private indexPage: HTMLElement;
  private loginPage: HTMLElement;
  private signUpPage: HTMLElement;

  private signUpButton: HTMLElement;
  private signUpButtonIn: HTMLElement;
  private loginButton: HTMLElement;
  private loginButtonIn: HTMLElement;
  private backButtons: HTMLCollectionOf<Element>;

  private nickname: HTMLInputElement;
  private userType: HTMLInputElement;
  private money: HTMLInputElement;

  private emailInput: HTMLInputElement;
  private passwordInput: HTMLInputElement;

  private emailInputSignUp: HTMLInputElement;
  private passwordInputSignUp: HTMLInputElement;

  constructor() {
    this.indexPage = window.document.getElementById('index-page') as HTMLElement;
    this.loginPage = window.document.getElementById('login-page') as HTMLElement;
    this.signUpPage = window.document.getElementById('sign-up-page') as HTMLElement;
    this.signUpButton = window.document.getElementById('sign-up-button') as HTMLElement;
    this.signUpButtonIn = window.document.getElementById('sign-up-button-in') as HTMLElement;
    this.loginButton = window.document.getElementById('login-button') as HTMLElement;
    this.loginButtonIn = window.document.getElementById('login-button-in') as HTMLElement;
    this.backButtons = window.document.getElementsByClassName(
      'back-button',
    ) as HTMLCollectionOf<Element>;

    this.emailInputSignUp = window.document.getElementById(
      'email-input-signup',
    ) as HTMLInputElement;
    this.passwordInputSignUp = window.document.getElementById(
      'password-input-signup',
    ) as HTMLInputElement;
    this.nickname = window.document.getElementById('nickname') as HTMLInputElement;
    this.userType = window.document.getElementById('user-type') as HTMLInputElement;
    this.money = window.document.getElementById('money') as HTMLInputElement;
    this.emailInput = window.document.getElementById('email-input') as HTMLInputElement;
    this.passwordInput = window.document.getElementById('password-input') as HTMLInputElement;

    this.addEventListeners();
  }

  addEventListeners() {
    this.loginButton.addEventListener('click', () => {
      this.showSignInPage();
    });
    for (let i = 0; i < this.backButtons.length; i++) {
      this.backButtons[i].addEventListener('click', () => {
        this.showIndexPage();
      });
    }
    this.signUpButton.addEventListener('click', () => {
      this.showSignUpPage();
    });
    this.signUpButtonIn.addEventListener('click', async () => {
      if (this.userType.value !== 'seller' || this.userType.value !== 'seller') {
        alert('wrong usertype');
        return;
      }
      const result = await this.signUp(
        this.emailInputSignUp.value,
        this.passwordInputSignUp.value,
        this.nickname.value,
        this.userType.value,
        parseInt(this.money.value),
      );

      if (result) {
      } else {
      }
    });
    this.loginButtonIn.addEventListener('click', async () => {
      const user = await this.signIn(this.emailInput.value, this.passwordInput.value);
      console.log(user);
      if (user === undefined) {
        alert('Bad email or password');
      } else {
        this.turnOff();
        // this.setUserProfile(user);
        // this.showHomePage();
      }
    });
  }

  showIndexPage() {
    if (this.indexPage && this.loginPage && this.signUpPage) {
      this.indexPage.style.display = 'block';
      this.loginPage.style.display = 'none';
      this.signUpPage.style.display = 'none';
    }
  }

  showSignUpPage() {
    if (this.indexPage && this.loginPage && this.signUpPage) {
      this.indexPage.style.display = 'none';
      this.loginPage.style.display = 'none';
      this.signUpPage.style.display = 'block';
    }
  }

  showSignInPage() {
    if (this.indexPage && this.loginPage && this.signUpPage) {
      this.indexPage.style.display = 'none';
      this.loginPage.style.display = 'block';
      this.signUpPage.style.display = 'none';
    }
  }

  turnOff() {
    if (this.indexPage && this.loginPage && this.signUpPage) {
      this.indexPage.style.display = 'none';
      this.loginPage.style.display = 'none';
      this.signUpPage.style.display = 'none';
    }
  }

  async signIn(email: string, password: string) {
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
  }

  async signUp(
    email: string,
    password: string,
    nickname: string,
    userType: 'seller' | 'buyer',
    money: number,
  ) {
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
  }

  setUserProfile(user: ILoginUser) {
    const nickNameProfile = window.document.getElementById('nick-name');
    nickNameProfile!.textContent = user.nickname;
  }
}
