import { useState, useCallback } from "react";


export const useHtpp = () => {
    const [isLoading, setLoading] = useState(true);
    const [hasError, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, ) => {
        setLoading(true)
        try {
            const response = await fetch(url, { method, body });

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();
            setLoading(false)
            return data;
        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e;
        }
    }, [])


    const clearError = useCallback(() => setError(null), []);

    return { isLoading, hasError, request, clearError };
}