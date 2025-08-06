// creating server using express
const express = require("express");

const app = express();

// handling request and response 
// request handler => (req, res)=>{res.send("Hello Server")}


// This will match all the http method api call to /test
app.use("/test",(req, res)=>{
    res.send("Testing path")

})

app.get("/user",(req,res)=>{
    res.send({firstName:"Pravin", lastName:"Mishra", age:30,city:"Varanasi"})
})

app.post("/user",(req,res)=>{
    res.send("Data saved successfully using post api call!!!")
})

app.delete("/user",(req,res)=>{
    res.send("Data deleted successfully!!")
})

// app.use("/hello",(req, res)=>{
//     res.send("hello hello hello!!")

// })

// app.use("/",(req, res)=>{
//     res.send("Server started on port 7777")

// })


// started listening my server on 3000 port
app.listen(7777, ()=>{
    console.log("Server is successfully listening on port 7777....")
})