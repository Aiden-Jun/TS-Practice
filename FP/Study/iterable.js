// 함수형 프로그래밍

// 이러터블 객체: 배열, 셋, 맵, 사용자가 정의한 이터러블 객체, 기타
// 이터러블 객체는 Symbol.iterator 메소드를 가진다
// Symbol.iterator: 새로운 이터레이터를 리턴한다
// 이터레이터: next() 메소드를 실행하고 {value, done} 객체를 리턴
// for of : 이터러블 객체의 Symbol.iterator가 실행되어 새로운 이터레이터가 next()를 실행하고 done = true가 되기 전까지 value를 순회한다

// 이터러블 객체1: 배열
const arr1 = [1, 2, 3, 4, 5];
let iterator1 = arr1[Symbol.iterator]();
console.log(iterator1.next());
console.log(iterator1.next());
console.log(iterator1.next());
for (const el of arr1) {
  console.log(el);
}

// 이터러블 객체2: 셋
const set1 = new Set([1, 2, 3, 4, 5]);
let iterator2 = set1[Symbol.iterator]();
console.log(iterator2.next());
console.log(iterator2.next());
console.log(iterator2.next());
for (const el of set1) {
  console.log(el);
}

// 이터러블 객체3: 맵
const map1 = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
  ['d', 4],
  ['e', 5],
]);
let iterator3 = map1[Symbol.iterator]();
console.log(iterator3.next());
console.log(iterator3.next());
console.log(iterator3.next());
for (const el of map1.entries()) {
  console.log(el);
}

// 이터러블 객체4: 사용자 정의 이터러블
const myIterable1 = {
  [Symbol.iterator]() {
    let i = 5;
    return {
      next() {
        return i === 0 ? {done: true} : {value: i--, done: false};
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  },
};
const iterator4 = myIterable1[Symbol.iterator]();
console.log(iterator4.next());
console.log(iterator4.next());
console.log(iterator4.next());
for (const el of myIterable1) {
  console.log(el);
}

// 이터러블 객체4: 제러레이터 함수를 사용한 사용자 정의 이터러블
function* generator1() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
}

const myIterable2 = generator1();
const iterator5 = myIterable2[Symbol.iterator]();
console.log(iterator5.next());
console.log(iterator5.next());
console.log(iterator5.next());
for (const el of myIterable2) {
  console.log(el);
}

function* generator2(limit) {
  for (let i = 1; i <= limit; i++) {
    yield i;
  }
}

const myIterable3 = generator2(Infinity);
const iterator6 = myIterable3[Symbol.iterator]();
console.log(iterator6.next());
console.log(iterator6.next());
console.log(iterator6.next());
for (const el of myIterable3) {
  console.log(el);
}
