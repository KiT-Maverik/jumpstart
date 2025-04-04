'use client'

import { jwtDecode } from 'jwt-decode'
import { usePathname, useRouter } from 'next/navigation'
import { localStorageKey, page } from 'configuration/constants'
import { useCallback, useEffect } from 'react'

import { useVerifyTokenMutation } from 'api/mutations'
import { AccessTokenPayload, authToken } from 'api/schemas'
import { LoadingScreen } from 'components/atoms'
import { useLogin, useLogout, useLocationAccessAnalyser } from 'hooks'
import { useAppConfig } from 'configuration/store'

export const SessionController = () => {
	const { login } = useLogin()
	const { logout } = useLogout()
	const { selectAppState } = useAppConfig()
	const router = useRouter()
	const pathname = usePathname()
	const { locationIsProtected } = useLocationAccessAnalyser()

	const handleInvalidSession = useCallback(() => {
		logout()
	}, [])

	const { verifyToken } = useVerifyTokenMutation({
		onSuccess: (data) => {
			const user = data?.data.user

			if (!user) return

			login({
				user,
				access: localStorage.getItem(localStorageKey.token.access) as string,
				refresh: localStorage.getItem(localStorageKey.token.refresh) as string
			})

			if ([page.signIn.href, page.home.href].includes(pathname)) router.push(page.dashboard.href)
		},
		onError: handleInvalidSession
	})

	useEffect(() => {
		const token = localStorage.getItem(localStorageKey.token.access)

		if (!token) handleInvalidSession()
		else {
			let accessTokenPayload: AccessTokenPayload | undefined

			try {
				accessTokenPayload = jwtDecode<AccessTokenPayload>(token)
			} catch {
				handleInvalidSession()
			}

			const { success: accessTokenIsOk } = authToken.safeParse(accessTokenPayload)

			if (accessTokenIsOk) {
				verifyToken.mutateAsync({ token })
			} else handleInvalidSession()
		}
	}, [])

	return <LoadingScreen show={!selectAppState.loggedIn && locationIsProtected} />
}
