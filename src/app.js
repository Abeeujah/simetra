import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import api from "./routes/routes.js";
import { httpHealthzCheck } from "./controllers/healthz/healthz.controller.js";

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
app.get("/", (req, res) => res.redirect("/api/docs"));
app.get("/healthz", httpHealthzCheck);

export default app;
