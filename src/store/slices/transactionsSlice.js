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
      state.transactions = action.payload.transactions
      state.totalPages = action.payload.totalPages
      state.isSearchMode = false
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload
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