'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, MenuItem, TextField } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

import { CreateGroup_RequestPayload, createGroupContract } from 'api/contracts'
import { useCreateGroupMutation } from 'api/mutations'
import {
	useGetAddonsListQuery,
	useGetChallengeTypesListQuery,
	useGetCompaniesListQuery
} from 'api/queries'
import { LoadingButton } from 'components/molecules'
import { Modal } from 'components/templates'
import { useCurrentUser, useModal } from 'configuration/store'

export const CreateGroupModal = () => {
	const { closeModal } = useModal()

	const { addonsList } = useGetAddonsListQuery()
	const { challengeTypesList } = useGetChallengeTypesListQuery()
	const { companiesList } = useGetCompaniesListQuery()
	const { createGroup } = useCreateGroupMutation({ onSuccess: closeModal })
	const { currentUser } = useCurrentUser()

	const dataSchema = createGroupContract.schema.request.payload

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<CreateGroup_RequestPayload>({
		resolver: zodResolver(dataSchema),
		defaultValues: {
			addons: [],
			company: '',
			challenge_type: '',
			user: currentUser?.id
		}
	})

	const onSubmit: SubmitHandler<CreateGroup_RequestPayload> = (data) => createGroup.mutateAsync(data)

	return (
		<Modal
			showLoader={createGroup.isPending}
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			HeaderProps={{ title: 'Create group' }}
			ActionsProps={{
				children:
					<LoadingButton
						loading={createGroup.isPending}
						variant="contained"
						onClick={handleSubmit(onSubmit)}
					>
						Create
					</LoadingButton>
			}}
		>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
				<Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
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
						label="Balance"
						variant="outlined"
						type="number"
						fullWidth
						{...register('balance', { valueAsNumber: true })}
						error={!!errors.balance}
						helperText={errors.balance?.message}
						required={!dataSchema.shape.balance.isOptional()}
					/>
				</Box>
				<TextField
					select
					label="Company"
					{...register('company')}
					error={!!errors.company}
					required={!dataSchema.shape.company.isOptional()}
				>
					{companiesList.map((option) => (
						<MenuItem key={option.id} value={option.id}>
							{option.name}
						</MenuItem>
					))}
				</TextField>
				<TextField
					select
					label="Challenge type"
					{...register('challenge_type')}
					error={!!errors.challenge_type}
					required={!dataSchema.shape.challenge_type.isOptional()}
				>
					{challengeTypesList.map(({ id, name }) => (
						<MenuItem key={id} value={id}>{name}</MenuItem>
					))}
				</TextField>
				<TextField
					select
					label="Addons"
					defaultValue={[]}
					slotProps={{
						select: {
							multiple: true
						}
					}}
					{...register('addons')}
					error={!!errors.addons}
					required={!dataSchema.shape.addons.isOptional()}
				>
					{addonsList.map(({ id, name }) => (
						<MenuItem key={id} value={id}>
							{name}
						</MenuItem>
					))}
				</TextField>
			</Box>
		</Modal>
	)
}

// todo render ssr queries
// todo implement error messages in client?
