import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  error: null,
  serverTime: null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setServerTime: (state, action) => {
      state.serverTime = action.payload
    },
  },
})

export const { setLoading, setError, setServerTime } = uiSlice.actions
export default uiSlice.reducer