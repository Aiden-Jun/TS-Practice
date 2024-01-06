// import Store from './oop/ui/store';

const main = async () => {
  // console.log('store 앱을 실행합니다');
  // const store = new Store();
  // await store.init();

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
};

if (typeof window !== 'undefined') {
  main();
}
