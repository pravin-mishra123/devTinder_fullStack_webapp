// creating server using express
const express = require("express");

const app = express();

// this is middleware
app.get(
  "/user",
  (req, res, next) => {
    console.log("Route handling 1");
    // res.send("Route 1")
    next();
  },
  (req, res, next) => {
    next();
  },
  (req, res) => {
    // request / route handler
    res.send("Handling the response here");
  }
);

// app.get("/user",(req, res)=>{
//   console.log("Route handling 2");
//   res.send("Route 2")
// })

// started listening my server on 3000 port
app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777....");
});
