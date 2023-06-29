const express = require("express");
const app = express();

const cors = require("cors");

require("dotenv").config();
require("express-async-errors");

const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentication");

const authRouter = require("./routes/auth");
const taskRouter = require("./routes/task");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const port = process.env.PORT || 5000;

const helmet = require("helmet");
const rateLimiter = require("express-rate-limit");
const xss = require("xss-clean");

app.use(express.json());
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(cors());
app.use(helmet());
app.use(xss());

app.use("/auth", authRouter);
app.use("/user", authenticateUser, taskRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is running on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
