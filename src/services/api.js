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
  const response = await api.get(`/transactions/find-by-user?userId=${userId}&p=${page}`)
  return response.data
}

export const searchTransactions = async (searchTerm, userId) => {
  const response = await api.post('/transactions/search', {
    searchTerm,
    userId,
  })
  return response.data
}