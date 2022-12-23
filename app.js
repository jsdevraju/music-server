// import all lib
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { config } from "dotenv";
import errorHandler from "./middleware/error.js";

// Environment Variable Configuration
config();

// Define Application Entry point app
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://music-client-pi.vercel.app",
    ],
  })
);
app.use(morgan("dev"));
app.use(cookieParser());

// test route
app.get("/", (req, res) => {
  res.json({ message : "Api Working....."})
});

// Routes
import auth from './routes/auth/index.js'
import artist from './routes/artist/index.js'
import album from './routes/album/index.js'
import song from "./routes/song/index.js";
import user from "./routes/user/index.js";

// Routes Middleware
app.use("/api/v1/auth", auth)
app.use("/api/v1/artist", artist)
app.use("/api/v1/album", album)
app.use("/api/v1/song", song)
app.use("/api/v1/admin", user)

// Middleware Error Handler
app.use(errorHandler);

export default app;
