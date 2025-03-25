import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AppState {
	loggedIn: boolean
	showLeftDrawer: boolean
	showRightDrawer: boolean
	showLoader: boolean
}

const initialState: AppState = {
	loggedIn: false,
	showLeftDrawer: false,
	showRightDrawer: false,
	showLoader: false
}

export const appSlice = createSlice({
	name: 'App',
	initialState,
	reducers: {
		openLeftDrawer: (state): AppState => ({
			...state,
			showLeftDrawer: true
		}),
		closeLeftDrawer: (state): AppState => ({
			...state,
			showLeftDrawer: false
		}),
		setLoggedIn: (state, action: PayloadAction<boolean>): AppState => ({
			...state,
			loggedIn: action.payload
		}),
		openRightDrawer: (state): AppState => ({
			...state,
			showRightDrawer: true
		}),
		closeRightDrawer: (state): AppState => ({
			...state,
			showRightDrawer: false
		}),
		showLoader: (state): AppState => ({
			...state,
			showLoader: true
		}),
		hideLoader: (state): AppState => ({
			...state,
			showLoader: false
		})
	}
})

export const {
	openLeftDrawer,
	closeLeftDrawer,
	openRightDrawer,
	closeRightDrawer,
	showLoader,
	hideLoader,
	setLoggedIn
} =
	appSlice.actions
