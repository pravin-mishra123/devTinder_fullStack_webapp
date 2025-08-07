// creating server using express
const express = require("express");

const app = express();

app.use("/user",(req,res, next)=>{
  console.log("Handle1")
  // route handler

  // res.send("Route handler 1") // what if we have not handle the req/res handle => it will go in loop because it is not getting response back
    next()
},
(req, res,next) =>{
  console.log("handle2")
  next()
 
},
[(req, res,next) =>{
  console.log("handle3")
  next()
 
},
(req, res,next) =>{
  console.log("handle4")
  next()
 
}],
(req, res) =>{
  console.log("handle5")
  res.send("Rute5")
  // next()
 
}
)

// started listening my server on 3000 port
app.listen(7777, ()=>{
    console.log("Server is successfully listening on port 7777....")
})