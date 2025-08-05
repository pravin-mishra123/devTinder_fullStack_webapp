### Create out express server
- create repository
- Initialize the repository
    - git init
    
- node_modules, package.json, package.lock.json
- Install Express
- Create a server using express
- Difference between package.json and package.lock.json
- What are dependencies
- listen to port 7777
- Write request handlers for /test , /hello
- Install nodemon and update scripts inside package.json
- difference between caret and tilde (^ vs ~);
* // creating server using express
const express = require("express");

const app = express();

// handling request and response 
// request handler => (req, res)=>{res.send("Hello Server")}
app.use("/",(req, res)=>{
    res.send("Server started on port 7777")

})
// difference routing path
app.use("/test",(req, res)=>{
    res.send("Testing path")

})
// started listening my server on 3000 port
app.listen(7777, ()=>{
    console.log("Server is successfully listening on port 7777....")
})

