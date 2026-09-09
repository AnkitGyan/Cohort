interface User{
  name: string;
  age: number;
}

function ageSum(a: User, b: User): number{
   return a.age + b.age;
}

let userA = {
  name : "Ankit Sharma",
  age : 22
}

let userB = {
  name : "Aanshi",
  age: 22
}

console.log(ageSum(userA, userB));