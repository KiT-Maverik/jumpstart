import {
	openLeftDrawer,
	closeLeftDrawer,
	closeRightDrawer,
	openRightDrawer,
	hideLoader,
	showLoader,
	setLoggedIn,
} from './app.slice'
import { RootState, useAppDispatch, useAppSelector } from '../App.store'

export const useAppConfig = () => {
	const dispatch = useAppDispatch()

	return {
		openLeftDrawer: () => dispatch(openLeftDrawer()),
		closeLeftDrawer: () => dispatch(closeLeftDrawer()),
		closeRightDrawer: () => dispatch(closeRightDrawer()),
		openRightDrawer: () => dispatch(openRightDrawer()),
		hideLoader: () => dispatch(hideLoader()),
		setLoggedIn: (isLoggedIn: boolean) => dispatch(setLoggedIn(isLoggedIn)),
		showLoader: () => dispatch(showLoader()),
		selectAppState: useAppSelector((state: RootState) => state.app)
	}
}
