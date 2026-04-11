import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";

// import errorMiddleware from "./middlewares/error.middleware.js"

const app = express();

// Protection against XSS attacks, clickjacking, malicious headers
app.use(helmet({ crossOriginResourcePolicy: false }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // only frontend allowed
    credentials: true,                // allows cookies
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

app.use(express.json({ limit: "10kb" }));        // To prevent large payload attacks
app.use(express.urlencoded({ extended: true })); // Handles form data from frontend
app.use(cookieParser());

// Logging in Development mode only
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// If no route matches
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// app.use(errorMiddleware);

export default app;
