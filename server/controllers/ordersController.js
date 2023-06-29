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

  // Validate the data (you can add your own validation logic here)

  // Store the data in the customer table
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
