import { ModalProps as MuiModalProps } from '@mui/material/Modal/Modal'
import { StackProps, ModalProps } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { ReactNode } from 'react'

import { ModalWidth } from './Modal.constants'
import { ModalActionsProps } from './Actions/Actions'
import { ModalHeaderProps } from './Header/Header'
import { ModalContentProps } from './Content/Content'

export type ModalLayout = 'window' | 'fullscreen'

/** Props for the modals component. */
export interface NewModalProps extends Omit<MuiModalProps, 'children' | 'width' | 'open'> {
	/** The content to be rendered inside the modal. */
	children: ReactNode

	/** Whether to show modal full width */
	layout?: ModalLayout

	/** Callback fired when the component requests to be closed. */
	onClose?: () => void

	showLoader?: boolean

	/** Enable external modal display control. */
	showModal?: boolean

	width?: ModalWidth

	ContentProps?: ModalContentProps
	HeaderProps: Omit<ModalHeaderProps, 'onClose'>
	ActionsProps?: Omit<ModalActionsProps, 'onCancel'>
	ModalProps?: Omit<StackProps, 'children' | 'maxWidth'>
	OverlayProps?: ModalProps
	TransitionProps?: TransitionProps
}
