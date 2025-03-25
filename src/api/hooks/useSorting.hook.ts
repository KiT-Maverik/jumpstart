import { useQueryParamsController } from './useCreateQueryParamsController.hook'

export const useSorting =
	<SortingParams extends readonly string[]>
	(
		params: SortingParams,
		queryParamsController: ReturnType<typeof useQueryParamsController>
	) => {

}
