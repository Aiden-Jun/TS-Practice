// 함수의 합성 요령2

// 목표: 배열 numbers 내부의 모든 값을 2배하고 3을 더하자

// 단계1
// 함수의 결과로 함수를 리턴해서 평가(계산)을 지연시킨다
// 평가를 지연시키면 내가 원하는 순간에 계산할 수 있어서 메모리를 절약할 수 있다
let numbers = [1, 2, 3];
const customMap = (callback) => {
  return (array) => {
    const newArray = [];
    for (const el of array) {
      newArray.push(callback(array[i]));
    }
    return newArray;
  };
};
const makeDouble = customMap((v) => {
  return v * 2;
});
numbers = makeDouble(numbers);
const addThree = customMap((v) => {
  return v + 3;
});
numbers = addThree(numbers);

// 커리
// 평가 지연을 쉽게 만들어주는 추상적인 함수
const curry =
  (callback) =>
  (a, ..._) =>
    _.length ? callback(a, ..._) : (..._) => callback(a, ..._);

// 커리를 적용한 다양한 추상 함수들
const curriedMap = curry((callback, iterable) => {
  let result = [];
  for (const el of iterable) {
    result.push(callback(el));
  }
  return result;
});
const curriedFilter = curry((callback, iterable) => {
  let result = [];
  for (const el of iterable) {
    if (callback(el)) {
      result.push(el);
    }
  }
  return result;
});
const curriedReduce = curry((callback, acc, iterable) => {
  if (!iterable) {
    iterable = acc[Symbol.iterator]();
    acc = iterable.next().value;
  } else {
    iterable = iterable[Symbol.iterator]();
  }
  for (const el of iterable) {
    acc = callback(acc, el);
  }
  return acc;
});
