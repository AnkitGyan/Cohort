import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function CreateFunction() {
await client.user.create({
  data: {
    user_name: "harkirat",
    password: "harkirat123",
    age: 27,
    city: "noida"
  }
});
}

CreateFunction()
  .then(() => console.log("User created"))
  .catch((err) => console.error("Error:", err))
  .finally(() => client.$disconnect());
