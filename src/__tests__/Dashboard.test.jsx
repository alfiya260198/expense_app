import React from "react";
import "@testing-library/jest-dom";
import {
  render,
  screen,
  cleanup,
  waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";

import expenseReducer from "../store/slices/expenseSlice";
import themeReducer from "../store/slices/themeSlice";
import Dashboard from "../components/Dashboard/Dashboard";

jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  put: jest.fn(() => Promise.resolve({ data: {} })),
  delete: jest.fn(() => Promise.resolve({})),
}));

const makeStore = (preloadedState = {}) =>
  configureStore({
    reducer: {
      expenses: expenseReducer,
      theme: themeReducer,
    },
    preloadedState,
  });

afterEach(() => {
  cleanup();
});

describe("Dashboard Component", () => {
  test("renders dashboard heading", () => {
    const preloadedState = {
      expenses: { items: [], loading: false, error: null },
      theme: { darkMode: false },
    };
    const store = makeStore(preloadedState);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );

    const heading = screen.getByRole("heading", { name: /Expense Tracker/i });
    expect(heading).toBeInTheDocument();
  });

  test("shows 'No expenses yet.' when there are no expenses", async () => {
    const preloadedState = {
      expenses: { items: [], loading: false, error: null },
      theme: { darkMode: false },
    };
    const store = makeStore(preloadedState);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/No expenses yet\./i)).toBeInTheDocument();
    });
  });

  test("shows premium controls (theme toggle + download) when total expenses exceed 10000", async () => {
    const preloadedState = {
      expenses: {
        items: [
          { id: 1, money: 6000, description: "Shopping", category: "Clothes" },
          { id: 2, money: 5000, description: "Gadgets", category: "Electronics" },
        ],
        loading: false,
        error: null,
      },
      theme: { darkMode: false },
    };
    const store = makeStore(preloadedState);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      const downloadButton = screen.getByText(/Download Expenses/i);
      expect(downloadButton).toBeInTheDocument();

      const toggleButton = screen.getByRole("button", { name: /Switch to Dark Mode|Switch to Light Mode/i });
      expect(toggleButton).toBeInTheDocument();
    });
  });
});
