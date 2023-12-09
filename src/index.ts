import Database from './oop/database/database';
import Store from './oop/ui/store';
import {inputReceiver} from './input';

const doExample = async () => {
  console.log('==================================================');
  console.log('inputReceiver 예제를 실행합니다');
  const name = await inputReceiver('이름을 입력하세요: ');
  const age = await inputReceiver('나이를 입력하세요: ');

  console.log(`입력받은 이름: ${name}, 입력받은 나이: ${age}`);
  console.log();

  // Database 사용법
  console.log('Database 예제를 실행합니다');
  const db = Database.Instance;
  await db.appendCSV('example.csv', `${name},${age}`);
  const readContents = await db.readCSV('example.csv');
  console.log('example.csv에서 읽어온 콘텐츠: ', readContents);
  console.log('example.csv 파일을 열어보세요');
  console.log('==================================================');
};

const main = async () => {
  await doExample();

  // oop
  //console.log('store 앱을 실행합니다');
  //const store = new Store();
  //await store.init();
};

main();
