import { UndefinedInitialDataOptions, useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { ApiError_Payload } from 'api/schemas'
import type { QueryClient } from '@tanstack/query-core'

export const useTypedQuery =
	<ResponsePayload>
	(
		options: UndefinedInitialDataOptions<AxiosResponse<ResponsePayload>, AxiosResponse<ApiError_Payload>>,
		queryClient?: QueryClient
	) =>
		useQuery<AxiosResponse<ResponsePayload>, AxiosResponse<ApiError_Payload>>(options, queryClient)
