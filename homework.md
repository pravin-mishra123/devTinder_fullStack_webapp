### Create out express server
#### Staring my server to use - npm run dev
- create repository
- Initialize the repository
    - git init // initialize recpository

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

### Routing and Request Handler
- initialize git
- create .gitignore file
- Create a remote repo on github
- Pull all code to remote origin
    - git add . // stage all the changes
    - // connet my repository to romte using this command
    - git remote add origin https://github.com/pravin-mishra123/devTinder_fullStack_webapp.git
    - git branch -M main
    - git push -u origin main
- Order of route is matters alot.
- Play with routes, and route extension ex. /hello,/test,/hello/2.....
- Install the Postman and create your own workspace and test your api with any method
- Write logic to handle GET, POST, PATCH, PUT, DELETE etc.... and test in postman
    - // creating server using express
const express = require("express");

const app = express();

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

// started listening my server on 3000 port
app.listen(7777, ()=>{
    console.log("Server is successfully listening on port 7777....")
})

- Explore routing and use of ?, +, (), *, in this routes
- Use regex in route /a/, /.*fly$/
- Reading query params in the routes
- Reading the Dynamic routes

- Advance routing (regular expression)
- // pattern routing with regular expression
    - app.get("/ab?c",(req,res)=>{}) => I have used ? so now b became optional SO if I write /ac, /abc => both will work
    - // creating server using express
const express = require("express");

const app = express();

// pattern routing with regular expression
// this match /ac, /abc
app.get("/a(bd)?c", (req, res) => {
  res.send({ firstName: "Pravin", lastName: "Mishra", age: 30, city: "Varanasi" });
});

app.get("/ab?c", (req, res) => {
  res.send({ firstName: "Pravin", lastName: "Mishra", age: 30, city: "Varanasi" });
});

// we can write bbbbbb as many as I can => localhost:7777/abbbbbbbbbbbbc
app.get("/ab+c", (req, res) => {
  res.send({ firstName: "Pravin", lastName: "Mishra", age: 30, city: "Varanasi" });
});

// write anything in this * => localhost:7777/abPravincd => but make sure start with ab and end with cd then it will work because of the pattern should match
app.get("/ab*cd", (req, res) => {
  res.send({ firstName: "Pravin", lastName: "Mishra", age: 30, city: "Varanasi" });
});

// we can use the regular expression as well
// app.get(/^\/ab+c$/, (req, res) => {
//   res.send("Matched route with regex: /ab+c");
// })

// started listening my server on 3000 port
app.listen(7777, ()=>{
    console.log("Server is successfully listening on port 7777....")
})

* How to read the query parameter in the route handler
    -app.get("/user", (req, res) => {
    console.log(req.query)
  res.send({ firstName: "Pravin", lastName: "Mishra", age: 30, city: "Varanasi" });
});

- localhost:7777/user?userId=101&password=test

* How to make dynamic routing 
    - http://localhost:7777/user/102

    - app.get("/user/:userId/:name/:password", (req, res) => {
    console.log("DynamicRoute id",req.params)
  res.send({ firstName: "Pravin", lastName: "Mishra", age: 30, city: "Varanasi" });
});

    - app.get("/user/:userId/:name/:password", (req, res) => {
    console.log("DynamicRoute id",req.params)
  res.send({ firstName: "Pravin", lastName: "Mishra", age: 30, city: "Varanasi" });
});

- Explore more about route



