import {ILoginUser} from '../specification/interfaces.js';
import Service, {IService} from '../service/service.js';
import {inputReceiver} from '../../input.js';

export interface IHomeScreen {
  homeUI(loginUser: ILoginUser): void;
  buyerMainUI(): void;
}

export default class HomeScreen implements IHomeScreen {
  private loggedUser: ILoginUser | undefined;
  private service: IService;
  constructor() {
    this.service = Service.Instance;
  }
  homeUI(loginUser: ILoginUser): void {
    console.log('This is main screen');
    this.loggedUser = loginUser;
    if (this.loggedUser.userType === 'buyer') {
      this.buyerMainUI();
    }
  }

  async buyerMainUI(): Promise<void> {
    if (!this.loggedUser) {
      return;
    }
    console.log(`buyer, email:${this.loggedUser.email}`);
    console.log(`Money: ${this.loggedUser.money}`);
    const boughtProducts = this.service.Product.getBuyProducts(this.loggedUser.id);
    const sellingProducts = this.service.Product.getSellingProducts();
    for (let i = 0; i < sellingProducts.length; i++) {
      const sellingProduct = sellingProducts[i];
      console.log(`Products on sale: ${sellingProduct.title}`);
    }

    console.log('=============================================');
    console.log();

    console.log();
    console.log('=============================================');

    for (let i = 0; i < boughtProducts.length; i++) {
      const boughtProduct = boughtProducts[i];
      console.log(`Products bought: ${boughtProduct.id}, ${boughtProduct.title}`);
    }
    console.log('=============================================');

    const id = await inputReceiver('ID of the product you want to purchase:');

    if (id === 'quit') {
      process.exit();
    }

    const answered = this.service.Product.buyProductUsingID(id, this.loggedUser.id);
    if (!answered) {
      console.log('Buying process failed');
      this.buyerMainUI();
    } else {
      console.log('Successs');
      this.buyerMainUI();
    }
  }
}
