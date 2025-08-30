import { Client } from "pg";
import  express, { request }  from "express";
import type { Request, Response } from 'express';
import cors from 'cors';
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.use(cors());

const pgClient = new Client({
  user: "neondb_owner",
  password: "npg_oEgqXRDe4H2x",
  port : 5432,
  host: "ep-young-glitter-adlxr4pn-pooler.c-2.us-east-1.aws.neon.tech",
  database:"neondb",
  ssl: true
});

async function main() {
  try {
    await pgClient.connect();

    const response = await pgClient.query("SELECT * FROM users");

    // rows contains the actual data
    console.log(response.rows);
  } catch (err) {
    console.error("Database error:", err);
  } finally {
    await pgClient.end();
  }
}


app.post("/user", async (req : Request, res: Response)=>{
  const { user_name, email, password } = req.body;

await pgClient.query(
      "INSERT INTO users (user_name, email, password) VALUES ($1, $2, $3)",
      [user_name, email, password]
    );
  res.json({
    message : "You are signed up"
  })
})

main();
app.listen(3000, () => console.log("Server running on port 3000"));
