import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

import { removeTokenFromServerContract } from 'api/contracts'
import { localStorageKey, page } from 'configuration/constants'
import { useToast, useCurrentUser, useAppConfig } from 'configuration/store'

import { useLocationAccessAnalyser } from './useLocationAccessAnalyser'

export const useLogout = () => {
	const { setLoggedIn } = useAppConfig()
	const tanstack = useQueryClient()
	const router = useRouter()
	const { locationIsProtected } = useLocationAccessAnalyser()
	const { showToast } = useToast()
	const { clearCurrentUser } = useCurrentUser()

	/**
	 * Handles the logout process by:
	 * - removing tokens from localStorage
	 * - removing tokens from server
	 * - navigating the user to the auth page
	 * - informing user
	 *
	 * FYI:
	 * Logout may be called on before Tanstack client is initialized.
	 * Example: defining T on 401 error behavior.
	 * Therefore, this hook is intentionally optimised to work without Tanstack Client
	 */
	const logout = useCallback(() => {
		localStorage.removeItem(localStorageKey.token.access)
		localStorage.removeItem(localStorageKey.token.refresh)
		tanstack.clear()
		clearCurrentUser()
		setLoggedIn(false)
		removeTokenFromServerContract.execute()
		showToast({ message: 'Logged out', type: 'info' })
		if (locationIsProtected) router.push(page.signIn.href)
	}, [showToast, router])

	return {
		logout
	}
}
