import axios from 'axios'

//fetch base url from .env file
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

if (!import.meta.env.VITE_API_BASE_URL) {
  console.warn('VITE_API_BASE_URL environment variable is not set. Using default:', API_BASE_URL);
}

//initialize axios using base url
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})


api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);


const processResponse = (response) => {
  if (!response || !response.data) return null;
  
  return response.data;
}

// Time API caller
export const getServerTime = async () => {
  try {
    const response = await api.get('/time');
    console.log("dvid", response.data);
    return response.data.time;
  } catch (error) {
    console.error('Error fetching server time:', error);
    throw error;
  }
}

// Transactions API caller
export const getTransactionsByUser = async (page = 1) => {
  try {
    const response = await api.get(`/transactions/find-by-user?p=${page}`);
    const processedData = processResponse(response);
    
    return processedData || { 
      data: [], 
      lastPage: 1, 
      total: 0, 
      perPage: 15,
      incomingSum: 0,
      outgoingSum: 0
    };
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return { 
      data: [], 
      lastPage: 1, 
      total: 0, 
      perPage: 15,
      incomingSum: 0,
      outgoingSum: 0
    };
  }
}

//Search Transactions API caller
export const searchTransactions = async (query) => {
  try {
    const response = await api.post('/transactions/search', { query });
    const processedData = processResponse(response);
    
    if (processedData && Array.isArray(processedData.data)) {
      return processedData.data;
    } else if (Array.isArray(processedData)) {
      return processedData;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error searching transactions:', error);
    return [];
  }
}