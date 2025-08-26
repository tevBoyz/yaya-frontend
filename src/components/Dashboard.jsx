import { useEffect, useCallback, useState } from "react"
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
import {setError} from "../store/slices/uiSlice"

const CURRENT_USER_ID = "b7a2ed94-cb41-4298-8407-cba5e9575d59"

const Dashboard = () => {
  const dispatch = useDispatch()
  const { 
    transactions, 
    searchResults, 
    currentPage, 
    totalPages, 
    totalItems,
    perPage,
    incomingSum,
    outgoingSum,
    isSearchMode 
  } = useSelector((state) => state.transactions)
  
  const { isLoading, error, serverTime } = useSelector((state) => state.ui)
  const [liveTime, setLiveTime] = useState(null)

  useEffect(() => {
    dispatch(fetchServerTime())
    dispatch(fetchTransactions(1))
  }, [dispatch])


  //update server time realtime
  useEffect(() => {
    if (serverTime) {
      const serverDate = new Date(serverTime)
      setLiveTime(serverDate)

      const interval = setInterval(() => {
        setLiveTime((prev) => new Date(prev.getTime() + 1000)) 
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [serverTime])

  // debounce function to controll multi api requests 
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

  // search function
  const handleSearch = (searchTerm) => {
    debouncedSearch(searchTerm)
  }

  // pagination handler for a page request
  const handlePageChange = useCallback((page) => {
    dispatch(setCurrentPage(page))
    if (!isSearchMode) {
      dispatch(fetchTransactions(page))
    }
  }, [dispatch, isSearchMode])

  // refresh handler
  const handleRefresh = useCallback(() => {
    dispatch(clearSearch())
    dispatch(fetchTransactions(1))
    dispatch(fetchServerTime())
  }, [dispatch])

  const displayTransactions = isSearchMode ? (searchResults || []) : (transactions || [])
  const isSearchEmpty = isSearchMode && (!searchResults || searchResults.length === 0) && !isLoading

   useEffect(() => {
    if(displayTransactions && displayTransactions.length > 0) {
      dispatch(setError("")) // Clear error if transactions are successfully fetched
    }
  }, [displayTransactions, dispatch])

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <img className="h-12 cursor-pointer hidden lg:block" src="/yaya.png" alt="Yaya Logo" onClick={handleRefresh}/>
        <div className="flex flex-col items-start sm:items-center">
          <h1 className="text-3xl font-bold">Transaction Dashboard</h1>
          {serverTime && (
            <p className="text-sm text-muted-foreground">
              Server Time: {new Date(liveTime).toLocaleString()}
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

      {/* Error bar if fetch fails */}
      {error &&(
        <div className="bg-destructive/15 text-destructive p-3 rounded-md">
          {error}
        </div>
      )}

      {/* Search bar */}
      <div className="flex justify-center items-center">
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

      {/* Loading animation if transactions are being fetched */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <ReloadIcon className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <>
          <div className="hidden md:block">
            {/* Table view in desktop mode */}
            <TransactionTable 
              transactions={displayTransactions} 
              currentUserId={CURRENT_USER_ID} 
            />
          </div>
          {/* Card view in mobile mode */}
          <TransactionCards 
            transactions={displayTransactions} 
            currentUserId={CURRENT_USER_ID} 
          />
          {/* Pagination area */}
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