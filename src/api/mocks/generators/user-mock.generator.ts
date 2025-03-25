import { User } from 'api/schemas'

export const createUserMock: (user?: Partial<Omit<User, 'id'>>) => User = (user) => ({
	id: crypto.randomUUID(),
	username: user?.username ?? "Your new group",
	password: user?.password ?? '1!2@3#aA',
	email: user?.email ?? crypto.randomUUID(),
})
