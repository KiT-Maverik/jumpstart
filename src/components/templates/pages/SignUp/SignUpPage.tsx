'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, TextField, Fade, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { SignUp_Request, signUpContract } from 'api/contracts'
import { useSignUpMutation } from 'api/mutations'
import { SIGN_UP_METHOD, user } from 'api/schemas'
import { page } from 'configuration/constants'
import { LoadingButton, PasswordInput } from 'components/molecules'
import { AuthCard, PasswordValidator } from 'components/organisms'

import style from './SignUp.styles'

export const SignUpPage = () => {
	const [userCreated, setUserCreated] = useState(false)

	const { signUp } = useSignUpMutation({ onSuccess: () => setUserCreated(true) })
	const router = useRouter()

	type FormData = SignUp_Request['payload']

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm<FormData>({
		resolver: zodResolver(signUpContract.schema.request.payload),
		defaultValues: {
			method: SIGN_UP_METHOD.EMAIL
		}
	})

	const onSubmit: SubmitHandler<FormData> = (data) => {
		signUp.mutateAsync(data)
	}

	return (
		<AuthCard
			title="Join us today"
			content={
				<>
					<Fade in={userCreated}>
						<Box sx={style.stub}>
							<Typography variant='h5'>User Created</Typography>
							<Typography>Now check your email to activate it</Typography>
						</Box>
					</Fade>
					<TextField
						label="Email"
						variant="outlined"
						{...register('email')}
						error={!!errors.email}
						helperText={errors.email?.message}
						required={!user.shape.email.isOptional()}
					/>
					<TextField
						label="Username"
						variant="outlined"
						{...register('username')}
						error={!!errors.username}
						helperText={errors.username?.message}
						required={!user.shape.username.isOptional()}
					/>
					<PasswordInput
						{...register('password')}
						error={!!errors.password}
						helperText={errors.password?.message}
						required={!user.shape.password.isOptional()}
					/>
					<PasswordValidator value={watch('password', '')} title="Password requirements:" />
				</>
			}
			action={
				<LoadingButton
					type="submit"
					variant="contained"
					loading={signUp.isPending}
					onClick={handleSubmit(onSubmit)}
					disabled={
						signUp.isPending ||
						!watch('email') ||
						!watch('password')
					}
				>
					Create an account
				</LoadingButton>
			}
			navigation={
				<>
					<Button onClick={() => router.push(page.restorePassword.href)}>Forgot Password?</Button>,
					<Button onClick={() => router.push(page.signIn.href)}>Sign In</Button>
				</>
			}
		/>
	)
}
