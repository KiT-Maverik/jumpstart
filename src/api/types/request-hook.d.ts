import { ApiError_Payload } from 'api/schemas'
import { AxiosResponse, AxiosError } from 'axios'
import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'

export interface RequestExtender<
	SuccessData = unknown
> {
	onSuccess?: (response?: AxiosResponse<SuccessData>) => void;
	onError?: (error?: { response?: AxiosError<ApiError_Payload> } | unknown) => void;
	onFinish?: () => void;
}

export type TanstackMutation_CustomOptions<ResponsePayload, Variables> =
	UseMutationOptions<
		AxiosResponse<ResponsePayload>,
		AxiosResponse<ApiError_Payload>,
		Variables
	>


export type TanstackQuery_CustomOptions<ResponsePayload> =
	Partial<
		Omit<
			UseQueryOptions<
				AxiosResponse<ResponsePayload>,
				AxiosResponse<ApiError_Payload>
			>,
			'queryFn' | 'queryKey'
		> & { additionalQueryKey?: string }
	>
