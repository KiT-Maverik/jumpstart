'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import PlusIcon from '@mui/icons-material/AddRounded'
import { Box, Checkbox, FormControlLabel, TextField } from '@mui/material'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { CreateApiKey_RequestPayload, createApiKeyContract } from 'api/contracts'
import { useCreateApiKeyMutation } from 'api/mutations'
import { LoadingButton, PasswordInput } from 'components/molecules'
import { useModal } from 'configuration/store'
import { Modal } from 'components/templates'

export const AddApiKeyModal = () => {
	const [keyEnabled, setKeyEnabled] = useState(true)

	const { closeModal } = useModal()
	const { createApiKey } = useCreateApiKeyMutation({ onSuccess: closeModal })

	const dataSchema = createApiKeyContract.schema.request.payload

	type FormData = CreateApiKey_RequestPayload

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormData>({
		resolver: zodResolver(dataSchema),
	})

	const onSubmit: SubmitHandler<FormData> = (data, event) => {
		event?.preventDefault()
		createApiKey.mutateAsync(data)
	}

	return (
		<Modal
			showLoader={createApiKey.isPending}
			HeaderProps={{ title: 'Add API Key' }}
			ActionsProps={{
				children: <LoadingButton
					loading={createApiKey.isPending}
					startIcon={<PlusIcon />}
					disabled={false}
					onClick={handleSubmit(onSubmit)}
				>
					Add
				</LoadingButton>
			}}
		>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
				<TextField
					label="Name"
					variant="outlined"
					fullWidth
					{...register('name')}
					error={!!errors.name}
					helperText={errors.name?.message}
					required={!dataSchema.shape.name.isOptional()}
				/>
				<TextField
					label="Client ID"
					variant="outlined"
					fullWidth
					{...register('client_id')}
					error={!!errors.client_id}
					helperText={errors.client_id?.message}
					required={!dataSchema.shape.client_id.isOptional()}
				/>
				<PasswordInput
					label="API secret"
					variant="outlined"
					fullWidth
					{...register('api_secret')}
					error={!!errors.api_secret}
					helperText={errors.api_secret?.message}
					required={!dataSchema.shape.api_secret.isOptional()}
				/>
				<FormControlLabel
					label="Enable API key"
					control={
						<Checkbox
							checked={keyEnabled}
							{...register('is_active')}
							onChange={() => setKeyEnabled(!keyEnabled)}
						/>
					}
				/>
			</Box>
		</Modal>
	)
}

// todo render ssr queries
// todo implement error messages in client?
// todo remove close modal action.
