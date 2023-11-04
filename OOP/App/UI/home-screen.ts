import {createAbstractBuilder} from 'typescript';
import {ILoginUser} from '../Specification/interfaces';
import {IService} from '../Service/service';

export interface IHomeScreen {
  homeUI(loginUser: ILoginUser): void;
  buyerMainUI(): void;
}

export default class HomeScreen implements IHomeScreen {
  private loggedUser: ILoginUser;
  private service: IService;

  homeUI(loginUser: ILoginUser): void {
    console.log('This is main screen');
    this.loggedUser = loginUser;
    if (this.loggedUser.userType === 'buyer') {
      this.buyerMainUI();
    }
  }

  buyerMainUI(): void {
    console.log('buyer, email:' + this.loggedUser.email);
  }
}
