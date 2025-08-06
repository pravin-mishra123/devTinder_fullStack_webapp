// creating server using express
const express = require("express");

const app = express();

// pattern routing with regular expression
// this match /ac, /abc

// reading query
app.get("/user", (req, res) => {
    console.log(req.query)
  res.send({ firstName: "Pravin", lastName: "Mishra", age: 30, city: "Varanasi" });
});

// Dynamic route using params
app.get("/user/:userId/:name/:password", (req, res) => {
    console.log("DynamicRoute id",req.params)
  res.send({ firstName: "Pravin", lastName: "Mishra", age: 30, city: "Varanasi" });
});

// app.get("/ab?c", (req, res) => {
//   res.send({ firstName: "Pravin", lastName: "Mishra", age: 30, city: "Varanasi" });
// });

// // we can write bbbbbb as many as I can => localhost:7777/abbbbbbbbbbbbc
// app.get("/ab+c", (req, res) => {
//   res.send({ firstName: "Pravin", lastName: "Mishra", age: 30, city: "Varanasi" });
// });

// // write anything in this * => localhost:7777/abPravincd => but make sure start with ab and end with cd then it will work because of the pattern should match
// app.get("/ab*cd", (req, res) => {
//   res.send({ firstName: "Pravin", lastName: "Mishra", age: 30, city: "Varanasi" });
// });

// we can use the regular expression as well
// app.get(/^\/ab+c$/, (req, res) => {
//   res.send("Matched route with regex: /ab+c");
// })



// started listening my server on 3000 port
app.listen(7777, ()=>{
    console.log("Server is successfully listening on port 7777....")
})