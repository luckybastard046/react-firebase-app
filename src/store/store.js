import { configureStore } from '@reduxjs/toolkit';
import { notesReducer } from "./slices/noteSlice";

export const store = configureStore({
  reducer: {
    notesSlice: notesReducer,
  },
});