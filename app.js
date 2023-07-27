const dotEnv = require("dotenv");
require("express-async-errors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const express = require("express");
const app = express();

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const connectDB = require("./db/connect");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

// Env
dotEnv.config();

// Logs
app.use(morgan("tiny"));

// middleware
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.json());

// Routes

// Error Middleware
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
