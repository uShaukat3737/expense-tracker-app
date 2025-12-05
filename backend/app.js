import 'dotenv/config';                  // Vercel loads .env automatically
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" }); // Local override

import express from "express";
import cors from "cors";
import { connectDB } from "./DB/Database.js";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import transactionRoutes from "./Routers/Transactions.js";
import userRoutes from "./Routers/userRouter.js";

// --- SENTRY INIT ---
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";


const app = express();


Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0, // performance monitoring
});

//  MUST BE BEFORE ALL ROUTES
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// Connect to MongoDB
connectDB();

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Backend running" });
});

const allowedOrigins = [
  "https://main.d1sj7cd70hlter.amplifyapp.com",
  "https://expense-tracker-app-three-beryl.vercel.app",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/v1", transactionRoutes);
app.use("/api/auth", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//  MUST BE AFTER ALL ROUTES
app.use(Sentry.Handlers.errorHandler());

// Optional: Sentry test route
app.get("/debug-sentry", () => {
  throw new Error("Sentry backend test!");
});

// --- START SERVER ONLY IF RUNNING LOCALLY ---
const port = process.env.PORT || 5000;

if (process.env.VERCEL === undefined) {
  app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
  });
}

export default app;
