import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
	UpdateGroupById_RequestPayload,
	updateGroupByIdContract
} from 'api/contracts'
import { TextField } from '@mui/material'

export const EditGroupForm = () => {
	const dataSchema = updateGroupByIdContract.schema.request.payload

	const {
		register,
		formState: { errors }
	} = useForm<UpdateGroupById_RequestPayload>({
		resolver: zodResolver(dataSchema)
	})

	return (
		<>
			<TextField
				label="Email"
				variant="outlined"
				{...register('name')}
				error={!!errors.name}
				helperText={errors.name?.message}
				required={!dataSchema.shape.name.isOptional()}
			/>
			<TextField
				label="Email"
				variant="outlined"
				{...register('balance')}
				error={!!errors.balance}
				helperText={errors.balance?.message}
				required={!dataSchema.shape.balance.isOptional()}
			/>
		</>
	)
}
