import { TRANSACTION_TYPE } from './Transaction'

enum COLOR {
	SUCCESS = 'success',
	ERROR = 'error'
}

const transactionColor = (type: TRANSACTION_TYPE): COLOR => {
	const color = {
		[TRANSACTION_TYPE.INCOME]: COLOR.SUCCESS,
		[TRANSACTION_TYPE.EXPENSE]: COLOR.ERROR,
	}

	return color[type]
}

export default {
	transactionColor
}
