// 함수의 합성 요령1

// 목표: 배열 numbers 내부의 모든 값을 2배하고 3을 더하자

// 단계1
// 절차지향 프로그래밍
let numbers = [1, 2, 3];
for (let i = 0; i < numbers.length; i++) {
  numbers[i] *= 2;
  numbers[i] += 3;
}
console.log(numbers);

// 단계2
// 단계 1을 실행하는 함수를 만들고 함수에 일을 위임한다
numbers = [1, 2, 3];
const makeDoubleAndAddThree1 = (array) => {
  // 외부 데이터 numbers 변경 => 순수 함수가 아니다 => 신뢰하기 어려운 함수
  for (let i = 0; i < array.length; i++) {
    array[i] *= 2;
    array[i] += 3;
  }
};
makeDoubleAndAddThree1(numbers);
console.log(numbers);

// 단계3 - 여기에서부터 함수의 합성 요령을 배운다
// 함수를 다른 함수의 입력으로 사용해서 함수를 합성한다
// 다양한 함수를 합성할 수 있는 추상적인 함수 customMap 함수를 만든다
numbers = [1, 2, 3];
const makeDouble = (number) => {
  return number * 2;
};
const addThree = (number) => {
  return number + 3;
};
const customMap = (callback, iterable) => {
  const newArray = [];
  for (const el of iterable) {
    newArray.push(callback(el));
  }
  return newArray;
};
numbers = customMap(makeDouble, numbers);
numbers = customMap(addThree, numbers);
console.log(numbers);

// 단계4
// 위의 customMap 함수처럼 다양한 함수를 합성할 수 있는 추상적인 함수들을 더 만든다
const customFilter = (callback, iterable) => {
  let result = [];
  for (const el of iterable) {
    if (callback(el)) {
      result.push(el);
    }
  }
  return result;
};
const customReduce = (callback, acc, iterable) => {
  for (const el of iterable) {
    acc = callback(acc, el);
  }
  return acc;
};

// 단계5
// 합성된 다양한 함수들을 연쇄적으로 합성할 수 있는 추상적인 함수 go, pipe 함수를 만든다
const go = (initData, ...args) => customReduce((a, f) => f(a), initData, args);
const pipe =
  (f, ...fs) =>
  (...as) =>
    go(f(...as), ...fs);
