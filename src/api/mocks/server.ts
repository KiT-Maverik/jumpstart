// import { environmentVariable } from 'configuration/constants'
// process.env[environmentVariable.addMetaToContracts] = 'enable'
//
// import express from 'express'
// import cors from 'cors';
// import { setupServer } from 'msw/node'
//
// import * as interceptors from 'api/mocks/interceptors'
// import {
// 	createUsersListMock,
// 	createAddonListMock,
// 	createChallengeRulesListMock,
// 	createTransactionsListMock,
// 	createCompaniesListMock,
// 	createFiltersListMock, createGroupsListMock, createChallengeTypesListMock
// } from 'api/mocks'
// import { Addon, ChallengeRule, ChallengeType, Company, Filter, Challenge, Transaction, User } from 'api/schemas'
//
// import { fakeBackend } from '../constants'
//
//
// const mockServer = setupServer(...Object.values(interceptors))
//
// mockServer.listen({ onUnhandledRequest: 'warn' })
//
// const app = express()
//
// app.use(cors());
// app.use(express.json());
//
// app.all('*', async (req, res) => {
//
// 	const requestHeaders = { ...req.headers };
//
// 	const maybeBody =
// 		req.body && Object.keys(req.body).length > 0
// 			? JSON.stringify(req.body)
// 			: undefined;
//
// 	const mockResponse = await fetch(fakeBackend + req.originalUrl + '/', {
// 		method: req.method,
// 		// headers: requestHeaders,
// 		body: maybeBody,
// 	})
//
// 	res.status(mockResponse.status)
// 	mockResponse.headers.forEach((value, key) => {
// 		res.setHeader(key, value)
// 	})
//
// 	const data = await mockResponse.arrayBuffer()
// 	res.send(Buffer.from(data))
// })
//
// const port = 4000
// app.listen(port, () => {
// 	console.log(`Mock server is running at http://localhost:${port}`)
// })
