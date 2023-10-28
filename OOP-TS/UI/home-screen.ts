import {createAbstractBuilder} from 'typescript';
import {ILoginUser} from '../Specification/interfaces';

export interface IHomeScreen {
  homeUI(loginUser: ILoginUser): void;
}

export default class HomeScreen implements IHomeScreen {
  private loggedUser: ILoginUser
  homeUI(loginUser: ILoginUser): void {
    console.log('This is main screen')
    this.loggedUser = loginUser
    if this.loggedUser
  }
}
