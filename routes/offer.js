const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const Offer = require("../models/Offer");

router.post("/offer/publish", isAuthenticated, async (req, res) => {
  try {
    const newOffer = new Offer({
      title: req.fields.title,
      description: req.fields.description,
      price: req.fields.price,
      created: new Date(),
      creator: {
        account: { username: req.user.account.username },
        _id: req.user._id
      }
    });

    await newOffer.save();
    res.json(newOffer);
  } catch (error) {
    res.satus(400).json({ message: "An error occured" });
  }
});

module.exports = router;
