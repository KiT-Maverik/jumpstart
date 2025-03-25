import { zodResolver } from '@hookform/resolvers/zod'
import { Autocomplete, Box, TextField, CircularProgress } from '@mui/material'
import { useForm } from 'react-hook-form'

import {
	CreateGroup_RequestPayload,
	createGroupContract,
} from 'api/contracts'
import { useGetAddonsListQuery, useGetChallengeTypesListQuery, useGetCompaniesListQuery } from 'api/queries'
import { Addon, ChallengeType, Company } from 'api/schemas'

// todo render ssr queries
// todo implement error messages in client?
export const CreateGroupForm = () => {
	const { getAddonsListQuery, addonsList } = useGetAddonsListQuery()
	const { getChallengeTypesListQuery, challengeTypesList } = useGetChallengeTypesListQuery()
	const { getCompaniesListQuery, companiesList } = useGetCompaniesListQuery()

	const dataSchema = createGroupContract.schema.request.payload

	const {
		register,
		formState: { errors }
	} = useForm<CreateGroup_RequestPayload>({
		resolver: zodResolver(dataSchema)
	})

	return (
		<Box
			component="form"
			sx={{ display: 'flex', flexDirection: 'column', gap: 3}}
			onSubmit={(data) => {
				console.log(data)
				// createGroup.mutateAsync(data)
			}}
		>
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
					{...register('balance')}
					error={!!errors.balance}
					helperText={errors.balance?.message}
					required={!dataSchema.shape.balance.isOptional()}
				/>
			</Box>
			<Autocomplete<Company, true>
				multiple
				options={companiesList}
				getOptionLabel={(option) => option.name}
				// defaultValue={[top100Films[13]]}
				filterSelectedOptions
				renderInput={(params) => (
					<TextField
						{...params}
						placeholder="Add company"
						slotProps={{
							input: {
								...params.InputProps,
								endAdornment: getCompaniesListQuery.isLoading ? <CircularProgress color="inherit" size={20} /> : null							},
						}}
					/>
				)}
			/>
			<Autocomplete<ChallengeType, true>
				multiple
				options={challengeTypesList}
				getOptionLabel={(option) => option.name}
				// defaultValue={[top100Films[13]]}
				filterSelectedOptions
				renderInput={(params) => (
					<TextField
						{...params}
						placeholder="Add challenge type"
						slotProps={{
							input: {
								...params.InputProps,
								endAdornment: getChallengeTypesListQuery.isLoading ? <CircularProgress color="inherit" size={20} /> : null							},
						}}
					/>
				)}
			/>
			<Autocomplete<Addon, true>
				multiple
				options={addonsList}
				getOptionLabel={(option) => option.name}
				// defaultValue={[top100Films[13]]}
				filterSelectedOptions
				disabled={addonsList.length === 0}
				renderInput={(params) => (
					<TextField
						{...params}
						placeholder="Add addon"
						slotProps={{
							input: {
								...params.InputProps,
								endAdornment: getAddonsListQuery.isLoading ? <CircularProgress color="inherit" size={20} /> : null							},
						}}
					/>
				)}
			/>
		</Box>
	)
}
