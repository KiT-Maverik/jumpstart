export const errorMessage = {
	generic: 'Something went wrong',
	api: {
		notAuthorized: 'Not authorized',
		notFound: (entity: string) => `${entity} not found`,
		alreadyExist: (entity: string) => `${entity} already exist`,
		paginatorMissing: 'Please add paginator to the query (limit and offset query params)',
	}
}
