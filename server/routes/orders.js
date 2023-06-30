const express = require("express");
const router = express.Router();

const ordersController = require("../controllers/ordersController");
router.route("/orders").get(ordersController.getAllOrders);

router.route("/add_order").post(ordersController.addOrder);

module.exports = router;
