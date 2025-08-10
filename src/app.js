// creating server using express
const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user");
const user = require("./models/user");

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

// Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
  // const userEmail = req.body.emailId;
  try {
    const users = await User.find({});

    // users.length === 0 ? res.status(400).send("User not found") :  res.send(users)
    if (users.length === 0) {
      res.status(400).send("User not found");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send("Something went wrong...");
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
