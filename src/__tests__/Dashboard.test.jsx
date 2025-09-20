import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; 
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Dashboard from "../components/Dashboard/Dashboard";
import expensesReducer from "../store/slices/expenseSlice";
import themeReducer from "../store/slices/themeSlice";
import { BrowserRouter } from "react-router-dom";
import store from "../store/store";
import { MemoryRouter } from "react-router-dom";


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
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Dashboard />
      </BrowserRouter>
    </Provider>
  );
}

describe("Dashboard Component", () => {
  test("renders dashboard title", () => {
    renderWithStore({
      expenses: { items: [], loading: false, error: null },
      theme: { darkMode: false },
    });

    const titles = screen.getAllByText(/Expense Tracker/i);
    expect(titles.length).toBeGreaterThan(0);
  });

  test("renders welcome message", () => {
    renderWithStore({
      expenses: { items: [], loading: false, error: null },
      theme: { darkMode: false },
    });

    expect(screen.getByText(/Welcome to Expense Tracker/i)).toBeInTheDocument();
  });

  test("renders loading state", () => {
    renderWithStore({
      expenses: { items: [], loading: true, error: null },
      theme: { darkMode: false },
    });

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test("renders empty state when no expenses", () => {
    renderWithStore({
      expenses: { items: [], loading: false, error: null },
      theme: { darkMode: false },
    });

    expect(screen.getByText(/My Expenses/i)).toBeInTheDocument();
  });

  test("renders expenses when items exist", () => {
    renderWithStore({
      expenses: {
        items: [
          { id: 1, money: 500, description: "Food", category: "Food" },
          { id: 2, money: 1200, description: "Petrol", category: "Petrol" },
        ],
        loading: false,
        error: null,
      },
      theme: { darkMode: false },
    });

    expect(screen.getByText(/Food/i)).toBeInTheDocument();
    expect(screen.getByText(/Petrol/i)).toBeInTheDocument();
  });

   test("renders premium button if expenses exceed 10000", () => {
    renderWithStore({
      expenses: {
        items: [
          { id: 1, money: 6000, description: "Shopping", category: "Clothes" },
          { id: 2, money: 5000, description: "Gadgets", category: "Electronics" },
        ],
        loading: false,
        error: null,
      },
      theme: { darkMode: false },
    });

    expect(
      screen.getByRole("button", { name: /Activate Premium/i })
    ).toBeInTheDocument();
  });

  test("does not render premium button if expenses are below 10000", () => {
    renderWithStore({
      expenses: {
        items: [{ id: 1, money: 2000, description: "Snacks", category: "Food" }],
        loading: false,
        error: null,
      },
      theme: { darkMode: false },
    });

    expect(screen.queryByText(/Premium/i)).not.toBeInTheDocument();
  });

  test("renders switch to dark mode button", () => {
    renderWithStore({
      expenses: { items: [], loading: false, error: null },
      theme: { darkMode: false }, // ensure dark mode OFF
    });

    expect(
      screen.getByRole("button", { name: /Switch to Dark Mode/i })
    ).toBeInTheDocument();
  });

   test("renders download expenses button", () => {
    renderWithStore({
      expenses: { items: [], loading: false, error: null },
      theme: { darkMode: false },
    });

    expect(
      screen.getByRole("button", { name: /Download Expenses/i })
    ).toBeInTheDocument();
  });

 
test("renders logout button", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    </Provider>
  );

  const logoutButtons = screen.getAllByRole("button", { name: /Logout/i });

  expect(logoutButtons[0]).toBeInTheDocument();
});

});
