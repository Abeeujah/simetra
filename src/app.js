import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import api from "./routes/routes.js";

const app = express();

// Middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", api);

export default app;
