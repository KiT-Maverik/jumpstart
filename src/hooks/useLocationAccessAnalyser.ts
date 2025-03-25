import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import { page } from 'configuration/constants'

export const useLocationAccessAnalyser = () => {
	const pathname = usePathname()

	const defineIfLocationIsProtected = useCallback((path: string) => ![
		page.signIn.href,
		page.signUp.href,
		page.restorePassword.href
	].includes(path), [])

	const [locationIsProtected, setLocationIsProtected] = useState(() => defineIfLocationIsProtected(pathname))

	useEffect(() => setLocationIsProtected(defineIfLocationIsProtected(pathname)), [pathname])

	return { locationIsProtected }
}
