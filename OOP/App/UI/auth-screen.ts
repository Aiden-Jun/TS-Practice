import Service, {IService} from '../Service/service';
import {ILoginUser} from '../Specification/interfaces';
import {inputReceiver} from '../utils';

export interface IAuthScreen {
  showOptionPrompt(): Promise<'login' | 'create' | undefined>;
  signInUI(): Promise<ILoginUser | undefined>;
  signUpUI(): Promise<boolean>;
}

export default class AuthScreen implements IAuthScreen {
  private service: IService;

  constructor() {
    this.service = Service.Instance;
  }

  showOptionPrompt = async () => {
    console.log('Sign In (login)');
    console.log('Sign Up (create)');
    const choice = (await inputReceiver('>')).toLowerCase();

    if (choice === 'login' || choice === 'create') {
      return choice;
    } else {
      this.showOptionPrompt();
    }
  };

  signUpUI = async () => {
    console.log('\nSign Up');

    console.log('What kind of user are you? (buyer/seller)');
    const userType = (await inputReceiver('>')).toLowerCase();

    if (userType !== 'buyer' && userType !== 'seller') {
      console.log('Try Again!');
      return false;
    }

    console.log('Email');
    const entEmail = await inputReceiver('>');

    if (await this.service.AuthService.checkEmailExistence(entEmail)) {
      console.log('Email provided already exists');
      return false;
    }
    console.log('Password');
    const entPassword = await inputReceiver('>');

    console.log('Re-Enter Password');
    const reEntPassword = await inputReceiver('>');

    if (entPassword != reEntPassword) {
      console.log('Your passwords doies not match');
      console.log('Try Again');
      return False;
    }

    console.log('Name');
    const entName = await inputReceiver('>');
  };

  signInUI = async () => {
    console.log('\nSign In');
    console.log('What kind of user are you? (buyer/seller)');
    const userType = await inputReceiver('>');

    if (userType != 'buyer' && userType != 'seller') {
      console.log('Try Again');
      return false;
    }
    console.log('Email');
    const entEmail = await inputReceiver('>');

    if (this.service.AuthService()) {
    }
  };
}
