const express = require("express");
const app = express();
const mongoose = require("mongoose");
const formidableMiddleware = require("express-formidable");
const cors = require("cors");
app.use(formidableMiddleware());
app.use(cors());
require("dotenv").config();

console.log(process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {
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
app.listen(process.env.PORT, (req, res) => {
  console.log("Server started");
});
