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

- 


