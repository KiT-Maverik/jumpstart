// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: './',
})

/**
 * @type {import('jest').Config}
 */
const customJestConfig = {
	// Add more setup options before each test is run
	setupFilesAfterEnv: ['./jest.setup.ts'],

	// If using TypeScript, you might need transform settings
	// transform: {
	//   '^.+\\.(ts|tsx)$': 'ts-jest',
	// },
	testEnvironment: 'jsdom',
	watchman: false,
	moduleNameMapper: {
		'^api/(.*)$': '<rootDir>/src/api/$1',
		'^configuration/(.*)$': '<rootDir>/src/configuration/$1',
	},
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},
}

module.exports = createJestConfig(customJestConfig)
