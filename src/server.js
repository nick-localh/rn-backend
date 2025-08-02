import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";
import transactionsRoute from "./routes/transactionsRoute.js";

dotenv.config();

const app = express();

app.use(ratelimiter);
app.use(express.json());

const PORT = process.env.PORT || 5003;

app.get("/health-check", (req, res) => {
  res.send("Welcome to the Expense Tracker API");
});

app.use("/api/transactions", transactionsRoute);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening at localhost:${PORT}`);
  });
});
