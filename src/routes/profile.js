const express = require("express");

const profileRouter = express.Router();
const {userAuth} = require("../middlewares/Auth")

profileRouter.get("/profile", userAuth, async (req, res) => {
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

module.exports = profileRouter;