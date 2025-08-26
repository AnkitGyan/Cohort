"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let name = 5;
console.log(`Hello, ${name}!`);
function greet(firstName) {
    console.log(`hello ${firstName}`);
}
function cal(a, b) {
    return a + b;
}
function DelayedCallFun(fn) {
    setTimeout(fn, 1000);
}
DelayedCallFun(() => {
    console.log('Hi ankit , working well');
});
function greet2(user) {
    console.log(`hello ${user.name}`);
}
greet("ankit");
greet2({ name: 'sharmaG', age: 21 });
console.log(cal(4, 3));
//# sourceMappingURL=index.js.map