import { Box } from '@mui/material'

import { Drawer } from 'components/templates'
import { Navigation } from 'components/organisms'
import { globalStyles } from 'configuration/styles'

export default async function RootLayout({
											 children
										 }: Readonly<{
	children: React.ReactNode
}>) {

	return (
		<Box component="main" sx={globalStyles.main}>
			<Navigation />
			{/*<Drawer side="left" itemsSet="navigation" />*/}
			{children}
			<Drawer side="right" />
		</Box>
	)
}

/*

	const queryClient = new QueryClient()
	const { get } = await cookies();

	const token = get(cookieKey.synced_token)?.value ?? ''
	const { name, endpoint : {method, route} } = getCurrentUserContract

	await queryClient.prefetchQuery({
		queryKey: [name],
		queryFn: async () => {
			const {user_id} = jwtDecode<AccessTokenPayload>(get(cookieKey.synced_token)?.value ?? '')
			const requestUrl = route({ user_id: user_id });

			try {
				const response = await api[method]<GetCurrentUser_ResponsePayload>(
					requestUrl,
					{headers: {Authorization: `Bearer ${token}` }}
				);

				console.log(response.data, response.status)

				return response.data
			} catch (error) {
				console.log(error)
				throw error
			}
		},
	})

	console.log(queryClient.getQueriesData({ queryKey: [name] }))
*/
