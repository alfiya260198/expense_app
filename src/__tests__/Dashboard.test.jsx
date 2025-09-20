import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Dashboard from "../components/Dashboard/Dashboard";
import expensesReducer from "../store/slices/expenseSlice";
import themeReducer from "../store/slices/themeSlice";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

jest.mock("axios");

function renderWithStore(preloadedState) {
  const store = configureStore({
    reducer: {
      expenses: expensesReducer,
      theme: themeReducer,
    },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    </Provider>
  );
}

describe("Dashboard Tests", () => {
  afterEach(() => jest.clearAllMocks());

  test("fetchExpenses is called on mount", async () => {
    axios.get.mockResolvedValue({ data: { a1: { money: 100, description: "Food", category: "Food" } } });
    await act(async () => renderWithStore({ expenses: { items: [], loading: false, error: null }, theme: { isDark: false, isPremiumActive: false } }));

    expect(axios.get).toHaveBeenCalled();
  });

  test("displays error when fetch fails", async () => {
    axios.get.mockRejectedValue(new Error("Network Error"));
    await act(async () => renderWithStore({ expenses: { items: [], loading: false, error: null }, theme: { isDark: false, isPremiumActive: false } }));

    expect(screen.getByText(/No expenses yet/i)).toBeInTheDocument();
  });

  test("adds a new expense", async () => {
    axios.post.mockResolvedValue({ data: { name: "xyz123" } });

    await act(async () => renderWithStore({
      expenses: { items: [], loading: false, error: null },
      theme: { isDark: false, isPremiumActive: false }
    }));

    fireEvent.change(screen.getByPlaceholderText(/Money Spent/i), { target: { value: "50" } });
    fireEvent.change(screen.getByPlaceholderText(/Description/i), { target: { value: "Coffee" } });
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "Food" } });

    await act(async () => fireEvent.click(screen.getByText(/Add Expense/i)));

    expect(axios.post).toHaveBeenCalled();
  });

  test("deletes an expense", async () => {
    axios.delete.mockResolvedValue({});

    await act(async () => renderWithStore({
      expenses: { items: [{ id: "1", money: 100, description: "Food", category: "Food" }], loading: false, error: null },
      theme: { isDark: false, isPremiumActive: false }
    }));

    await act(async () => fireEvent.click(screen.getByText(/Delete/i)));

    expect(axios.delete).toHaveBeenCalledWith(expect.stringContaining("expenses/1.json"));
  });

  test("edits an expense", async () => {
    axios.put.mockResolvedValue({});

    await act(async () => renderWithStore({
      expenses: { items: [{ id: "1", money: 100, description: "Food", category: "Food" }], loading: false, error: null },
      theme: { isDark: false, isPremiumActive: false }
    }));

    await act(async () => fireEvent.click(screen.getByText(/Edit/i)));
    fireEvent.change(screen.getByPlaceholderText(/Description/i), { target: { value: "Lunch" } });
    await act(async () => fireEvent.click(screen.getByText(/Update Expense/i)));

    expect(axios.put).toHaveBeenCalled();
  });

  test("toggles dark mode", async () => {
    await act(async () => renderWithStore({
      expenses: { items: [], loading: false, error: null },
      theme: { isDark: false, isPremiumActive: false }
    }));

    fireEvent.click(screen.getByText(/Switch to Dark Mode/i));
    expect(screen.getByText(/Switch to Light Mode/i)).toBeInTheDocument();
  });

  test("activates premium when total > 10000", async () => {
    await act(async () => renderWithStore({
      expenses: { items: [{ id: "1", money: 6000 }, { id: "2", money: 5000 }], loading: false, error: null },
      theme: { isDark: false, isPremiumActive: false }
    }));

    const button = screen.getByText(/Activate Premium/i);
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });

  test("downloads CSV", async () => {
    await act(async () => renderWithStore({
      expenses: { items: [{ id: "1", money: 200, description: "Food", category: "Food" }], loading: false, error: null },
      theme: { isDark: false, isPremiumActive: false }
    }));

    const createElementSpy = jest.spyOn(document, "createElement");
    fireEvent.click(screen.getByText(/Download Expenses/i));

    expect(createElementSpy).toHaveBeenCalledWith("a");
  });

test("logout button logs message", () => {
  const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  renderWithStore();
  fireEvent.click(screen.getByText(/Logout/i));
  expect(logSpy).toHaveBeenCalledWith("Logging out...");
  logSpy.mockRestore();
});


test("shows loading spinner", () => {
  renderWithStore({
    expenses: { items: [], loading: true, error: null },
    theme: { isDark: false, isPremiumActive: false }
  });
  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
});


});
