import style from './NotificationBadge.styles'
import { Box, BoxProps } from '@mui/material'

interface NotificationBadgeProps extends BoxProps {
    show: boolean
}

export const NotificationBadge = ({show = false, ...boxProps}: NotificationBadgeProps) => {
    if (!show) return null

    return <Box sx={[style.container]}/>
}
