/**
 * This object holds the standardized test suites names to maintain uniformity across the application.
 * It includes only global test suite names, which are reusable across multiple test files.
 */
export const testSuite = {
	common: {
		contractValidation: 'Contract validation',
		healthCheck: 'Health check',
		crud: 'CRUD',
	},
	element: {
		atoms: 'Atom',
		molecule: 'Molecule',
		organism: 'Organism',
		template: 'Template',
		page: 'Page',
	},
	entity: {
		hook: 'Hook',
		util: 'Util',
	},
	page: {
		sample: 'Sample page',
	},
} as const

/**
 * Common test names used across multiple test suites.
 * Generally used for executing global verifications, like render check.
 */
export const testName = {
	renderIsOk: 'Render is OK',
	smoke: 'Smoke test',
	contract: {
		requestOk: 'Request is OK',
		responseOk: 'Response is OK',
		paginatorOk: 'Paginator is OK',
	}
} as const

export const fakeData = {
	uuid: '123e4567-e89b-12d3-a456-426655440000',
	email: 'john-doe@example.com',
	password: '1!2@3#aA',
	username: 'John Doe',
	token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eX123joicmVmcmVzaCIsImV4cCI6MTc0MTAwNjAzMiwiaWF0IjoxNzQwNDAxMjMyLCJqdGkiOiIxZmFiYzFjN2FiM2U0MjU4YWNjODU5YjE3MGEwNDljNiIsInVzZXJfaWQiOiI0po9Q4NWUwMi02ZDE1LTRkZTktOTI3My04OWIxZjY2MWM3NGUifQ.zYck7u94VMQ5R_9eYhtwBP5ADcDcv2Gdj_e7hbqjBA",
}
