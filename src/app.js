// creating server using express
const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user")


app.post("/signup",async (req, res)=>{

// Creating a new instance of the User model
const user = new User({
  firstName:"Virat",
  lastName:"Kohli",
  emailId:"virat@gmail.com",
  password:"virat@123"
})

try {
  await user.save()
  res.send("User Added Successfully!!")
} catch (error) {
  res.status(400).send("Error saving the user: ", error.message)
}


})

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
