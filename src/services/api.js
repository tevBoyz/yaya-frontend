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
  return response.data
}

// Transactions API
export const getTransactionsByUser = async (userId, page = 1) => {
  try {
    const response = await api.get(`/transactions/find-by-user?userId=${userId}&p=${page}`)
    console.log('Transactions API response:', response.data)
    return response.data || { transactions: [], totalPages: 1 }
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
    console.log('Search API response:', response.data)
    return response.data || []
  } catch (error) {
    console.error('Error searching transactions:', error)
    return []
  }
}