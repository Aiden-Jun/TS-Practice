import {ILoginUser} from '../../specification/interfaces.js';

export interface IHomeScreen {
  homeUI(loginUser: ILoginUser): void;
  buyerMainUI(): void;
  setUserProfile(user: ILoginUser): void;
  showHomePage(): void;
  logout(): void;
  turnOff(): void;
}

export default class HomeScreen implements IHomeScreen {
  private loggedUser: ILoginUser | undefined;
  private homePage: HTMLElement;

  constructor() {
    this.homePage = window.document.getElementById('home-page') as HTMLElement;
    this.loggedUser;
  }

  homeUI(loginUser: ILoginUser): void {
    console.log('This is main screen');
    this.loggedUser = loginUser;
    if (this.loggedUser.userType === 'buyer') {
      this.buyerMainUI();
    }
  }
  async buyerMainUI(): Promise<void> {
    // if (!this.loggedUser) {
    //   return;
    // }
    // console.log(`buyer, email:${this.loggedUser.email}`);
    // console.log(`Money: ${this.loggedUser.money}`);
    // const boughtProducts = this.service.Product.getBuyProducts(this.loggedUser.id);
    // const sellingProducts = this.service.Product.getSellingProducts();
    // for (let i = 0; i < sellingProducts.length; i++) {
    //   const sellingProduct = sellingProducts[i];
    //   console.log(`Products on sale: ${sellingProduct.productName}`);
    // }
    //
    // console.log('=============================================');
    // console.log();
    //
    // console.log();
    // console.log('=============================================');
    //
    // for (let i = 0; i < boughtProducts.length; i++) {
    //   const boughtProduct = boughtProducts[i];
    //   console.log(`Products bought: ${boughtProduct.productID}, ${boughtProduct.productName}`);
    // }
    // console.log('=============================================');
    //
    // const productID = await inputReceiver('ID of the product you want to purchase:');
    //
    // if (productID === 'quit') {
    //   process.exit();
    // }
    //
    // const answered = this.service.Product.buyProductUsingID(productID, this.loggedUser.id);
    // if (!answered) {
    //   console.log('Buying process failed');
    //   this.buyerMainUI();
    // } else {
    //   console.log('Successs');
    //   this.buyerMainUI();
    // }
  }
  setUserProfile = (user: ILoginUser) => {
    const nickNameProfile = window.document.getElementById('nick-name');
    const moneyAmountHome = window.document.getElementById('money-amount-home');
    const userTypeHome = window.document.getElementById('user-type-home');
    nickNameProfile!.textContent = user.nickname;
    moneyAmountHome!.textContent = '$' + user.money;
    userTypeHome!.textContent = user.userType;
    this.loggedUser = user;
  };
  showHomePage = () => {
    if (this.homePage) {
      this.homePage.style.display = 'block';
    }
  };

  logout = () => {
    this.loggedUser = undefined;
  };

  turnOff = () => {
    this.homePage.style.display = 'none';
  };
}
