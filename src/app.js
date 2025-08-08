// creating server using express
const express = require("express");

const app = express();
const { adminAuth, userAuth } = require("./middlewares/Auth");

// Why do we need middleware actually ??

// Handle Auth Middleware for all GET, POST.........requests.

app.use("/admin", adminAuth);
// app.use("/user", userAuth) // write like this also

app.get("/admin/getAllData", (req, res) => {
  res.send("All data sent");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted the User");
});

app.get("/user/login", (req, res) => {
  res.send("User logged in successfully");
});

app.get("/user/deleteUser", userAuth, (req, res) => {
  res.send("Kya bolte ho");
});

// started listening my server on 3000 port
app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777....");
});
