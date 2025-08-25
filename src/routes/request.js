const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/Auth");

// userAuth is a middleware that verify the token and user present or not
requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  console.log("conection request sent successfully!!");
  res.send(user.firstName + " " + "sent the connection request!");
});


module.exports = requestRouter;