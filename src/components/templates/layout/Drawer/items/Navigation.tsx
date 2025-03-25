'use client'

import HomeIcon from '@mui/icons-material/HomeRounded'
import StatsIcon from '@mui/icons-material/QueryStatsRounded';
import GroupsIcon from '@mui/icons-material/FolderCopyRounded';
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useRouter } from 'next/navigation'
import { page } from 'configuration/constants'

export const Navigation = () => {
	const router = useRouter()

	return (
		<List>
			<ListItem disablePadding onClick={() => router.push(page.dashboard.href)}>
				<ListItemButton>
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary={page.dashboard.title} />
				</ListItemButton>
			</ListItem>
			<Divider />
			<ListItem disablePadding onClick={() => router.push(page.stats.href)}>
				<ListItemButton>
					<ListItemIcon>
						<StatsIcon />
					</ListItemIcon>
					<ListItemText primary={page.stats.title} />
				</ListItemButton>
			</ListItem>
			<ListItem disablePadding onClick={() => router.push(page.groups.href)}>
				<ListItemButton>
					<ListItemIcon>
						<GroupsIcon />
					</ListItemIcon>
					<ListItemText primary={page.groups.title} />
				</ListItemButton>
			</ListItem>
		</List>
	)
}
