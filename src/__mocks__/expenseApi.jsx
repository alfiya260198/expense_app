import { jest } from "@jest/globals";

// Mocking all expense API calls
export const fetchExpenses = jest.fn();
export const addExpense = jest.fn();
export const deleteExpense = jest.fn();
export const editExpense = jest.fn();
