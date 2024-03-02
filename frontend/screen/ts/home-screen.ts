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
  setUserProfile = (user: ILoginUser) => {
    const nickNameProfile = window.document.getElementById('nick-name');
    const moneyAmountHome = window.document.getElementById('money-amount-home');
    const userTypeHome = window.document.getElementById('user-type-home');
    nickNameProfile!.textContent = user.nickname;
    moneyAmountHome!.textContent = '$' + user.money;
    userTypeHome!.textContent = user.userType;
    this.loggedUser = user;
  };
  getSellerProducts = async () => {
    if (!this.loggedUser) {
      return;
    }

    const res = await fetch(`http://localhost:3000/products?email=${this.loggedUser.email}`, {
      method: 'GET', // GET POST PUT PATCH DELETE
    });
    const {products}: {products: {title: string; price: number; description: string}[]} =
      await res.json();

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      this.AddProductCard(product);
    }
  };
  showHomePage = () => {
    if (this.homePage) {
      this.homePage.style.display = 'block';
      this.addProductButton.addEventListener('click', async () => {
        console.log('gkgkgkgk');
        const newProduct = await this.addProduct(
          this.titleInput.value,
          parseInt(this.priceInput.value),
          this.descInput.value,
        );
        if (!newProduct) {
          return;
        }
        this.AddProductCard(newProduct);
      });
    }
  };

  addProduct = async (title: string, price: number, description: string) => {
    console.log('!?!?!?!?');
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

    console.log('...?');
    const {product}: {product: {title: string; price: number; description: string} | undefined} =
      await res.json();
    console.log(product);
    return product;
  };

  logout = () => {
    this.loggedUser = undefined;
  };

  turnOff = () => {
    this.homePage.style.display = 'none';
  };

  AddProductCard = (product: {title: string; price: number; description: string}) => {
    const nextIndex = this.sellingProductsList.getElementsByClassName('product').length;
    const margin = nextIndex % 2 === 0 ? 'margin-right' : 'margin-left';
    this.sellingProductsList.innerHTML += `<div
          class="product"
          style="
            display: inline-block;
            width: 150px;
            background-color: #ffffff;
            border-radius: 5px;
            ${margin}: 10px;
            margin-bottom: 50px;
          ">
          <img
            style="width: 150px; height: 150px; border-radius: 5px 5px 0 0"
            src="https://dcist.com/wp-content/uploads/sites/3/2023/10/20230829_baby-monkey_Fenston_6-1024x1022.jpg" />
          <div style="position: relative; text-align: left; font-size: 15px; padding: 10px; height: 120px">
            <span style="font-size: 15px; font-weight: bold; color: #212121">${product.title}</span>
            <br>
            <span style="font-size: 13px; font-weight: bold; color: #565656">${product.price}원</span>
            <br>
            <div style="margin-top: 10px">
              <span style="font-size: 13px; font-weight: normal; color: #000000">
                ${product.description}
              </span>
            </div>
            <div
              style="
                position: absolute; bottom: 10px;
                text-align: center;
                background-color: #6363ff;
                color: white;
                border-radius: 5px;
                font-size: 12px;
                padding: 4px;
              ">
              상품 정보 수정
            </div>
          </div>
        </div>`;
  };
}
