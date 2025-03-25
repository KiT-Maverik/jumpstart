/* eslint-disable @typescript-eslint/no-unused-vars */
import { ThemeShape } from 'styles/theme/shape'
import { alertModes, iconButtonVariants } from './theme'

declare module '@mui/material/styles' {
	export interface Theme {
		shape: ThemeShape
	}

	export interface ThemeOptions {
		shape?: ThemeShape
	}

	interface Mixins {
		contentSpacingX: {
			lg: number
			sm: number
		}
		drawer: {
			left: {
				width: string
			}
		}
		card: {
			content: {
				spacing: number,
			}
		}
	}

	interface TypeBackground {
		surface: string
	}

	interface BreakpointOverrides {
		xs: false // removes the `xs` breakpoint
		sm: false
		md: false
		lg: false
		xl: false
		mobile: true // adds the `mobile` breakpoint
		tablet: true
		laptop: true
		desktop: true
		fullWidth: true
	}
}

export type AlertMode = 'alert' | 'banner'

declare module '@mui/material/Alert' {
	interface AlertProps {
		mode?: AlertMode
	}
}

export type IconButtonVariant = 'icon' | 'outlined' | 'contained'

declare module '@mui/material/IconButton' {
	interface IconButtonOwnProps {
		variant?: IconButtonVariant
	}
}
