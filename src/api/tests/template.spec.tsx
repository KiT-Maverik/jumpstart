// import React from 'react';
// import { http, HttpResponse } from 'msw';
// import { setupServer } from 'msw/node';
// import { render, renderHook, screen } from '@testing-library/react'
// import { waitFor } from '@testing-library/dom';
//
// import { Button } from '@mui/material';
//
//
// export const useCreateChallengeMutation = () => {
// 	const queryClient = useQueryClient()
// 	const {name, endpoint: {method, route}} = createChallengeContract
//
// 	const createChallenge = useMutation({
// 		mutationKey: [name],
// 		mutationFn: async (data: CreateChallenge_RequestPayload) =>
// 			await api[method]<CreateChallenge_ResponsePayload>(route, {
// 				data,
// 			}),
// 		onSuccess: () => {
// 			queryClient.invalidateQueries({ queryKey: [getChallengesListContract.name] })
// 		},
// 	})
//
// 	return { createChallenge }
// }
//
// const server = setupServer(
// 	http.get('/posts', ({ request, params, cookies }) => {
// 		return HttpResponse.json([
// 			{
// 				id: 'f8dd058f-9006-4174-8d49-e3086bc39c21',
// 				title: 'Avoid Nesting When You\'re Testing',
// 			},
// 			{
// 				id: '8ac96078-6434-4959-80ed-cc834e7fef61',
// 				title: 'How I Built A Modern Website In 2021',
// 			},
// 		]);
// 	}),
// );
//
// beforeAll(() => server.listen());
//
// afterEach(() => server.resetHandlers());
//
// afterAll(() => server.close());
//
// it('calls the API and handles the response', async () => {
// 	const queryClient = new QueryClient();
//
// 	const { result, waitForNextUpdate } = renderHook(() =>
// 			useCreateChallengeMutation(),
// 		{
// 			wrapper: ({ children }) => (
// 				<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
// 			)
// 		}
// 	);
//
// 	const { createChallenge } = result.current;
//
// 	const testData: CreateChallenge_RequestPayload = {
// 		name: 'Test Challenge',
// 		description: 'Test Challenge Description'
// 	};
//
// 	await createChallenge(testData);
// 	await waitForNextUpdate();
//
// 	expect(result.current).toBe(true);
// 	expect(result.current.data).toHaveProperty('id');
// 	expect(result.current.data.name).toBe(testData.name);
// });
