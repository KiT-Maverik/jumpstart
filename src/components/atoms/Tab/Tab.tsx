import { Box, BoxProps, Typography } from '@mui/material'

import style from './Tab.styles'
import {NotificationBadge} from "../NotificationBadge/NotificationBadge";

interface TabProps extends BoxProps{
    label: string;
    notification: boolean;
    isActive: boolean;
}

export const Tab = ({label, notification, isActive, ...boxProps}: TabProps) => {
    return (
        <Box sx={[style.container, isActive && style.active]} {...boxProps}>
            <NotificationBadge show={notification}/>
            <Typography>{label}</Typography>
        </Box>
    )
}
