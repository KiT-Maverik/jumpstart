'use client'

import { Box } from '@mui/material'

// import { selectAppState, useAppSelector } from 'configuration'

// import style from './Drawer.styles'
import { Navigation } from './items/Navigation'

export type DrawerSide = 'left' | 'right'
export type DrawerItemsSet = 'navigation' | 'none'

interface DrawerProps {
	side: DrawerSide
	itemsSet?: DrawerItemsSet
}

export const Drawer = ({ /*side,*/ itemsSet = 'none' }: DrawerProps) => {
	return <Box>{itemsSet === 'navigation' && <Navigation />}</Box>
}
