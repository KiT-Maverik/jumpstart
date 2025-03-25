import { useMutation } from '@tanstack/react-query'

import {
	confirmUsersEmailContract,
} from 'api/contracts'
import { api } from 'configuration'

export const useConfirmUserEmail = () => {
	const {name, endpoint: {method, route}} = confirmUsersEmailContract

	const confirmUserEmail = useMutation({
			mutationKey: [name],
			mutationFn: async () =>
				await api[method](route),
		})

	return { confirmUserEmail }
}
