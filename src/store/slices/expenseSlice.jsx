import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL =
  "https://expense-tracker-app-b4585-default-rtdb.firebaseio.com/expenses.json";

export const fetchExpenses = createAsyncThunk("expenses/fetch", async () => {
  const res = await axios.get(API_URL);
  if (res.data) {
    return Object.keys(res.data).map((key) => ({
      id: key,
      ...res.data[key],
    }));
  }
  return [];
});


export const addExpense = createAsyncThunk("expenses/add", async (expense) => {
  const res = await axios.post(API_URL, expense);
  return { ...expense, id: res.data.name }; // Firebase gives unique `name`
});

export const deleteExpense = createAsyncThunk("expenses/delete", async (id) => {
  await axios.delete(
    `https://expense-tracker-app-b4585-default-rtdb.firebaseio.com/expenses/${id}.json`
  );
  return id;
});


export const editExpense = createAsyncThunk(
  "expenses/edit",
  async (updatedExpense) => {
    await axios.put(
      `https://expense-tracker-app-b4585-default-rtdb.firebaseio.com/expenses/${updatedExpense.id}.json`,
      updatedExpense
    );
    return updatedExpense;
  }
);

const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.items = state.items.filter((exp) => exp.id !== action.payload);
        console.log("Expense successfully deleted");
      })
      .addCase(editExpense.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (exp) => exp.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default expenseSlice.reducer;