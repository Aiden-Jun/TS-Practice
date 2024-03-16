import {IProduct, IUser} from '../../specification/interfaces.js';
import {getSellingProducts} from './external.js';

export interface IHomeScreen {
  showHomePage(user: IUser): void;
  turnOff(): void;
  logout(): void;
  getSellerProducts(): Promise<void>;
}

export default class HomeScreen implements IHomeScreen {
  private loggedUser: IUser | undefined;
  private homePage: HTMLElement;
  private sellerScreen: HTMLElement;
  private buyerScreen: HTMLElement;
  private addProductButton: HTMLElement;
  private buyProductButton: HTMLElement;
  private titleInput: HTMLInputElement;
  private priceInput: HTMLInputElement;
  private descInput: HTMLInputElement;
  private productsList: HTMLElement;

  constructor() {
    this.homePage = window.document.getElementById('home-page') as HTMLElement;
    this.sellerScreen = window.document.getElementById('seller-screen') as HTMLElement;
    this.buyerScreen = window.document.getElementById('buyer-screen') as HTMLElement;
    this.buyProductButton = window.document.getElementById('buy-product-button') as HTMLElement;
    this.addProductButton = window.document.getElementById('add-product-button') as HTMLElement;
    this.titleInput = window.document.getElementById('product-title-input') as HTMLInputElement;
    this.priceInput = window.document.getElementById('product-price-input') as HTMLInputElement;
    this.descInput = window.document.getElementById(
      'product-description-input',
    ) as HTMLInputElement;
    this.productsList = window.document.getElementById('products-list') as HTMLElement;
  }

  showHomePage = async (user: IUser) => {
    this.setUserProfile(user);
    if (this.loggedUser) {
      if (this.loggedUser.userType === 'seller') {
        this.setSellerScreen();
      } else {
        await this.setBuyerScreen();
      }
    }
  };
  setUserProfile = (user: IUser) => {
    const nickNameProfile = window.document.getElementById('nick-name');
    const moneyAmountHome = window.document.getElementById('money-amount-home');
    const userTypeHome = window.document.getElementById('user-type-home');
    nickNameProfile!.textContent = user.nickname;
    moneyAmountHome!.textContent = '$' + user.money;
    userTypeHome!.textContent = user.userType;
    this.loggedUser = user;
  };
  setSellerScreen = () => {
    this.homePage.style.display = 'block';
    this.sellerScreen.style.display = 'block';
    this.buyerScreen.style.display = 'none';

    this.addProductButton.addEventListener('click', async () => {
      const newProduct = await this.addProduct(
        this.titleInput.value,
        parseInt(this.priceInput.value),
        this.descInput.value,
      );
      if (!newProduct) {
        return;
      }
      this.addProductCard(newProduct);
    });
  };
  setBuyerScreen = async () => {
    if (!this.loggedUser) {
      alert('로그인이 필요합니다');
      return;
    }

    this.homePage.style.display = 'block';
    this.sellerScreen.style.display = 'none';
    this.buyerScreen.style.display = 'block';

    console.log('?????');
    const products = await getSellingProducts();
    console.log('....');
    console.log(products.length);
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      this.addProductCard(product);
    }

    this.buyProductButton.addEventListener('click', async () => {
      console.log('물건을 사야겠습니당!');
    });
  };
  turnOff = () => {
    this.homePage.style.display = 'none';
  };
  logout = () => {
    this.loggedUser = undefined;
  };

  // 상품

  getSellerProducts = async () => {
    if (!this.loggedUser) {
      return;
    }

    const res = await fetch(`http://localhost:3000/products?email=${this.loggedUser.email}`, {
      method: 'GET', // GET POST PUT PATCH DELETE
    });
    const {products}: {products: IProduct[]} = await res.json();

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      this.addProductCard(product);
    }
  };
  addProduct = async (title: string, price: number, description: string) => {
    if (!this.loggedUser) {
      alert('로그인하세요');
      return;
    }

    const res = await fetch('http://localhost:3000/product', {
      method: 'POST', // GET POST PUT PATCH DELETE
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        userId: this.loggedUser.id,
        title,
        price,
        description,
      }),
    });
    const {product, message}: {product: IProduct | undefined; message: string} = await res.json();
    alert(message);
    return product;
  };
  addProductCard = (product: IProduct) => {
    const nextIndex = this.productsList.getElementsByClassName('product').length;
    const margin = nextIndex % 2 === 0 ? 'margin-right' : 'margin-left';
    this.productsList.innerHTML += `<div
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
            <span style="font-size: 13px; font-weight: bold; color: #565656">${product.description}원</span>
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
