import dayjs from 'dayjs'

export const formatDate = (date: string, separator = '.') => {
	const parsedDate = dayjs(date)

	const dateInfo = [
		parsedDate.get('date'),
		parsedDate.get('month') + 1,
		parsedDate.get('year')
	]

	return dateInfo.join(separator)
}
