const express = require('express');
const app = express();

app.get("/", (req, res)=>{
  res.json({
    message : "hello aanshi",
  })
})

app.listen(3000, ()=>{
  console.log("app is listing on the port 3000");
})