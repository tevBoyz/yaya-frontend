// src/components/Dashboard.jsx
import { useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { debounce } from "lodash"

import TransactionTable from "./TransactionTable"
import TransactionCards from "./TransactionCards"
import TransactionPagination from "./TransactionPagination"
import SearchBar from "./SearchBar"
import ThemeToggle from "./ThemeToggle"
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import { fetchServerTime, fetchTransactions, searchTransactionsAction } from "../store/thunks/transactionThunks"
import { setCurrentPage, clearSearch } from "../store/slices/transactionsSlice"

const CURRENT_USER_ID = "123"

const Dashboard = () => {
  const dispatch = useDispatch()
  const { transactions, searchResults, currentPage, totalPages, isSearchMode } = useSelector(
    (state) => state.transactions
  )
  const { isLoading, error, serverTime } = useSelector((state) => state.ui)

  useEffect(() => {
    dispatch(fetchServerTime())
    dispatch(fetchTransactions(1))
  }, [dispatch])

  // Debounced search to prevent rapid API calls
  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      if (searchTerm.trim()) {
        dispatch(searchTransactionsAction(searchTerm))
        dispatch(setCurrentPage(1))
      } else {
        dispatch(clearSearch())
        dispatch(fetchTransactions(1))
      }
    }, 300),
    [dispatch]
  )

  const handleSearch = (searchTerm) => {
    debouncedSearch(searchTerm)
  }

  const handlePageChange = useCallback((page) => {
    dispatch(setCurrentPage(page))
    if (!isSearchMode) {
      dispatch(fetchTransactions(page))
    }
  }, [dispatch, isSearchMode])

  const handleRefresh = useCallback(() => {
    dispatch(clearSearch())
    dispatch(fetchTransactions(1))
    dispatch(fetchServerTime())
  }, [dispatch])

  // Safely get display transactions
  const displayTransactions = isSearchMode ? (searchResults || []) : (transactions || [])
  
  // Safely check if search results are empty
  const isSearchEmpty = isSearchMode && (!searchResults || searchResults.length === 0) && !isLoading

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Transaction Dashboard</h1>
          {serverTime && (
            <p className="text-sm text-muted-foreground">
              Server Time: {new Date(serverTime).toLocaleString()}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button onClick={handleRefresh} disabled={isLoading}>
            {isLoading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : null}
            Refresh
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-destructive/15 text-destructive p-3 rounded-md">
          {error}
        </div>
      )}

      <div className="flex justify-between items-center">
        <SearchBar onSearch={handleSearch} />
      </div>

      {isSearchEmpty && (
        <div className="text-center p-8">
          <p>No transactions found matching your search.</p>
          <Button variant="outline" onClick={() => handleSearch("")} className="mt-4">
            Clear Search
          </Button>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <ReloadIcon className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block">
            <TransactionTable 
              transactions={displayTransactions} 
              currentUserId={CURRENT_USER_ID} 
            />
          </div>

          {/* Mobile Cards */}
          <TransactionCards 
            transactions={displayTransactions} 
            currentUserId={CURRENT_USER_ID} 
          />

          {/* Pagination - Show for both normal view and search if we have multiple pages */}
          {(totalPages > 1) && (
            <div className="flex justify-center mt-6">
              <TransactionPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Dashboard