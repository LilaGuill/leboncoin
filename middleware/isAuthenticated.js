const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
  //vérification de l'authentification de l'utilisateur
  //si oui
  if (req.headers.authorization) {
    //vérifie que le token est bien déjà présent dans la collection users
    const user = await User.findOne({
      token: req.headers.authorization.replace("Bearer ", "")
    });

    if (user) {
      // création de la propriété user dans req
      // req de la page offer/publish aura accès aux données de user
      req.user = user;
      return next();
      // next pour continuer à executer le code de la route offer/publish
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = isAuthenticated;
