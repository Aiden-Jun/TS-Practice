import AuthScreen from './auth-screen.js';
import HomeScreen from './home-screen.js';

export default class App {
  main = async () => {
    const windowWidth = window.innerWidth;

    const signUpButton = window.document.getElementById('sign-up-button') as HTMLElement;
    const signUpButtonIn = window.document.getElementById('sign-up-button-in') as HTMLElement;
    const loginButton = window.document.getElementById('login-button') as HTMLElement;
    const loginButtonIn = window.document.getElementById('login-button-in') as HTMLElement;
    const backButtons = window.document.getElementsByClassName('back-button');
    const emailInputSignUp = window.document.getElementById(
      'email-input-signup',
    ) as HTMLInputElement;
    const passwordInputSignUp = window.document.getElementById(
      'password-input-signup',
    ) as HTMLInputElement;
    const nickname = window.document.getElementById('nickname') as HTMLInputElement;
    const userType = window.document.getElementById('user-type') as HTMLInputElement;
    const money = window.document.getElementById('money') as HTMLInputElement;

    const loginPage = window.document.getElementById('login-page');
    const indexPage = window.document.getElementById('index-page');
    const signUpPage = window.document.getElementById('sign-up-page');
    const emailInput = window.document.getElementById('email-input') as HTMLInputElement;
    const passwordInput = window.document.getElementById('password-input') as HTMLInputElement;
    const authScreen = new AuthScreen();
    const homeScreen = new HomeScreen();
    authScreen.showIndexPage();

    loginButton.addEventListener('click', () => {
      authScreen.showSignInPage();
    });

    for (let i = 0; i < backButtons.length; i++) {
      backButtons[i].addEventListener('click', () => {
        authScreen.showIndexPage();
      });
    }

    signUpButton.addEventListener('click', () => {
      authScreen.showSignUpPage();
    });

    signUpButtonIn.addEventListener('click', async () => {
      if (userType.value !== 'seller' || userType.value !== 'seller') {
        alert('wrong usertype');
        return;
      }
      const result = await authScreen.signUp(
        emailInputSignUp.value,
        passwordInputSignUp.value,
        nickname.value,
        userType.value,
        parseInt(money.value),
      );

      if (result) {
      } else {
      }
    });

    loginButtonIn.addEventListener('click', async () => {
      const user = await authScreen.signIn(emailInput.value, passwordInput.value);
      console.log(user);
      if (user === undefined) {
        alert('Bad email or password');
      } else {
        authScreen.turnOff();
        homeScreen.setUserProfile(user);
        homeScreen.showHomePage();
      }
    });
  };
}
