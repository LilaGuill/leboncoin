const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const Pay = require("../models/Pay");
const User = require("../models/User");
const Offer = require("../models/Offer");

router.post("/pay", async (req, res) => {
  try {
    const stripeToken = req.fields.stripeToken;
    const price = req.fields.price * 10;
    const title = req.fields.title;
    const offerId = req.fields.offerId;

    const response = await stripe.charges.create({
      amount: price,
      currency: "eur",
      description: title,
      source: stripeToken,
    });

    if (response.status === "succeeded") {
      //récupère l'id de l'utilisateur
      const token = req.fields.token;
      const user = await User.findOne({ token: token });
      const userId = user._id;

      //sauvegarde du paiment dans la collection
      const payment = await new Pay({
        amount: price,
        offer: offerId,
        account: userId,
      });
      await payment.save();

      //l'annonce est retiré de la collection
      const offerToRemove = await Offer.findById(offerId);
      await offerToRemove.remove();

      res.json({ message: "success" });
    } else {
      res.json({ message: "incident de paiement" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
