import React, { useState } from "react";
import "./ExpenseForm.css"

const ExpenseForm = ({ onAddExpense }) => {
  const [money, setMoney] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!money || !description) {
      alert("Please fill all fields");
      return;
    }

    const newExpense = {
      id: Date.now(),
      money,
      description,
      category,
    };

    onAddExpense(newExpense);

    // reset form
    setMoney("");
    setDescription("");
    setCategory("Food");
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <div className="input-field">
        <input
          type="number"
          placeholder="Money Spent"
          value={money}
          onChange={(e) => setMoney(e.target.value)}
          required
        />
      </div>

      <div className="input-field">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="input-field">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Food">Food</option>
          <option value="Petrol">Petrol</option>
          <option value="Salary">Salary</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <button type="submit" className="add-btn">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
