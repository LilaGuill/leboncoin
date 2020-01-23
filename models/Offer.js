const mongoose = require("mongoose");

const Offer = mongoose.model("Offer", {
  title: {
    type: String,
    minlenth: 1,
    maxlength: 50
  },
  description: {
    type: String,
    maxlength: 50
  },
  price: {
    type: Number,
    min: 0,
    max: 100000
  },
  created: {
    type: Date,
    default: Date.now // si default dans un type : la clé sera créee automatiquement pas necesaire de le rajouter dans la création du
    // du document
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = Offer;
