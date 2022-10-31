const express = require("express");
const logControls = require("../controllers/logControls");
const eshopControls = require("../controllers/eshopControls")
const router = express.Router();

router.post("/register", logControls.register);
router.post("/login", logControls.login);
router.post("/authenticate",logControls.authenticate);
router.get("/fetchProducts",eshopControls.getProductData);
router.post("/favoriteProducts",eshopControls.setFavorite);
router.post("/favoriteFetch",eshopControls.fetchFavorites);
router.delete("/deleteFavorite",eshopControls.deleteFav);


module.exports = router;