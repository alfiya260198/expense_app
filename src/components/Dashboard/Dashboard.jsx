import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExpenses,
  addExpense,
  deleteExpense,
  editExpense,
} from "../../store/slices/expenseSlice";
import { toggleTheme } from "../../store/slices/themeSlice";
import ExpenseForm from "../Expenses/ExpenseForm";
import DashboardNavbar from "../Dashboard/DashboardNavbar";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { items: expenses, loading } = useSelector((state) => state.expenses);
const darkMode = useSelector((state) => state.theme.darkMode);


  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  const handleAddExpense = (expense) => {
    dispatch(addExpense(expense));
  };

  const handleDelete = (id) => {
    dispatch(deleteExpense(id));
  };

  const handleEdit = (exp) => {
    setEditingExpense(exp);
  };

  const handleUpdateExpense = (updated) => {
    dispatch(editExpense(updated));
  };

  const clearEdit = () => setEditingExpense(null);

  const totalAmount = expenses.reduce(
    (sum, exp) => sum + Number(exp.money),
    0
  );

  const downloadCSV = () => {
    if (!expenses.length) return;

    const headers = ["Amount", "Description", "Category"];
    const rows = expenses.map((exp) => [
      exp.money,
      exp.description,
      exp.category,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <DashboardNavbar />
      <div className="dashboard-container">
        <h2 className="title">Expense Tracker</h2>

        <ExpenseForm
          onAddExpense={handleAddExpense}
          editingExpense={editingExpense}
          onUpdateExpense={handleUpdateExpense}
          clearEdit={clearEdit}
        />

        <div className="expense-list">
          <h3>My Expenses</h3>
          {loading ? (
            <p>Loading...</p>
          ) : expenses.length === 0 ? (
            <p>No expenses yet.</p>
          ) : (
            <ul>
              {expenses
                .filter(
                  (exp) => exp.id !== (editingExpense && editingExpense.id)
                )
                .map((exp) => (
                  <li key={exp.id}>
                    💰 {exp.money} | 📝 {exp.description} | 📌 {exp.category}
                    <button
                      onClick={() => handleDelete(exp.id)}
                      style={{
                        border: "none",
                        padding: "10px 20px",
                        background: "#DC143C",
                        color: "white",
                        borderRadius: "10px",
                        marginLeft: "10px",
                      }}
                    >
                      ❌ Delete
                    </button>
                    <button
                      onClick={() => handleEdit(exp)}
                      style={{
                        border: "none",
                        padding: "10px 20px",
                        background: "#DAA520",
                        color: "white",
                        borderRadius: "10px",
                        marginLeft: "10px",
                      }}
                    >
                      ✏️ Edit
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </div>

        <div style={{ marginTop: "20px" }}>
          {/* Premium Button (visible only if totalAmount > 10000) */}
          {totalAmount > 10000 && (
            <button
              style={{
                border: "none",
                padding: "10px 20px",
                background: "purple",
                color: "white",
                borderRadius: "10px",
                marginRight: "10px",
              }}
            >
              Activate Premium
            </button>
          )}

          <button
            onClick={() => dispatch(toggleTheme())}
            style={{
              border: "none",
              padding: "10px 20px",
              background: darkMode ? "#444" : "brown",
              color: "white",
              borderRadius: "10px",
              marginRight: "10px",
            }}
          >
            {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>

          <button
            onClick={downloadCSV}
            style={{
              border: "none",
              padding: "10px 20px",
              background: "green",
              color: "white",
              borderRadius: "10px",
            }}
          >
            Download Expenses
          </button>

          <button
            onClick={() => console.log("Logging out...")}
            style={{
              border: "none",
              padding: "10px 20px",
              background: "#DC143C",
              color: "white",
              borderRadius: "10px",
              marginLeft: "10px",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
