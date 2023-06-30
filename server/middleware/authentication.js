const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const payload = jwt.verify(token, "my_secret_key");
    req.userId = payload.id;
    next();
  } catch (error) {
    console.error("Error verifying JWT: ", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = auth;
