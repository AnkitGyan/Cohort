// interface userType {
//   firstName: string,
//   lastName: string,
//   age: number,
// }

// function greet(user: userType){
//   console.log(`hello ${user.firstName}`)
// }

// let user : userType={
//   firstName: 'ankit',
//   lastName: 'sharma',
//   age: 21,
// }

// greet(user);


interface People{
  name: string,
  age: number
}

class manager implements People{
  name: string;
  age: number;
  constructor(name: string, age: number){
    this.name = name;
    this.age = age;
  }
}

const m = new manager("Ankit", 21);

console.log(m.name)
console.log(m.age)