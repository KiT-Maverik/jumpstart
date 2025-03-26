'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, TextField } from '@mui/material'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

import { createTokenContract, CreateToken_RequestPayload } from 'api/contracts'
import { useCreateTokenMutation } from 'api/mutations'
import { user } from 'api/schemas'
import { LoadingButton, PasswordInput } from 'components/molecules'
import { AuthCard } from 'components/organisms'
import { page } from 'configuration/constants'

export const SignInPage = () => {
	const { createToken } = useCreateTokenMutation()
	const router = useRouter()

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm<CreateToken_RequestPayload>({ resolver: zodResolver(createTokenContract.schema.request.payload) })

	const onSubmit: SubmitHandler<CreateToken_RequestPayload> = (data) => {
		createToken.mutateAsync(data)
	}

	return (
		<AuthCard
			title="Welcome"
			content={
				<>
					<TextField
						label="Email"
						variant="outlined"
						{...register('email')}
						error={!!errors}
						helperText={errors.email?.message}
						required={!user.shape.email.isOptional()}
					/>
					<PasswordInput
						{...register('password')}
						error={!!errors.password}
						helperText={errors.password?.message}
						required={!user.shape.password.isOptional()}
					/>
				</>
			}
			action={
				<LoadingButton
					type="submit"
					variant="contained"
					loading={createToken.isPending}
					disabled={createToken.isPending || !watch('email') || !watch('password')}
					onClick={handleSubmit(onSubmit)}
				>
					Sign In
				</LoadingButton>
			}
			navigation={
				<>
					<Button onClick={() => router.push(page.restorePassword.href)}>Forgot Password?</Button>
					<Button onClick={() => router.push(page.signUp.href)}>Sign Up</Button>
				</>
			}
		/>
	)
}
