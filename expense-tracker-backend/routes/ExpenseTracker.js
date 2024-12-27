import express from "express";
import {
  addExpense,
  deleteExpense,
  getExpenses,
} from "../controller/ExpenseController.js";
const router = express.Router();

/// get Expenses
router.get("/", getExpenses);

/// post Expenses
router.post("/", addExpense);

/// delete Expenses
router.delete("/:id", deleteExpense);

export default router;
