function getEvenNum(numbers: number[]): number[]{
  return numbers.filter(num=> num%2 == 0);
}

const arr = [1, 2, 4, 9, 6];
console.log(getEvenNum(arr));