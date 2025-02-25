import { configureStore } from '@reduxjs/toolkit';
import togglesReducer from './togglesSlice';

export const store = configureStore({
  reducer: {
    toggles: togglesReducer,
  },
});