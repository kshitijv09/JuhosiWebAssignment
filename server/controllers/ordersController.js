const connection = require("../db/connect");

const getAllOrders = async (req, res) => {
  const query = `SELECT * FROM customer`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing data query: ", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    res.json(results);
  });
};

const addOrder = (req, res) => {
  const {
    user,
    orderDate,
    company,
    owner,
    item,
    quantity,
    weight,
    shipmentRequest,
    trackingId,
    shipmentSize,
    boxCount,
    specification,
    checklistQuantity,
  } = req.body;

  if (typeof company !== "string") {
    return res.status(400).json({ error: "Invalid company" });
  }

  if (typeof owner !== "string") {
    return res.status(400).json({ error: "Invalid owner" });
  }

  if (typeof item !== "string") {
    return res.status(400).json({ error: "Invalid item" });
  }

  if (typeof parseInt(quantity) !== "number" || quantity <= 0) {
    return res.status(400).json({ error: "Invalid quantity" });
  }

  if (typeof shipmentRequest !== "string") {
    return res.status(400).json({ error: "Invalid shipmentRequest" });
  }

  if (typeof trackingId !== "string") {
    return res.status(400).json({ error: "Invalid trackingId" });
  }

  if (
    typeof shipmentSize !== "string" ||
    !/^\d+X\d+X\d+$/i.test(shipmentSize)
  ) {
    return res.status(400).json({ error: "Invalid shipmentSize" });
  }

  if (typeof parseInt(boxCount) !== "number" || boxCount <= 0) {
    return res.status(400).json({ error: "Invalid boxCount" });
  }

  if (typeof specification !== "string") {
    return res.status(400).json({ error: "Invalid specification" });
  }

  if (typeof checklistQuantity !== "string" || checklistQuantity <= 0) {
    return res.status(400).json({ error: "Invalid checklistQuantity" });
  }

  const query = `INSERT INTO customer (user,orderDate, company, owner, item, quantity,weight,shipmentRequest,trackingId,shipmentSize,boxCount,specification,checklistQuantity) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  connection.query(
    query,
    [
      user,
      orderDate,
      company,
      owner,
      item,
      quantity,
      weight,
      shipmentRequest,
      trackingId,
      shipmentSize,
      boxCount,
      specification,
      checklistQuantity,
    ],
    (err, results) => {
      if (err) {
        console.error("Error executing submit query: ", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      res.json({ success: true });
    }
  );
};

module.exports = {
  addOrder,
  getAllOrders,
};
