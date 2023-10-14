import {createAbstractBuilder} from 'typescript';
import {ILoginUser} from '../Specification/interfaces';

export interface IHomeScreen {
  homeUI(loginUser: ILoginUser): void;
}

export default class HomeScreen implements IHomeScreen {
  homeUI(loginUser: ILoginUser): void {}
}
