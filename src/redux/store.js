import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'

// Load state from sessionStorage if available
const persistedState = sessionStorage.getItem('reduxState')
  ? JSON.parse(sessionStorage.getItem('reduxState'))
  : {}

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: persistedState, // Load initial state from sessionStorage
})

// Subscribe to Redux store changes
store.subscribe(() => {
  sessionStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

export default store
