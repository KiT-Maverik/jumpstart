import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'
import { ReactNode, useMemo, useState } from 'react'

export type PasswordInputType = 'password' | 'text'

type PasswordInputProps = TextFieldProps & {
	forcedState?: PasswordInputType
	IconButtonProps?: {
		onMouseDown?: () => void
		onMouseUp?: () => void
		onMouseLeave?: () => void
	}
}

export const PasswordInput = ({ forcedState, IconButtonProps, label, ...textFieldProps }: PasswordInputProps) => {
	const [inputType, setInputType] = useState<PasswordInputType>('password')

	const icon = useMemo<{ [key in PasswordInputType]: ReactNode }>(
		() => ({
			text: <Visibility />,
			password: <VisibilityOff />,
		}),
		[],
	)

	return (
		<TextField
			{...textFieldProps}
			label={label ?? 'Password'}
			variant="outlined"
			type={forcedState ? forcedState : inputType}
			slotProps={{
				input: {
					endAdornment: (
						<InputAdornment position="end">
							<IconButton
								edge="end"
								onMouseDown={() =>
									IconButtonProps ? IconButtonProps?.onMouseDown?.() : setInputType('text')
								}
								onMouseUp={() =>
									IconButtonProps ? IconButtonProps?.onMouseUp?.() : setInputType('password')
								}
								onMouseLeave={() =>
									IconButtonProps ? IconButtonProps?.onMouseLeave?.() : setInputType('password')
								}
							>
								{forcedState ? icon[forcedState] : icon[inputType]}
							</IconButton>
						</InputAdornment>
					),
				},
			}}
		/>
	)
}
