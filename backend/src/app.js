const express = require("express");
connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const chatRoute = require("./routes/chatRoute");
const http = require("http");
const path = require("path");
require("dotenv").config();
const allowedOrigins = [process.env.FRONTEND_URI, "http://localhost:5173"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

const _dirname = path.resolve();
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const initializeSocket = require("./utils/socket");
const uploadRouter = require("./routes/upload");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", chatRoute);
app.use("/", uploadRouter);

const server = http.createServer(app);
initializeSocket(server);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    console.log(" Database connected successfully");

    server.listen(PORT, () => {
      console.log(` Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" Database connection failed");
  });
