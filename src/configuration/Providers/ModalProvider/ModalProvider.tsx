'use client'

import { CreateGroupModal, AddApiKeyModal } from 'components/organisms'
import { MODAL_TYPE, useModal } from 'configuration/store'

/**
 * This component render modals, globally available in application
 * FYI: conditional rendering is needed to prevent extra components render, and their logic execution
 */
export const ModalProvider = () => {
	const { modal: { type } } = useModal()

	return (
		<>
			{type === MODAL_TYPE.CREATE_GROUP && <CreateGroupModal />}
			{type === MODAL_TYPE.ADD_API_KEY && <AddApiKeyModal />}
		</>
	)
}
