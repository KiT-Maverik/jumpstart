import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { User } from 'api/schemas'

type CurrentUserState = Partial<User>

const initialState: CurrentUserState = {}

export const currentUserSlice = createSlice({
	name: 'currentUser',
	initialState,
	reducers: {
		setCurrentUser: (_, action: PayloadAction<User>): User => ({
			...action.payload,
		}),
		clearCurrentUser: (): CurrentUserState => initialState,
	},
})

export const { setCurrentUser, clearCurrentUser } =
	currentUserSlice.actions
