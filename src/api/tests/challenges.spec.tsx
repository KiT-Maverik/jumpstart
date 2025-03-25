// import { act, renderHook, waitFor } from '@testing-library/react'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
//
// import { CONTRACT_GROUP, paginatorExample } from 'api/constants'
// import { getAddonsListContract, getAddonByIdContract, createAddonContract } from 'api/contracts'
// import { useCreateChallengeMutation } from 'api/mutations'
// import { useGetChallengesListQuery, useGetAddonByIdQuery } from 'api/queries'
// import { Addon, Paginator } from 'api/schemas'
// import { testName, testSuite } from 'configuration/constants'
//
// describe(CONTRACT_GROUP.ADDON, () => {
// 	const queryClient = new QueryClient()
//
// 	const wrapper = ({ children }: { children: React.ReactNode }) => (
// 		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
// 	)
//
// 	describe(getAddonsListContract.name, () => {
// 		it(testName.contract.responseOk, async () => {
// 			const { result } = renderHook(() => useGetChallengesListQuery(paginatorExample), { wrapper })
//
// 			await waitFor(() => expect(result.current.getChallengesListQuery.isSuccess).toBe(true), {
// 				timeout: 3000
// 			})
//
// 			const { success } = getAddonsListContract.schema.response.payload.safeParse(
// 				result.current.getChallengesListQuery.data?.data
// 			)
//
// 			expect(success).toBeTruthy()
// 			expect(result.current.getChallengesListQuery.data?.status).toBe(getAddonsListContract.responseExample?.status)
// 		})
//
// 		it.only(testName.contract.paginatorOk, async () => {
// 			const longListQuery = renderHook(() => useGetChallengesListQuery(paginatorExample), { wrapper }).result.current.getChallengesListQuery
//
// 			await waitFor(() => expect(longListQuery.isSuccess).toBe(true), {
// 				timeout: 3000
// 			})
// 			console.log(longListQuery.isSuccess)
// 			console.log(longListQuery.data?.data.results)
//
// 			const paginator: Paginator = {
// 				limit: 1,
// 				offset: 1,
// 			}
// 			const paginatedListQuery = renderHook(() => useGetChallengesListQuery(paginatorExample), { wrapper }).result.current.getChallengesListQuery
//
// 			await waitFor(() => expect(longListQuery.isSuccess).toBe(true), {
// 				timeout: 3000
// 			})
//
// 			console.log(paginatedListQuery.data?.data.results)
// 			console.log(longListQuery.data?.data.results.slice(paginator.offset, paginator.limit))
// 			expect(
// 				paginatedListQuery.data?.data.results
// 			).toStrictEqual(
// 				longListQuery.data?.data.results.slice(paginator.offset, paginator.limit)
// 			)
// 		})
// 	})
//
// 	describe(testSuite.common.crud, () => {
// 		let testChallenge: Addon
//
// 		beforeAll(async () => {
// 			const requestData = {
// 				name: 'Test Challenge',
// 				description: 'Test Challenge description',
// 			};
//
// 			const { result } = renderHook(() => useCreateChallengeMutation(), { wrapper });
//
// 			testChallenge = await result.current.createChallenge.mutateAsync(requestData)
// 				.then(res => res.data)
// 				.catch(() => {
// 					throw new Error('Failed to test entity in beforeAll');
// 				});
// 		});
//
// 		describe(getAddonByIdContract.name, () => {
// 			it(testName.contract.responseOk, async () => {
// 				const { result } = renderHook(() => useGetAddonByIdQuery({ challengeId: testChallenge.id }), { wrapper })
//
// 				await waitFor(() => expect(result.current.getChallengeByIdQuery.isSuccess).toBe(true), {
// 					timeout: 3000
// 				})
//
// 				const response = result.current.getChallengeByIdQuery.data
//
// 				const { success } = getAddonByIdContract.schema.response.payload.safeParse(
// 					response?.data
// 				)
//
// 				expect(success).toBeTruthy()
// 				expect(response?.status).toBe(getAddonByIdContract.responseExample?.status)
// 				expect(response?.data.name).toBe(testChallenge.name)
// 				expect(response?.data.description).toBe(testChallenge.description)
// 			})
// 		})
// 	})
// })
