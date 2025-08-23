// src/services/api.js
import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Time API
export const getServerTime = async () => {
  const response = await api.get('/time')
  return response.data.time
}

// Transactions API
export const getTransactionsByUser = async (userId, page = 1) => {
  try {
    const response = await api.get(`/transactions/find-by-user?userId=${userId}&p=${page}`)
    
    // Handle different response formats
    if (response.data && Array.isArray(response.data.transactions)) {
      return {
        transactions: response.data.transactions,
        totalPages: response.data.totalPages || 1
      }
    } else if (Array.isArray(response.data)) {
      // If the API returns just an array, assume it's all transactions
      return {
        transactions: response.data,
        totalPages: 1
      }
    } else {
      return { transactions: [], totalPages: 1 }
    }
  } catch (error) {
    console.error('Error fetching transactions:', error)
    return { transactions: [], totalPages: 1 }
  }
}

export const searchTransactions = async (query, userId) => {
  try {
    const response = await api.post('/transactions/search', {
      query,
      userId,
    })
    
    // Handle different response formats
    if (Array.isArray(response.data)) {
      return response.data
    } else if (response.data && Array.isArray(response.data.transactions)) {
      return response.data.transactions
    } else if (response.data && Array.isArray(response.data.results)) {
      return response.data.results
    } else {
      return []
    }
  } catch (error) {
    console.error('Error searching transactions:', error)
    return []
  }
}