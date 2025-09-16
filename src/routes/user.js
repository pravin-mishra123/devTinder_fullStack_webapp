const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/Auth");
const ConnectionRequest = require("../models/connectionRequest");

// Get all the pending connection request for the loggedIn user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", "firstName lastName photoUrl age gender about skills"); // 2nd way
    // .populate("fromUserId", ["firstName", "lastName"]); // 1st way 
    
    res.json({ message: "Data fetched successfully", data: connectionRequest });
  } catch (error) {
    req.statusCode(400).send("ERROR: " + error.message);
  }
});

module.exports = userRouter;
