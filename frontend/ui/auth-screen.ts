import {ILoginUser} from '../specification/interfaces.js';

export interface IAuthScreen {
  showOptionPrompt(): Promise<'login' | 'create' | undefined>;
  signInUI(): Promise<ILoginUser | undefined>;
  signUpUI(): Promise<boolean>;
}

export default class AuthScreen implements IAuthScreen {
  constructor() {}

  showOptionPrompt = async () => {
    // console.log('Sign In (login)');
    // console.log('Sign Up (create)');
    // // const choice = (await inputReceiver('>')).toLowerCase();
    //
    // if (choice === 'login' || choice === 'create') {
    //   return choice;
    // } else {
    //   this.showOptionPrompt();
    // }
    throw new Error();
  };

  signInUI = async () => {
    // console.log('Sign In');
    //
    // console.log('Email');
    // const entEmail = await inputReceiver('>');
    //
    // console.log('Password');
    // const entPassword = await inputReceiver('>');
    //
    // const user = this.service.Auth.getUser(entEmail, entPassword);
    // if (user) {
    //   console.log(`Hello ${user.nickname}`);
    //   return user;
    // }
    // return;
    throw new Error();
  };

  signUpUI = async () => {
    // console.log('\nSign Up');
    // console.log('What kind of user are you? (buyer/seller)');
    // const userType = await inputReceiver('>');
    //
    // if (userType != 'buyer' && userType != 'seller') {
    //   console.log('Try Again');
    //   return false;
    // }
    // console.log('Email');
    // const entEmail = await inputReceiver('>');
    //
    // if (await this.service.Auth.doesThisEmailExist(entEmail)) {
    //   console.log('Email provided already exists, try again.');
    //   return false;
    // }
    //
    // console.log('Password');
    // const entPassword = await inputReceiver('>');
    //
    // console.log('Re-Enter Password');
    // const reEntPassword = await inputReceiver('>');
    //
    // if (entPassword !== reEntPassword) {
    //   console.log('Your passwords does not match.');
    //   console.log('Try Again');
    //   return false;
    // }
    //
    // console.log('Name');
    // const entName = await inputReceiver('>');
    //
    // this.service.Auth.addUser(entEmail, entPassword, entName, userType);
    // console.log('Done, now sign in');

    return true;
  };
}
