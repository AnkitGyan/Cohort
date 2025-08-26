"use strict";
// interface userType {
//   firstName: string,
//   lastName: string,
//   age: number,
// }
Object.defineProperty(exports, "__esModule", { value: true });
class manager {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
const m = new manager("Ankit", 21);
console.log(m.name);
console.log(m.age);
//# sourceMappingURL=interFce.js.map