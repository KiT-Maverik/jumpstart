'use client'

import style from './DecorDrawer.styles'
import { Box } from '@mui/material'

interface StartProps {
}

export const DecorDrawer = ({}: StartProps) => {

	return (
		<Box>
			<Box sx={style.container}>
				<Box sx={style.paint.container}>
					<Box component="img" src="/multicam-camo.png" alt="multicam" sx={style.paint.item} />
					<Box component="img" src="/urban-camo.png" alt="multicam" sx={style.paint.item} />
					<Box component="img" src="/ua-camo.png" alt="multicam" sx={style.paint.item} />
					<Box component="img" src="/multicam-camo.png" alt="multicam" sx={style.paint.item} />
					<Box component="img" src="/urban-camo.png" alt="multicam" sx={style.paint.item} />
					<Box component="img" src="/ua-camo.png" alt="multicam" sx={style.paint.item} />
					<Box component="img" src="/multicam-camo.png" alt="multicam" sx={style.paint.item} />
					<Box component="img" src="/urban-camo.png" alt="multicam" sx={style.paint.item} />
					<Box component="img" src="/ua-camo.png" alt="multicam" sx={style.paint.item} />
					<Box component="img" src="/urban-camo.png" alt="multicam" sx={style.paint.item} />
					<Box component="img" src="/ua-camo.png" alt="multicam" sx={style.paint.item} />
					<Box component="img" src="/multicam-camo.png" alt="multicam" sx={style.paint.item} />
					<Box component="img" src="/urban-camo.png" alt="multicam" sx={style.paint.item} />
					<Box component="img" src="/ua-camo.png" alt="multicam" sx={style.paint.item} />
				</Box>
				<Box sx={{ border: '1px solid black' }}>
					<Box sx={style.decal.container}>
						<Box component="img" src="/decal-dragon.png" alt="multicam" />
						<Box component="img" src="/decal-skull.png" alt="multicam" />
						<Box component="img" src="/decal-tiger.png" alt="multicam" />
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
