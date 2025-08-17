// creating server using express
const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

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

      const token = await jwt.sign({ _id: user._id }, "Dev@Tinder$790");

      res.cookie("token", token);

      res.send("Login Successfully");
    } else {
      throw new Error("Invalid Credential");
    }
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
});

app.get("/profile", async (req, res) => {
  try {
    const cookies = req.cookies;

    const { token } = cookies;
    // validate token
    if(!token){
      throw new Error("Invalid token")
    }
    const decodedMessage = await jwt.verify(token, "Dev@Tinder$790");

    const { _id } = decodedMessage;
    const user = await User.findById(_id);
    if(!user){
      throw new Error("User does not exist")
    }
    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR :" + error.message);
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

// Delete a User from the database

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    // const user = await User.findByIdAndDelete(userId);
    console.log("user", user);
    res.send("User Deleted Successfully");
  } catch (error) {
    res.status(400).send("Something went wrong...");
  }
});

// Update Data of the user

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = [
      "photoUrl",
      "age",
      "about",
      "gender",
      "skills",
      "password",
    ];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }

    if (data?.skills) {
      // Check max skills limit
      if (data.skills.length > 10) {
        throw new Error("Skills can not be more than 10");
      }
      // Check for duplicates
      const uniqueSkills = [
        ...new Set(data.skills.map((s) => s.trim().toLowerCase())),
      ];
      if (uniqueSkills.length !== data.skills.length) {
        throw new Error("Duplicate skills are not allowed");
      }
    }

    await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before",
      runValidators: true,
    });
    res.send("User Updated Successfully!!");
  } catch (error) {
    res.status(400).send("Update failed: " + error.message);
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
