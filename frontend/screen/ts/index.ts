const main = async () => {
  const windowWidth = window.innerWidth;

  const buttonList = window.document.getElementsByClassName(
    'button',
  ) as HTMLCollectionOf<HTMLElement>;
  const buttonWidth = buttonList[0].clientWidth;
  const calcMargin = (windowWidth - buttonWidth) / 2;
  for (let i = 0; i < buttonList.length; i++) {
    buttonList[i].style.marginLeft = `${calcMargin}px`;
    buttonList[i].style.marginRight = `${calcMargin}px`;
  }

  const signUpButton = window.document.getElementById('sign-up-button');
  const indexPage = window.document.getElementById('index-page');
  const signUpPage = window.document.getElementById('sign-up-page');
  if (signUpButton) {
    signUpButton.addEventListener('click', () => {
      location.href = 'auth.html';
    });
  }

  const emailInput = window.document.getElementById('email-input') as HTMLInputElement;
  emailInput.addEventListener('input', () => {
    console.log(emailInput.value);
  });

  const confirmButton = window.document.getElementById('confirm-button');

  // 서버 연결 테스트
  const getButton = window.document.getElementById('get-button');
  if (getButton) {
    getButton.addEventListener('click', async () => {
      const res = await fetch('http://localhost:3000', {
        method: 'GET',
      });
      const result = await res.json();
      console.log(result);
    });
  }

  const postButton = window.document.getElementById('post-button');
  if (postButton) {
    postButton.addEventListener('click', async () => {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST', // GET POST PUT PATCH DELETE
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          email: 'xxx@xxx.com',
          password: 1234,
        }),
      });
      const result = await res.json();
      console.log(result);
    });
  }
};

if (typeof window !== 'undefined') {
  main();
}
