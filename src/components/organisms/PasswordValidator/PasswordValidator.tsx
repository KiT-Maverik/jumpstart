'use client'

import {Box, Stack, Typography} from '@mui/material'
import CheckmarkIcon from '@mui/icons-material/CheckRounded'
import CrossIcon from '@mui/icons-material/CloseRounded'

import {regex} from 'configuration/constants'

import style from './PasswordValidator.styles'

const validation = [
    {rule: regex.password.minLength, message: 'From 8 to 50 characters'},
    {rule: regex.password.lowercase, message: 'At least 1 lowercase character'},
    {rule: regex.password.uppercase, message: 'At least 1 uppercase character'},
    {rule: regex.password.digit, message: 'At least 1 number'},
    {rule: regex.password.specialSymbol, message: 'At least 1 special character'},
]

interface PasswordValidatorProps {
    value: string
    title?: string;
}

/**
 FYI:
 Wrap value in `watch` method from `useForm` to achieve consistent state change handling
 Example: <PasswordValidator value={watch('password', '')}>
 */
export const PasswordValidator = ({value, title}: PasswordValidatorProps) => {
    return (
        <Stack gap={1}>
            {title && <Typography textAlign='center'>{title}</Typography>}
            <Stack gap={1}>
                {validation.map(({rule, message}) => (
                    <Box key={message} sx={style.rule}>
                        {rule.test(value) ? (
                            <CheckmarkIcon fontSize="small" color="success"/>
                        ) : (
                            <CrossIcon fontSize="small" color="disabled"/>
                        )}
                        <Typography color={rule.test(value) ? 'success' : 'initial'}>{message}</Typography>
                    </Box>
                ))}
            </Stack>
        </Stack>
    )
}
