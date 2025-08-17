// creating server using express
const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/Auth");

// middleware => it is reading and converting JSON request data into javaScript object
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    // validation of data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;
    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    // Creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User Added Successfully!!");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// login API
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credential");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // Create a JWT token
      const token = await jwt.sign({ _id: user._id }, "Dev@Tinder$790", {
        expiresIn: "7d",
      });

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.send("Login Successfully");
    } else {
      throw new Error("Invalid Credential");
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).send("ERROR:" + error.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User does not exist");
    }
    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR :" + error.message);
  }
});

// userAuth is a middleware that verify the token and user present or not
app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  console.log("conection request sent successfully!!");
  res.send(user.firstName + " " + "sent the connection request!");
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
