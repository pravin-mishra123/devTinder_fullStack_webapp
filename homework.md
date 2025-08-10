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

### Episode-05 || Middlewares and Error handling
* Explore more about route handler => https://expressjs.com/en/guide/routing.html
    * Multiple Route handlers  -Play with code
    * next()
    * next function and errors along with res.send(), play with changing the next() up,down because order matters alot
    * What is route handler in express => https://expressjs.com/en/guide/routing.html
    * app.use("/route",[fun1,fun2,fun3.........]) => play with this wrapping in array of functions
* Other way of route handler---
    app.get("/user",(req, res, next)=>{
  console.log("Route handling 1");
  // res.send("Route 1")
  next();
    })

    app.get("/user",(req, res)=>{
  console.log("Route handling 2");
  res.send("Route 2")
    })
    * but order of execution matters, if we move the second to top then first will not work because next() not used there.

* What is middleWare in express? Why do we need => https://expressjs.com/en/guide/routing.html
    - how expressJs basically handles requests behind the scense

    // middleware
    app.get("/user",(req, res, next)=>{
    console.log("Route handling 1");
    // res.send("Route 1")
    next();
    })

    // request / route handler - which is actually sending the response back
    app.get("/user",(req, res)=>{
    console.log("Route handling 2");
    res.send("Route 2")
    })

* app.use vs app.all
* What is middleware ? Why do we need middleware ?
* Write a dummy auth middleware for admin
* Write a dummy auth middleware for user
 - example of actual need of middleware
  - Auth.js

  const adminAuth = (req, res, next) => {
  console.log(" admin auth getting checked !!");
  const token = "xyz";
  const isAuthorized = token === "xyz";
  if (!isAuthorized) {
    res.status(401).send("Unauthorize request");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("user auth getting checked !!");
  const token = "xyz";
  const isAuthorized = token === "xyz";
  if (!isAuthorized) {
    res.status(401).send("Unauthorize request");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth,
};

- app.js

// creating server using express
const express = require("express");

const app = express();
const { adminAuth, userAuth } = require("./middlewares/Auth");

// Why do we need middleware actually ??

// Handle Auth Middleware for all GET, POST.........requests.

app.use("/admin", adminAuth);
// app.use("/user", userAuth) // write like this also

app.get("/admin/getAllData", (req, res) => {
  res.send("All data sent");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted the User");
});

app.get("/user/login", (req, res) => {
  res.send("User logged in successfully");
});

app.get("/user/deleteUser", userAuth, (req, res) => {
  res.send("Kya bolte ho");
});

// started listening my server on 3000 port
app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777....");
});

* Error Handling
  - wildcard error handling using => app.use("/",(err,req,res,next) =>{}); => it should always end of the code and it will catch the err gracefully
  - using try-catch within the api - that will also give the proper error message
  app.get("/getUserData", (req, res) => {
  try {
    throw new Error("This is unexpected errors...");
    res.send("Get all user datas.....");
  } catch (error) {
    res.status(500).send("Some error occured, contact to support team!!");
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong!!!");
  }
});

### Episode-06 | Database, Schema & Models | Mongoose
* Create fee cluster on MongoDB official website (Mongo Atlas)
* Install mongoose library => npm install mongoose
* Connect your application to the database "connection-url"/devTinderDB 
* Call the connectDB function and connect to database before starting application on 7777 port
* Create a User Schema & User Model
* Create POST/signup API to add the data to database
* Push some documents using api call (Postman)
* handle the error using try-catch in every api call

### Episode-07 | Diving into APIs
* Difference between JSON and JavaScript object? => https://www.geeksforgeeks.org/javascript/json-vs-javascript-object/
* Add the express.json niddleware to your app
* Make your /signup API dynamic to recevies the data from end-user (browser / postman)
  // creating server using express
  const express = require("express");
  const { connectDB } = require("./config/database");
  const app = express();
  const User = require("./models/user");

  // middleware => it is reading and converting JSON request data into javaScript object
  app.use(express.json());

  app.post("/signup", async (req, res) => {
  // Creating a new instance of the User model
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User Added Successfully!!");
  } catch (error) {
    res.status(400).send("Error saving the user: ", error.message);
  }
  });

  connectDB()
  .then(() => {
    console.log("Database Connected Successfully!!");
    // started listening my server on 3000 port
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777....");
    });
  })
  .catch((err) => {
    console.error("Database cannot connected!!");
  });
* User.fineOne with duplicate email ids, which object returned?
* API - get user by email
* API - feed API - GET /feed - get all the users from the database
* Get the user by id using findById method
* Create a delete user API and delete the data by userId
* app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete({_id:userId})
    // const user = await User.findByIdAndDelete(userId);
    console.log("user", user);
    res.send("User Deleted Successfully");
  } catch (error) {
    res.status(400).send("Something went wrong...");
  }
});












