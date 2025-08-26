require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require('path');

app.use(express.json());
app.use(cors());
const JWT_SECRET = process.env.JWT_SECRET;
app.use(express.static(path.join(__dirname, 'public')));


let users = [];

// function generateToken(){
//   const options = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ];
//    let token = "";
//   for(let i = 0; i < 32; i++){
//     token = token + options[Math.floor(Math.random()* options.length)]
//   }
//   return token;
// }
app.get("/", (req, res)=>{
  res.render("index.html");
})

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  users.push({
  username: username,
  password: password
});
  res.send("you have signed up");
});

app.post("/signin", (req, res)=>{
  const username = req.body.username;
  const password = req.body.password;


  const foundUser = users.find(user => user.username === username && user.password === password);

  if (foundUser) {
    // const token = generateToken();
    const token = jwt.sign({
      username : username,
    }, JWT_SECRET)
    // foundUser.token = token; // since jwt is stateless token so no need to store it 
    res.json({ message: "Signed in successfully", token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

function auth(req, res, next){
   const token = req.headers.token;
  const decodedInfo = jwt.verify(token, JWT_SECRET);
  const username = decodedInfo.username;
  if(username){
    req.username = username;
    next();
  } else{
    res.json({
      message : "You are not logged in",
    })
  }
}

app.get("/me", auth, (req, res)=>{
  // const token = req.headers.token;
  // const decodedInfo = jwt.verify(token, JWT_SECRET);
  // const username = decodedInfo.username; // using auth middleware
  // let foundUser = users.find(user => user.token === token);

  const username = req.username;

  let foundUser = users.find(user => user.username === username);

  if(foundUser){
    res.json({
      username : foundUser.username,
      password : foundUser.password,
    });
  } else{
     res.status(401).json({ error: "Invalid token" });
  }

})

app.listen(8080, ()=>{
  console.log("listening on the port 8080");
});