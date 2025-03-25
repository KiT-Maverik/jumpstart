import { createSlice } from '@reduxjs/toolkit'

export enum MODAL_TYPE {
	SIMPLE = 'Simple modal',
	ADD_API_KEY = 'Add API key modal',
	CREATE_GROUP = 'Create Group modal',
	FULLSCREEN = 'Fullscreen modal',
	CREATE_CATEGORY = 'Create Category modal',
	CLOSED = 'Closed',
}

export interface ModalState {
	isClosingNow: boolean
	type: MODAL_TYPE
	props?: undefined
}

const initialState: ModalState = {
	isClosingNow: false,
	type: MODAL_TYPE.CLOSED,
	props: undefined,
}

export const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		/** Initiates modal closing procedure. Required to give animation time to finish.*/
		closeModal: (state): ModalState => ({
			...state,
			isClosingNow: true,
		}),
		openCreateGroupModal: (state): ModalState => ({
			...state,
			type: MODAL_TYPE.CREATE_GROUP,
		}),
		openAddApiKeyModal: (state): ModalState => ({
			...state,
			type: MODAL_TYPE.ADD_API_KEY,
		}),
		/** Finalizes modal closing procedure. Required to ensure, no props persist between modals.*/
		resetModalParams: (): ModalState => initialState,
	},
})

export const { closeModal, resetModalParams, openCreateGroupModal, openAddApiKeyModal } =
	modalSlice.actions

/*
Calling modal with props action example

openAuthModal: (state, action: PayloadAction<AuthModalProps>): ModalState => ({
			...state,
			type: MODAL_TYPE.AUTH,
			props: action.payload,
		}),
*/
