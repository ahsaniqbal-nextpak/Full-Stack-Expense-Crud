import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { addExpense, deleteTransaltion, getExpenses } from "../controllers";
const ExpenseTracker = ({ data, setData }) => {
  const [formData, setFormData] = useState({
    text: "",
    amount: 0,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const deleteTransaction = (id) => {
    deleteTransaltion(id, (data) => setData(data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.text || !formData.amount) {
      alert("Please add a text and amount");
      return;
    }
    const newData = {
      amount: Number(formData.amount),
      title: formData.text,
      type: formData.amount > 0 ? "income" : "expense",
    };

    addExpense(newData, () => {
      getExpenses((data) => setData(data));
      setFormData({
        text: "",
        amount: 0,
      });
    });
  };
  return (
    <>
      <h2>Expense Tracker</h2>
      <div className="container">
        <h4>Your Balance</h4>
        <h1>Rs:{data?.balance}</h1>
        {/* Income Expence   */}
        <div className="inc-exp-container">
          <div>
            <h4>Income</h4>
            <p className="money plus">{data?.income}</p>
          </div>
          <div>
            <h4>Expense</h4>
            <p className="money minus">{data?.expense}</p>
          </div>
        </div>
        {/* ///History */}
        <h3>History</h3>
        {data?.history?.length === 0 ? (
          <h2 style={{ textAlign: "center", marginTop: "30px" }}>Not Found</h2>
        ) : (
          <ul id="list" className="list">
            <div className="card">
              {data?.history?.map((transaction, index) => (
                <li
                  key={index + 100}
                  className={`${
                    transaction?.type === "income" ? "plus" : "minus"
                  }`}
                >
                  {transaction?.title}
                  <span>{transaction?.amount}</span>
                  <button
                    className="delete-btn"
                    onClick={() => deleteTransaction(transaction.id)}
                  >
                    <MdDeleteForever className="icon" size={16} />
                  </button>
                </li>
              ))}
            </div>
          </ul>
        )}

        {/* Add New Transaction  */}
        <h3>Add new transaction</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="text">Text</label>
            <input
              type="text"
              placeholder="Enter text..."
              name="text"
              value={formData?.text}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">
              Amount <br />
              (negative - expense, positive - income)
            </label>
            <input
              type="number"
              placeholder="Enter amount..."
              name="amount"
              value={formData?.amount}
              onChange={handleChange}
            />
          </div>
          <button className="btn" type="submit">
            Add transaction
          </button>
        </form>
      </div>
    </>
  );
};

export default ExpenseTracker;
