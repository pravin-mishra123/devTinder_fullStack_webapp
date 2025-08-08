// creating server using express
const express = require("express");

const app = express();


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

// started listening my server on 3000 port
app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777....");
});
