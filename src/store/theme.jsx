// src/store/theme.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDark: false,
  isPremiumActive: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.isDark = !state.isDark;
    },
    activatePremium(state) {
      state.isPremiumActive = true;
      state.isDark = true; 
    },
    deactivatePremium(state) {
      state.isPremiumActive = false;
      state.isDark = false;
    },
  },
});

export const { toggleTheme, activatePremium, deactivatePremium } = themeSlice.actions;

export default themeSlice.reducer;
