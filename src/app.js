// creating server using express
const express = require("express");

const app = express();

// handling request and response 
// request handler => (req, res)=>{res.send("Hello Server")}
// app.use("/",(req, res)=>{
//     res.send("Server started on port 7777")

// })

// difference routing path
app.use("/test",(req, res)=>{
    res.send("Testing path")

})

app.use("/hello",(req, res)=>{
    res.send("hello hello hello!!")

})


// started listening my server on 3000 port
app.listen(7777, ()=>{
    console.log("Server is successfully listening on port 7777....")
})