import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { combineReducers } from 'redux'

import { appSlice } from './app/app.slice'
import { currentUserSlice } from './currentUser/currentUser.slice'
import { modalSlice } from './modal/modal.slice'
import { toastSlice } from './toast/toast.slice'

const reducer = combineReducers({
	app: appSlice.reducer,
	modal: modalSlice.reducer,
	toast: toastSlice.reducer,
	currentUser: currentUserSlice.reducer,
})

export const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false
		})
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
