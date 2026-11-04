interface User{
  name: string;
  age: number;
  employment : string;
}

function ageSum(a: User, b: User): number{
   return a.age + b.age;
}

type UserType = Pick<User, "name" | "employment">;
type UserType2 = Partial<UserType>;

function getUserInfo(user: UserType ): string{
  return `Employment: ${user.employment}`;
}

let userA = {
  name : "Ankit Sharma",
  age : 22,
  employment : "Software Engineer"
}

let userB = {
  name : "Aanshi",
  age: 22,
  employment  : "Data Analyst"
}

console.log(ageSum(userA, userB));
console.log(getUserInfo(userA));
console.log(getUserInfo(userB));