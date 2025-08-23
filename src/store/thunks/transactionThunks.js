import { getServerTime, getTransactionsByUser, searchTransactions } from '../../services/api'
import { setLoading, setError, setServerTime } from '../slices/uiSlice'
import { setTransactions, setSearchResults } from '../slices/transactionsSlice'

const CURRENT_USER_ID = '123'

// Fetch server time
export const fetchServerTime = () => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    const time = await getServerTime()
    dispatch(setServerTime(time))
  } catch (error) {
    dispatch(setError('Failed to fetch server time'))
  } finally {
    dispatch(setLoading(false))
  }
}

// Fetch transactions by user
export const fetchTransactions = (page) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    const data = await getTransactionsByUser(CURRENT_USER_ID, page)
    dispatch(setTransactions({ 
      transactions: data.transactions, 
      totalPages: data.totalPages 
    }))
  } catch (error) {
    dispatch(setError('Failed to fetch transactions'))
  } finally {
    dispatch(setLoading(false))
  }
}

// Search transactions
export const searchTransactionsAction = (searchTerm) => async (dispatch) => {
  try {
    if (!searchTerm.trim()) {
      dispatch(fetchTransactions(1))
      return
    }
    
    dispatch(setLoading(true))
    const results = await searchTransactions(searchTerm, CURRENT_USER_ID)
    dispatch(setSearchResults(results))
  } catch (error) {
    dispatch(setError('Failed to search transactions'))
  } finally {
    dispatch(setLoading(false))
  }
}