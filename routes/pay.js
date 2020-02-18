const express = require("express");
const router = express.Router();
const stripe = require("stripe")("sk_test_5ku4MO64Axct6ShGZbaz6RPT");
const Pay = require("../models/Pay");
const User = require("../models/User");

router.post("/pay", async (req, res) => {
  const stripeToken = req.fields.stripeToken;
  const price = req.fields.price * 10;
  const title = req.fields.title;
  const offerId = req.fields.offerid;

  const response = await stripe.charges.create({
    amount: price,
    currency: "eur",
    description: title,
    source: stripeToken
  });

  const token = req.fields.token;
  const user = await User.findOne({ token: token });
  const userId = user._id;

  const payment = await new Pay({
    amount: price,
    offer: offerId,
    account: userId
  });
  await payment.save();
  //   console.log(response);

  //recherche l'id du user

  //extrait le token généré par stripe
});

module.exports = router;
