import { Tab } from 'components/atoms'
import { Box, BoxProps } from '@mui/material'
import { useState } from 'react'

interface NavbarProps extends BoxProps {
}

export const Navbar = ({...boxProps}: NavbarProps) => {
	const [tabIndex, setTabIndex] = useState(0)

	return (
			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} {...boxProps}>
				{
					['pistols', 'shotguns', 'pdw', 'Battle rifles', 'sniper rifles', 'machine guns', 'melee', 'equipment']
						.map((label, index) =>
							<Tab label={label} notification={true} isActive={index === tabIndex} key={label}
								 onClick={() => setTabIndex(index)} />
						)
				}
			</Box>
		)
}
