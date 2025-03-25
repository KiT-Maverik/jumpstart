import { RootState, useAppDispatch, useAppSelector } from 'configuration/store'

import { User } from 'api/schemas'

import { clearCurrentUser, setCurrentUser } from './currentUser.slice'

export const useCurrentUser = () => {
	const dispatch = useAppDispatch()

	return {
		clearCurrentUser: () => dispatch(clearCurrentUser()),
		setCurrentUser: (user: User) => dispatch(setCurrentUser(user)),
		currentUser: useAppSelector((state: RootState) => state.currentUser),
	}
}
