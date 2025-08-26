let name: number = 5;
console.log(`Hello, ${name}!`);


function greet(firstName: string | number){
  console.log(`hello ${firstName}`);
}

function cal(a: number, b: number){
  return a + b;
}

function DelayedCallFun(fn: ()=> void){
  setTimeout(fn, 1000);
}

DelayedCallFun(()=>{
  console.log('Hi ankit , working well');
})

function greet2(user: {
  name: string,
  age: number,
}){
  console.log(`hello ${user.name}`);
}

greet("ankit");
greet2({name:'sharmaG', age: 21});
console.log(cal(4,3));

