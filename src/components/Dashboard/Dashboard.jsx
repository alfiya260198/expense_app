import React, { useState, useEffect } from "react";
import ExpenseForm from "../Expenses/ExpenseForm";
import DashboardNavbar from "../Dashboard/DashboardNavbar"

const Dashboard = ({ setIsLoggedIn }) => {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = (expense) => {
    setExpenses([...expenses, expense]);
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
