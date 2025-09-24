import type { IAuth } from '@/types/authTypes'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type AuthState = IAuth

const initialState: AuthState = {
  jwt: ''
}

export const counterSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
   
  },
})

// Action creators are generated for each case reducer function
export const { } = counterSlice.actions

export default counterSlice.reducer