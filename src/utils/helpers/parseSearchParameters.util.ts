export const parseSearchParameters = <T>(url: string): T => {
	const parsedUrl = new URL(url);

	const paramsObject = Object.fromEntries(parsedUrl.searchParams.entries());

	return paramsObject as T;
};
