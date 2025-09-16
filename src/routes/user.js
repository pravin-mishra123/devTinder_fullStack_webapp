const express = require("express");
const userRouter = express.Router();

const { userAuth } = require("../middlewares/Auth");
const ConnectionRequest = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

// Get all the pending connection request for the loggedIn user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA); // 2nd way
    // .populate("fromUserId", ["firstName", "lastName"]); // 1st way

    res.json({ message: "Data fetched successfully", data: connectionRequest });
  } catch (error) {
    req.statusCode(400).send("ERROR: " + error.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({ data });

  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = userRouter;
