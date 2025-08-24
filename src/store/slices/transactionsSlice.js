// src/store/slices/transactionsSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  transactions: [],
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  perPage: 15,
  incomingSum: 0,
  outgoingSum: 0,
  searchResults: [],
  isSearchMode: false,
}

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      const response = action.payload;
      
      // Handle the new response format
      if (response && Array.isArray(response.data)) {
        state.transactions = response.data;
        state.totalPages = response.lastPage || 1;
        state.totalItems = response.total || 0;
        state.perPage = response.perPage || 15;
        state.incomingSum = response.incomingSum || 0;
        state.outgoingSum = response.outgoingSum || 0;
      } else if (Array.isArray(response)) {
        // Fallback for search or other endpoints that might return array directly
        state.transactions = response;
        state.totalPages = 1;
        state.totalItems = response.length;
        state.perPage = response.length;
        state.incomingSum = 0;
        state.outgoingSum = 0;
      } else {
        // Fallback to empty values
        state.transactions = [];
        state.totalPages = 1;
        state.totalItems = 0;
        state.perPage = 15;
        state.incomingSum = 0;
        state.outgoingSum = 0;
      }
      
      state.isSearchMode = false;
    },
    setSearchResults: (state, action) => {
      const response = action.payload;
      
      if (Array.isArray(response)) {
        state.searchResults = response;
      } else if (response && Array.isArray(response.data)) {
        state.searchResults = response.data;
      } else if (response && Array.isArray(response.results)) {
        state.searchResults = response.results;
      } else {
        state.searchResults = [];
      }
      
      state.isSearchMode = true;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearSearch: (state) => {
      state.searchResults = [];
      state.isSearchMode = false;
    },
  },
})

export const { setTransactions, setSearchResults, setCurrentPage, clearSearch } = transactionsSlice.actions
export default transactionsSlice.reducer