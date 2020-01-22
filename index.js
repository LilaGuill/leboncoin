const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/leboncoin", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const user = require("./routes/user");
app.use(user);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});
app.listen(3000, (req, res) => {
  console.log("Server started");
});
