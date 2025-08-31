import React, { useState, useEffect } from "react";
import ExpenseForm from "../Expenses/ExpenseForm";
import DashboardNavbar from "../Dashboard/DashboardNavbar";

const Dashboard = ({ setIsLoggedIn }) => {
  const [expenses, setExpenses] = useState([]);

  const DB_URL = "https://expense-tracker-app-b4585-default-rtdb.firebaseio.com/expenses.json";

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await fetch(DB_URL);
        const data = await res.json();
        if (data) {
          const loadedExpenses = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setExpenses(loadedExpenses);
        }
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  // Add new expense
  const handleAddExpense = async (expense) => {
    try {
      const res = await fetch(DB_URL, {
        method: "POST",
        body: JSON.stringify(expense),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const data = await res.json();
        setExpenses((prev) => [...prev, { id: data.name, ...expense }]);
      }
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <>
      <DashboardNavbar />
      <div className="dashboard-container">
        <h2 className="title">Expense Tracker</h2>
        <ExpenseForm onAddExpense={handleAddExpense} />
        <div className="expense-list">
          <h3>My Expenses</h3>
          <ul>
            {expenses.length === 0 ? (
              <p>No expenses yet.</p>
            ) : (
              expenses.map((exp) => (
                <li key={exp.id}>
                  💰 {exp.money} | 📝 {exp.description} | 📌 {exp.category}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
