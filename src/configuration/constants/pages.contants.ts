interface Page {
	href: string
	title: string
}

type PagesCatalog = { [key in string]: Page }

const rootPages = {
	home: { href: '/', title: 'Welcome!' },
	signIn: { href: '/sign-in', title: 'Welcome!' },
	signUp: { href: '/sign-up', title: 'Sign Up!' },
	restorePassword: { href: '/restore-password', title: 'Restore password' },
	activateAccount: { href: '/activate-account', title: 'Activate account' },
	dashboard: { href: '/dashboard', title: 'Dashboard' },
	profile: { href: 'profile', title: 'Profile' },
	groups: { href: 'groups', title: 'Groups' },
	stats: { href: 'stats', title: 'Stats' },
} satisfies PagesCatalog

export const page = {
	...rootPages,
} as const
