import axios from "axios";

import { localStorageKey } from "configuration/constants";
import {environment} from 'utils'

export const api = axios.create({
	baseURL: environment.api.baseUrl,
});

api.interceptors.request.use(
	(config) => {
		let token: string | undefined;

		if (typeof window !== "undefined") {
			token = localStorage.getItem(localStorageKey.token.access) ?? undefined;
		}

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => Promise.reject(error)
);
