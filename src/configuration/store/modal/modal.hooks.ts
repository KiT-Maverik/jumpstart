import { openCreateGroupModal, RootState, useAppDispatch, useAppSelector } from 'configuration/store'

import { closeModal, resetModalParams, openAddApiKeyModal } from './modal.slice'

export const useModal = () => {
	const dispatch = useAppDispatch()

	return {
		closeModal: () => dispatch(closeModal()),
		openCreateGroupModal: () => dispatch(openCreateGroupModal()),
		openAddApiKeyModal: () => dispatch(openAddApiKeyModal()),
		resetModalParams: () => dispatch(resetModalParams()),
		modal: useAppSelector((state: RootState) => state.modal),
	}
}
