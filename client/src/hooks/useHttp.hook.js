import { useState, useCallback } from "react"

export const useHttp = () => {
	const [isLoading, changeIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const request = useCallback( async (url, method="GET", body=null, headers={}) => {

		changeIsLoading(true);
		try {
			if (body) {
				body = JSON.stringify(body);
				headers['Content-Type'] = 'application/json';
			}
			const response = await fetch(url, {method, body, headers});
			const data = await response.json();

			if (!response.ok) throw new Error(data.message || "something was wrong");
			changeIsLoading(false);
			return data;

		} catch (e) {
			changeIsLoading(false);
			setError(e.message);
			throw e;
		}
	}, []);

	const clearError = useCallback( () => {setError(null)}, []);

	return { isLoading, request, error, clearError };
}