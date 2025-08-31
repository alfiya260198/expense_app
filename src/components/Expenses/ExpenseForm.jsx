import React, { useEffect, useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = ({ onAddExpense, onUpdateExpense, editingExpense, onCancelEdit }) => {
  const [money, setMoney] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");
  const [submitting, setSubmitting] = useState(false);

  // Prefill in edit mode
  useEffect(() => {
    if (editingExpense) {
      setMoney(editingExpense.money ?? "");
      setDescription(editingExpense.description ?? "");
      setCategory(editingExpense.category ?? "Food");
    } else {
      setMoney("");
      setDescription("");
      setCategory("Food");
    }
  }, [editingExpense]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!money || !description) {
      alert("Please fill all fields");
      return;
    }
    const payload = {
      money: String(money),
      description: description.trim(),
      category,
      date: editingExpense?.date || new Date().toISOString(),
    };

    try {
      setSubmitting(true);
      if (editingExpense) {
        await onUpdateExpense(editingExpense.id, payload);
      } else {
        await onAddExpense(payload);
      }
    } finally {
      setSubmitting(false);
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
          <option value="Other">Other</option>
        </select>
      </div>

      <button type="submit" className="add-btn" disabled={submitting}>
        {submitting ? (editingExpense ? "Updating..." : "Adding...") : (editingExpense ? "Update Expense" : "Add Expense")}
      </button>

      {editingExpense && (
        <button type="button" className="add-btn" style={{ marginLeft: 8, background: "#aaa" }} onClick={onCancelEdit}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default ExpenseForm;
