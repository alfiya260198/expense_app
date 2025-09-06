import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExpenses,
  addExpense,
  deleteExpense,
  editExpense,
} from "../../store/slices/expenseSlice";
import ExpenseForm from "../Expenses/ExpenseForm";
import DashboardNavbar from "../Dashboard/DashboardNavbar";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { items: expenses, loading } = useSelector((state) => state.expenses);

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
                .filter((exp) => exp.id !== (editingExpense && editingExpense.id)) // hide editing item
                .map((exp) => (
                  <li key={exp.id}>
                    💰 {exp.money} | 📝 {exp.description} | 📌 {exp.category}
                    <button onClick={() => handleDelete(exp.id)} style={{border: "none", padding: "10px 20px", background: "#DC143C", color: "white", borderRadius: "10px", marginLeft: "10px"}}>❌ Delete</button>
                    <button onClick={() => handleEdit(exp)} style={{border: "none", padding: "10px 20px", background: "#DAA520", color: "white", borderRadius: "10px", marginLeft: "10px"}}>✏️ Edit</button>
                  </li>
                ))}
            </ul>
          )}
        </div>

        {totalAmount > 10000 && (
          <button className="premium-btn" style={{border: "none", padding: "10px 20px", background: "brown", color: "white", borderRadius: "10px"}}>Activate Premium</button>
        )}
      </div>
    </>
  );
};

export default Dashboard;
