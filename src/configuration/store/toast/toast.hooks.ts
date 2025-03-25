import { RootState, useAppDispatch, useAppSelector } from 'configuration/store'

import { hideToast, resetToastParams, showToast, OpenToastAction } from './toast.slice'

export const useToast = () => {
	const dispatch = useAppDispatch()

	return {
		hideToast: () => dispatch(hideToast()),
		resetToastParams: () => dispatch(resetToastParams()),
		showToast: (payload: OpenToastAction) => dispatch(showToast(payload)),
		toast: useAppSelector((state: RootState) => state.toast),
	}
}

// TODO: Toast dont hide automatically
