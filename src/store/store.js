import { configureStore } from '@reduxjs/toolkit'
import transactionsReducer from './slices/transactionsSlice'
import uiReducer from './slices/uiSlice'


// Setting up store for Redux
export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    ui: uiReducer,
  },
})