'use client'

import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode } from 'react'
import { Provider as StoreProvider } from 'react-redux'

import { store } from 'configuration/store'

import { BannerProvider } from './BannerProvider/BannerProvider'
import { ModalProvider } from './ModalProvider/ModalProvider'
import { TanstackProvider } from './TanstackProvider/TanstackProvider'
import { ThemeProvider } from './ThemeProvider/ThemeProvider'
import { ToastProvider } from './ToastProvider/ToastProvider'
import { CssBaseline } from '@mui/material'

const clientSideEmotionCache = createCache({ key: 'css', prepend: true })

export const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<AppRouterCacheProvider options={{ enableCssLayer: true }}>
			<StoreProvider store={store}>
				<TanstackProvider>
					<CacheProvider value={clientSideEmotionCache}>
						<ReactQueryDevtools initialIsOpen={false} />
						<CssBaseline/>
						<ThemeProvider>
							<BannerProvider />
							<ToastProvider />
							<ModalProvider />
							{children}
						</ThemeProvider>
					</CacheProvider>
				</TanstackProvider>
			</StoreProvider>
		</AppRouterCacheProvider>
	)
}
