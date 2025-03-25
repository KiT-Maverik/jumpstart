'use client'

import SunIcon from '@mui/icons-material/WbSunnyRounded'
import MoonIcon from '@mui/icons-material/DarkModeRounded'
import { Switch } from '@mui/material'

import { useThemeProvider } from 'configuration/Providers'

import style from './ThemeSwitch.styles'

export const ThemeSwitch = () => {
	const { themeMode, toggleThemeMode } = useThemeProvider()

	return (
		<Switch
			sx={style.container}
			onChange={toggleThemeMode}
			checked={themeMode === 'dark'}
			checkedIcon={<MoonIcon sx={style.icon.moon} />}
			icon={<SunIcon sx={style.icon.sun} />}
		/>
	)
}
