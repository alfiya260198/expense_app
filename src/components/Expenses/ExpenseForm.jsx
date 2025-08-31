import React, { useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = ({ onAddExpense }) => {
  const [money, setMoney] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!money || !description) {
      alert("Please fill all fields");
      return;
    }

    const newExpense = {
      money,
      description,
      category,
    };

    try {
      setLoading(true);
      const response = await fetch(
        "https://expense-tracker-app-b4585-default-rtdb.firebaseio.com/alk/-OZ-EiBh8uEfu8FOhB5Mm/expenses.json",
        {
          method: "POST",
          body: JSON.stringify(newExpense),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save expense");
      }

      const data = await response.json();
      onAddExpense({ id: data.name, ...newExpense });

      // reset form
      setMoney("");
      setDescription("");
      setCategory("Food");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
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

      <button type="submit" className="add-btn" disabled={loading}>
        {loading ? "Adding..." : "Add Expense"}
      </button>
    </form>
  );
};

export default ExpenseForm;
