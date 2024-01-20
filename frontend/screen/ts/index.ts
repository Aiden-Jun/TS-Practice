const main = async () => {
  const windowWidth = window.innerWidth;

  const signUpButton = window.document.getElementById('sign-up-button');
  const loginButton = window.document.getElementById('login-button');
  const loginButtonIn = window.document.getElementById('login-button-in');
  const backButton = window.document.getElementById('back-button-login');
  const loginPage = window.document.getElementById('login-page');
  const indexPage = window.document.getElementById('index-page');
  const signUpPage = window.document.getElementById('sign-up-page');
  const emailInput = window.document.getElementById('email-input') as HTMLInputElement;
  const passwordInput = window.document.getElementById('password-input') as HTMLInputElement;

  if (signUpButton) {
    signUpButton.addEventListener('click', () => {
      location.href = 'auth.html';
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

  if (backButton && indexPage && loginPage) {
    backButton.addEventListener('click', () => {
      loginPage.style.display = 'none';
      indexPage.style.display = 'block';
    });
  }

  emailInput.addEventListener('input', () => {
    console.log(emailInput.value);
  });
};
if (typeof window !== 'undefined') {
  main();
}
