'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

import {
	RestorePassword_RequestPayload,
	restorePasswordContract
} from 'api/contracts'
import { useRestorePasswordMutation } from 'api/mutations'
import { user } from 'api/schemas'
import { LoadingButton } from 'components/molecules'
import { AuthCard } from 'components/organisms'
import { page } from 'configuration/constants'

export const RestorePasswordPage = () => {
	const router = useRouter()
	const { restorePassword } = useRestorePasswordMutation()

	type FormData = RestorePassword_RequestPayload

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm<FormData>({ resolver: zodResolver(restorePasswordContract.schema.request.payload) })


	const onSubmit: SubmitHandler<FormData> = (data) => {
		restorePassword.mutateAsync(data)
	}

	return (
		<AuthCard
			title="Restore password"
			content={
				<>
					<Typography textAlign="justify">
						Enter the email address associated with your account and we’ll send you an instructions on how
						to
						reset your password.
					</Typography>
					<TextField
						label="Email"
						variant="outlined"
						placeholder="Enter your email address"
						{...register('email')}
						error={!!errors.email}
						helperText={errors.email?.message}
						required={!user.shape.email.isOptional()}
					/>
				</>
			}
			action={
				<LoadingButton
					variant="contained"
					disabled={!watch('email')}
					loading={restorePassword.isPending}
					onClick={handleSubmit(onSubmit)}
				>
					Send recovery email
				</LoadingButton>
			}
			navigation={
				<>
					<Button onClick={() => router.push(page.signUp.href)}>Sign Up</Button>
					<Button onClick={() => router.push(page.signIn.href)}>Sign In</Button>
				</>
			}
		/>
	)
}
