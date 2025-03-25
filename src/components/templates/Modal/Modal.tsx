'use client'

import {
	Modal as MUIModal,
	Stack,
	LinearProgress,
	Grow,
	Fade
} from '@mui/material'
import { useCallback, useEffect, useState } from 'react'

import { useModal } from 'configuration/store'

import { testId, modalWidthParams, modalAnimationDuration } from './Modal.constants'
import style from './Modal.styles'
import { NewModalProps } from './Modal.types'
import { Actions } from './Actions/Actions'
import { Content } from './Content/Content'
import { Header } from './Header/Header'

/**
 * A customizable modal component.
 */
export const Modal = ({
						  children,
						  layout = 'window',
						  onClose,
						  width = 'md',
						  showModal = true,
						  OverlayProps,
						  TransitionProps,
						  ContentProps,
						  ModalProps,
						  showLoader,
						  HeaderProps,
						  ActionsProps
					  }: NewModalProps) => {
	const [isOpen, setIsOpen] = useState(showModal)
	const { resetModalParams, modal: { isClosingNow } } = useModal()

	const hideModal = useCallback(() => setIsOpen(false), [])

	const handleModalClose = useCallback(() => {
		if (onClose) onClose()
		resetModalParams()
	}, [onClose])

	useEffect(() => setIsOpen(showModal), [showModal])

	useEffect(() => {
		if (isClosingNow) hideModal()
	}, [isClosingNow])

	return (
		<MUIModal
			open={isOpen}
			keepMounted={false}
			closeAfterTransition
			sx={style.overlay[layout]}
			onClose={hideModal}
			component="div"
			slotProps={{ backdrop: { TransitionComponent: Fade, timeout: modalAnimationDuration } }}
			{...OverlayProps}
		>
			<Grow in={isOpen} timeout={modalAnimationDuration} onExited={handleModalClose} {...TransitionProps}>
				<Stack
					maxWidth={modalWidthParams[width]}
					/// @ts-expect-error fix later
					sx={style.modal.layout[layout]}
					data-testid={testId.container}
					{...ModalProps}
				>
					{showLoader && <LinearProgress sx={style.modal.loader} />}
					<Header {...HeaderProps} onClose={hideModal} />
					<Content {...ContentProps}>
						{children}
					</Content>
					<Actions {...ActionsProps} onCancel={hideModal} />
				</Stack>
			</Grow>
		</MUIModal>
	)
}

// todo welcome modal on login appears too early
