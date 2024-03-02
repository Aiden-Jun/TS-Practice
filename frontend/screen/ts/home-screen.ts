import {ILoginUser} from '../../specification/interfaces.js';

export interface IHomeScreen {
  homeUI(loginUser: ILoginUser): void;
  buyerMainUI(): void;
  setUserProfile(user: ILoginUser): void;
  showHomePage(): void;
  logout(): void;
  turnOff(): void;
  getSellerProducts(): Promise<void>;
}

export default class HomeScreen implements IHomeScreen {
  private loggedUser: ILoginUser | undefined;
  private homePage: HTMLElement;
  private addProductButton: HTMLElement;
  private titleInput: HTMLInputElement;
  private priceInput: HTMLInputElement;
  private descInput: HTMLInputElement;
  private sellingProductsList: HTMLElement;

  constructor() {
    this.homePage = window.document.getElementById('home-page') as HTMLElement;
    this.loggedUser;
    this.addProductButton = window.document.getElementById('add-product-button') as HTMLElement;
    this.titleInput = window.document.getElementById('product-title-input') as HTMLInputElement;
    this.priceInput = window.document.getElementById('product-price-input') as HTMLInputElement;
    this.descInput = window.document.getElementById(
      'product-description-input',
    ) as HTMLInputElement;
    this.sellingProductsList = window.document.getElementById(
      'selling-products-list',
    ) as HTMLElement;
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

  getSellerProducts = async () => {
    if (this.loggedUser != undefined) {
      console.log('beforefetch');
      const res = await fetch(`http://localhost:3000/products?email=${this.loggedUser.email}`, {
        method: 'GET', // GET POST PUT PATCH DELETE
      });
      const {products}: {products: {title: string; price: number; description: string}[]} =
        await res.json();
      console.log(products);
      for (let i = 0; i < products.length; i++) {
        this.sellingProductsList.innerHTML += `<div>
        <img class="square-img" src="https://dcist.com/wp-content/uploads/sites/3/2023/10/20230829_baby-monkey_Fenston_6-1024x1022.jpg">
        <div style="display: inline-block; text-align: left; padding-left: 10px; ;">
          ${products[i].title}<br>
          ${products[i].price}<br>
          ${products[i].description}
        </div>
      </div>`;
      }
    }
  };

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
      this.addProductButton.addEventListener('click', () => {
        this.addProduct(
          this.titleInput.value,
          parseInt(this.priceInput.value),
          this.descInput.value,
        );
      });
    }
  };

  addProduct = async (title: string, price: number, description: string) => {
    const res = await fetch('http://localhost:3000/product', {
      method: 'POST', // GET POST PUT PATCH DELETE
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        title,
        price,
        description,
      }),
    });
    const {user}: {user: ILoginUser | undefined} = await res.json();
    return user;
  };

  logout = () => {
    this.loggedUser = undefined;
  };

  turnOff = () => {
    this.homePage.style.display = 'none';
  };
}
