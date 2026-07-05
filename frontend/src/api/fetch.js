const apiBase = import.meta.env.URL_API_BASE || 'http://localhost:3000';

export const fetchApi = async (endpoint, options) => {
    const token = localStorage.getItem('token')
    const headers = {
        'Content-Type': 'application/json',
        ...(token&& {'Authorization': `Bearer ${token}`}),
        ...options?.headers
    }
    const response = await fetch(`${apiBase}${endpoint}`, {
        ...options,
        headers,
    })
    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'An error occurred while fetching data.')
    }
    return response.json()
}