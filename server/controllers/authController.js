const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db/connect");

const signup = async (req, res) => {
  const { email, password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      const newUser = {
        email,
        password: hashedPassword,
      };
      db.query("INSERT INTO users SET ?", newUser, (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Failed to register user" });
        } else {
          res.status(201).json({ message: "User registered successfully" });
        }
      });
    }
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    } else if (results.length === 0) {
      res.status(401).json({ error: "Invalid credentials" });
    } else {
      const user = results[0];

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Internal server error" });
        } else if (!isMatch) {
          res.status(401).json({ error: "Invalid credentials" });
        } else {
          const token = jwt.sign(
            { userId: user.id, username: user.username },
            "my_secret_key",
            { expiresIn: "10d" }
          );
          res.status(200).json({ token });
        }
      });
    }
  });
};

module.exports = {
  signup,
  login,
};
