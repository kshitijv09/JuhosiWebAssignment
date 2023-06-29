const express = require("express");

const router = express.Router();
const auth = require("../controllers/authController");

router.route("/signup").post(auth.signup);
router.route("/login").post(auth.login);

module.exports = router;
