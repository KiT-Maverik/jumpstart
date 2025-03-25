import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

import { useSyncTokenWithServerMutation } from 'api/mutations'
import { AccessTokenPayload, authToken, refreshToken, RefreshTokenPayload, Tokens, User } from 'api/schemas'
import { localStorageKey, page } from 'configuration/constants'
import { useToast, useCurrentUser, useAppConfig } from 'configuration/store'
import { useLocationAccessAnalyser } from './useLocationAccessAnalyser'

import { useLogout } from './useLogout.hook'

export const useLogin = () => {
	const { logout } = useLogout()
	const router = useRouter()
	const { locationIsProtected } = useLocationAccessAnalyser()
	const { showToast } = useToast()
	const { setLoggedIn } = useAppConfig()
	const { setCurrentUser } = useCurrentUser()

	const { syncTokenWithServer } = useSyncTokenWithServerMutation()

	type LoginProps = {user : User } & Tokens

	/**
	 * Handles the login process by:
	 * - recovering access and refresh tokens from localStorage
	 * - validating both tokens payload
	 * - synchronizing tokens with the server to enable SSR
	 * - navigating the user to the dashboard page
	 * - informing user
	 * - automatically clearing auth data on error
	 */
	const login = useCallback(async ({ user, access, refresh }: LoginProps) => {

		const accessTokenPayload = jwtDecode<AccessTokenPayload>(access)
		const refreshTokenPayload = jwtDecode<RefreshTokenPayload>(refresh)

		const { success: accessTokenIsOk } = authToken.safeParse(accessTokenPayload)
		const { success: refreshTokenIsOk } = refreshToken.safeParse(refreshTokenPayload)

		// todo add proper messaging here?
		if (
			(accessTokenIsOk && refreshTokenIsOk ) &&
			(access && refresh)
		) {
			localStorage.setItem(localStorageKey.token.access, access)
			localStorage.setItem(localStorageKey.token.refresh, refresh)
			setCurrentUser(user)
			await syncTokenWithServer.mutateAsync({ token: access! })
			showToast({ message: `Welcome`, type: 'success' })
			setLoggedIn(true)
			if (!locationIsProtected) router.push(page.dashboard.href)
		} else logout()
	}, [syncTokenWithServer, locationIsProtected, showToast, router, logout])

	return {
		login,
	}
}
