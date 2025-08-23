// src/store/slices/transactionsSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  transactions: [],
  currentPage: 1,
  totalPages: 1,
  searchResults: [],
  isSearchMode: false,
}

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      // Handle different possible response formats
      const response = action.payload
      
      if (Array.isArray(response)) {
        // If response is directly an array
        state.transactions = response
        state.totalPages = 1
      } else if (response && Array.isArray(response.transactions)) {
        // If response has transactions property
        state.transactions = response.transactions
        state.totalPages = response.totalPages || 1
      } else {
        // Fallback to empty array
        state.transactions = []
        state.totalPages = 1
      }
      
      state.isSearchMode = false
    },
    setSearchResults: (state, action) => {
      // Handle different possible response formats
      const response = action.payload
      
      if (Array.isArray(response)) {
        state.searchResults = response
      } else if (response && Array.isArray(response.transactions)) {
        state.searchResults = response.transactions
      } else if (response && Array.isArray(response.results)) {
        state.searchResults = response.results
      } else {
        state.searchResults = []
      }
      
      state.isSearchMode = true
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    clearSearch: (state) => {
      state.searchResults = []
      state.isSearchMode = false
    },
  },
})

export const { setTransactions, setSearchResults, setCurrentPage, clearSearch } = transactionsSlice.actions
export default transactionsSlice.reducer