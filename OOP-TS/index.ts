import User from './Domain/User';
import {inputReceiver} from './utils';

async function main() {
  const entEmail = await inputReceiver('Enter your email >>');
  console.log(entEmail);

  const user = new User('bird.com', '1234', 'Bird');
  console.log(user.Email);
  console.log('Hello');
  console.log('Testing Prettier');
}

main();
