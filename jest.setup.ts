// jest.setup.js
// import '@testing-library/jest-dom/extend-expect';
// You could set up any global variables or configurations here

import { environmentVariable } from 'configuration/constants'
import { v4 as uuidv4 } from 'uuid';

if (!global.crypto) {
	// Make sure `global.crypto` exists so we can attach to it
	(global as any).crypto = {};
}

// If `crypto.randomUUID` doesn’t exist, define it:
if (typeof global.crypto.randomUUID === 'undefined') {
	function randomUUIDWrapper(): `${string}-${string}-${string}-${string}-${string}` {
		return uuidv4() as `${string}-${string}-${string}-${string}-${string}`;
	}

	global.crypto.randomUUID = randomUUIDWrapper;
}

process.env[environmentVariable.addMetaToContracts] = 'enable'
