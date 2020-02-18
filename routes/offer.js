const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const isAuthenticated = require("../middleware/isAuthenticated");
const filter = require("../middleware/filter");
const Offer = require("../models/Offer");

router.get("/", async (req, res) => {
  try {
    const offerLength = await Offer.find();
    count = offerLength.length;

    const limit = 3;
    const page = Number(req.query.page);

    const offers = await Offer.find()
      .sort({ created: "desc" })
      .limit(limit)
      .skip(limit * (page - 1));

    res.json({ count, offers });
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.post("/search", async (req, res) => {
  const search = req.fields.search;
  try {
    const offerSearch = await Offer.find({
      title: { $regex: search, $options: "i" }
    });
    count = offerSearch.length;

    const limit = 3;
    const page = Number(req.query.page);

    const offers = await Offer.find({
      title: { $regex: search, $options: "i" }
    })
      .sort({ created: "desc" })
      .limit(limit)
      .skip(limit * (page - 1));

    res.json({ count, offers });
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.post("/offer/publish", isAuthenticated, async (req, res) => {
  try {
    const file = req.files.file.path;

    const picture = await cloudinary.uploader.upload(file, {
      width: 500,
      height: 280,
      crop: "fill"
    });

    // console.log(picture.secure_url);
    const newOffer = new Offer({
      title: req.fields.title,
      description: req.fields.description,
      price: req.fields.price,
      image: picture.secure_url,
      creator: req.user
    });

    await newOffer.save();

    res.json({
      title: newOffer.title,
      description: newOffer.description,
      price: newOffer.price,
      image: newOffer.image,
      created: newOffer.created,
      creator: {
        account: {
          username: newOffer.creator.account.username,
          phone: newOffer.creator.account.phone
        },
        _id: req.user._id
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/offer/with-count", filter, async (req, res) => {
  let offers = "";

  try {
    if (req.filter) {
      offers = Offer.find(req.filter).populate({
        path: "creator",
        select: "account"
      });
    } else {
      offers = Offer.find().populate({ path: "creator", select: "account" });
    }
    offers.count = offers.length;

    if (req.query.sort === "price-asc") {
      offers.sort({ price: 1 });
    }
    if (req.query.sort === "price-desc") {
      offers.sort({ price: -1 });
    }
    if (req.query.sort === "date-asc") {
      offers.sort({ created: 1 });
    }
    if (req.query.sort === "date-desc") {
      offers.sort({ created: -1 });
    }

    if (req.query.page) {
      const page = req.query.page;
      const limit = 5;
      await offers.limit(limit).skip(limit * (page - 1));
    }
    const offer = await offers;
    res.json({
      count: offers.count,
      offer
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/offer/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const userOffer = await Offer.findById(id).populate({
      path: "creator",
      select: "account"
    });

    const userId = userOffer.creator._id;

    //recherche du nombre d'annonce
    const userOffers = await Offer.find().populate({
      path: "creator",
      select: "_id",
      match: {
        _id: userId
      }
    });
    const countOffers = userOffers.length;

    res.json({ userOffer: userOffer, countOffers: countOffers });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
