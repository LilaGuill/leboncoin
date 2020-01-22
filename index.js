const express = require("express");
const app = express();
const mongoose = require("mongoose");
const formidableMiddleware = require("express-formidable");
app.use(formidableMiddleware());

mongoose.connect("mongodb://localhost/leboncoin", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const user = require("./routes/user");
app.use(user);

const offer = require("./routes/offer");
app.use(offer);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});
app.listen(3000, (req, res) => {
  console.log("Server started");
});
