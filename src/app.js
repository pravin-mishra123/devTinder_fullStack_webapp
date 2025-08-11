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
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
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
    const ALLOWED_UPDATES = ["photoUrl", "age", "about", "gender", "skills"];

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
