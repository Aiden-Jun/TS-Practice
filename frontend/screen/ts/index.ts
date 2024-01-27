const main = async () => {
  const windowWidth = window.innerWidth;

  const signUpButton = window.document.getElementById('sign-up-button');
  const loginButton = window.document.getElementById('login-button');
  const loginButtonIn = window.document.getElementById('login-button-in');
  const backButtons = window.document.getElementsByClassName('back-button');

  const loginPage = window.document.getElementById('login-page');
  const indexPage = window.document.getElementById('index-page');
  const signUpPage = window.document.getElementById('sign-up-page');
  const emailInput = window.document.getElementById('email-input') as HTMLInputElement;
  const passwordInput = window.document.getElementById('password-input') as HTMLInputElement;

  const setUserProfile = () => {
    const nickNameProfile = window.document.getElementById('nick-name');
    nickNameProfile!.textContent = 'ASDBJBJBJBJ';
  };
  setUserProfile();

  if (signUpButton && indexPage && signUpPage) {
    signUpButton.addEventListener('click', () => {
      indexPage.style.display = 'none';
      signUpPage.style.display = 'block';
    });
  }

  if (loginButton && indexPage && loginPage) {
    loginButton.addEventListener('click', () => {
      indexPage.style.display = 'none';
      loginPage.style.display = 'block';
    });
  }

  if (loginButtonIn) {
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
  }

  if (backButtons && indexPage && loginPage && signUpPage) {
    for (let i = 0; i < backButtons.length; i++) {
      backButtons[i].addEventListener('click', () => {
        signUpPage.style.display = 'none';
        loginPage.style.display = 'none';
        indexPage.style.display = 'block';
      });
    }
  }

  emailInput.addEventListener('input', () => {
    console.log(emailInput.value);
  });
};
if (typeof window !== 'undefined') {
  main();
}
