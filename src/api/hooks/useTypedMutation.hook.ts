import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { ApiError_Payload } from 'api/schemas'
import type { QueryClient } from '@tanstack/query-core'

export const useTypedMutation =
		<ResponsePayload, Variables>
		(
			options: UseMutationOptions<AxiosResponse<ResponsePayload>, AxiosResponse<ApiError_Payload>, Variables>,
			queryClient ?: QueryClient
		) =>
			useMutation < AxiosResponse<ResponsePayload>, AxiosResponse<ApiError_Payload>, Variables> (options, queryClient)
