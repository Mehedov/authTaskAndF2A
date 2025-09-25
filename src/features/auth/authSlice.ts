import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

interface AuthState {
	token: string | null
	isAuth: boolean
}

const initialState: AuthState = {
	token: Cookies.get('token') || null,
	isAuth: false,
}

export const counterSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setToken: (state, action) => {
			state.token = action.payload
			state.isAuth = !!action.payload
			Cookies.set('token', action.payload)
		},
		clearToken: state => {
			state.token = null
			state.isAuth = false
			Cookies.remove('token')
		},
	},
})

// Action creators are generated for each case reducer function
export const { setToken, clearToken } = counterSlice.actions

export default counterSlice.reducer
