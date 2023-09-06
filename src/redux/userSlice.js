import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: { isAuthenticated: false },
  },
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload
    },
    clearUserData: (state) => {
      state.user = { isAuthenticated: false }
    },
  },
})

export const { setUserData, clearUserData } = userSlice.actions
export const selectUser = (state) => state.user.user
export default userSlice.reducer
