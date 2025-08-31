import React, { useEffect, useState } from "react";
import DashboardNavbar from "./DashboardNavbar";
import ExpenseForm from "../Expenses/ExpenseForm";

const DB_BASE = "https://expense-tracker-app-b4585-default-rtdb.firebaseio.com";
const EXPENSES_URL = `${DB_BASE}/expenses`; // same path you used before

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState("");
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    let alive = true;
    const fetchExpenses = async () => {
      setLoading(true);
      setListError("");
      try {
        const res = await fetch(`${EXPENSES_URL}.json`);
        if (!res.ok) throw new Error("Failed to fetch expenses");
        const data = await res.json();
        const items = data
          ? Object.entries(data).map(([id, val]) => ({ id, ...val }))
          : [];
        if (alive) setExpenses(items);
      } catch (e) {
        if (alive) setListError(e.message || "Failed to load expenses");
      } finally {
        if (alive) setLoading(false);
      }
    };
    fetchExpenses();
    return () => { alive = false; };
  }, []);


  const handleAddExpense = async (expense) => {
    const res = await fetch(`${EXPENSES_URL}.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense),
    });
    if (!res.ok) throw new Error("Failed to add expense");
    const data = await res.json(); // { name: "<id>" }
    setExpenses((prev) => [...prev, { id: data.name, ...expense }]);
  };

  const handleDeleteExpense = async (id) => {
    const res = await fetch(`${EXPENSES_URL}/${id}.json`, { method: "DELETE" });
    if (!res.ok) {
      console.error("Delete failed");
      return;
    }
    setExpenses((prev) => prev.filter((e) => e.id !== id));
    console.log("Expense successfully deleted");
    // If you were editing the same item, exit edit mode
    if (editingExpense?.id === id) setEditingExpense(null);
  };

  const handleUpdateExpense = async (id, payload) => {
    const res = await fetch(`${EXPENSES_URL}/${id}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to update expense");
    setExpenses((prev) => prev.map((e) => (e.id === id ? { id, ...payload } : e)));
    setEditingExpense(null);
  };

  return (
    <>
      <DashboardNavbar />

      <div className="dashboard-container">
        <h2 className="title">Expense Tracker</h2>

        <ExpenseForm
          onAddExpense={handleAddExpense}
          onUpdateExpense={handleUpdateExpense}
          editingExpense={editingExpense}
          onCancelEdit={() => setEditingExpense(null)}
        />

        <div className="expense-list">
          <h3>My Expenses</h3>

          {loading && <p>Loading expenses...</p>}
          {listError && <p style={{ color: "red" }}>{listError}</p>}

          {!loading && !listError && (
            <ul>
              {expenses.length === 0 ? (
                <p>No expenses yet.</p>
              ) : (
                expenses.map((exp) => (
                  <li key={exp.id} style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                    <span>💰 {exp.money} | 📝 {exp.description} | 📌 {exp.category}</span>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        className="add-btn"
                        style={{ background: "#ffa500", padding: "10px 20px", width: "100px"}}
                        onClick={() => setEditingExpense(exp)}
                      >
                        Edit
                      </button>
                      <button
                        className="add-btn"
                        style={{ background: "#e74c3c", padding: "10px 20px", width: "100px" }}
                        onClick={() => handleDeleteExpense(exp.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
