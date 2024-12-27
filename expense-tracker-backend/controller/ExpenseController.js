import fs from "fs/promises";
import path from "path";

///Get File path
const filePath = path.join(process.cwd(), "expenses.json");

// Function to read expenses from the JSON file
const readExpenses = async () => {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
};

// Function to write expenses to the JSON file
const writeExpenses = async (expenses) => {
  await fs.writeFile(filePath, JSON.stringify(expenses, null, 2));
};

///@doc All Expenses
///@route GET /api/expenses
export const getExpenses = async (req, res, next) => {
  try {
    const expenses = await readExpenses();
    res.status(200).json(expenses);
  } catch (error) {
    return next(new Error("Error Getting Expenses"));
  }
};

///@doc Add Expense
///@route POST /api/expenses
export const addExpense = async (req, res, next) => {
  console.log(req.body);
  const { amount, type, title } = req.body;
  if (!amount || !type || !title) {
    const error = new Error("All fields are required");
    error.status = 400;
    return next(error);
  }
  try {
    const expenses = await readExpenses();
    const parsedAmount = Number(amount);
    if (type === "income") {
      expenses.income += Math.abs(parsedAmount);
      expenses.balance += Math.abs(parsedAmount);
    } else {
      expenses.expense += Math.abs(parsedAmount);
      expenses.balance -= Math.abs(parsedAmount);
    }

    expenses.history.push({
      id: expenses.history.length + 1,
      amount: parsedAmount,
      type,
      title,
    });
    await writeExpenses(expenses);
    res.status(200).json(expenses);
  } catch (error) {
    return next(new Error("Error updating expenses"));
  }
};

///@doc Delete Expense
///@route DELETE /api/expenses/:id
export const deleteExpense = async (req, res, next) => {
  const { id } = req.params;
  try {
    const expenses = await readExpenses();
    const index = expenses.history.findIndex((item) => item.id === Number(id));

    if (index === -1) {
      return res.status(400).json({ message: "History Not Found" });
    }

    const item = expenses.history[index];
    if (item.type === "income") {
      expenses.income -= Math.abs(item.amount);
      expenses.balance -= Math.abs(item.amount);
    } else {
      expenses.expense -= Math.abs(item.amount);
      expenses.balance += Math.abs(item.amount);
    }

    expenses.history.splice(index, 1);
    await writeExpenses(expenses);
    res.status(200).json(expenses);
  } catch (error) {
    return next(new Error("Error deleting expenses"));
  }
};
