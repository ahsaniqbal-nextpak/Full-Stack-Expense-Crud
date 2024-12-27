import express from "express";
const app = express();
import logger from "./middleware/logger.js";
import ExpenseTracker from "./routes/ExpenseTracker.js";
import error from "./middleware/error.js";
import notFound from "./middleware/notFound.js";
import cors from "cors";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//// Logger Middlewares
app.use(logger);

/// Routes
app.use("/api/expenses", ExpenseTracker);

/// Not Found
app.use(notFound);

////Error
app.use(error);

app.listen(8000, () => console.log("Server started on port 8000"));
