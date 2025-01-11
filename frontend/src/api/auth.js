const BASE_URL = "http://127.0.0.1:5000/api"

export const getAccessToken = async () => {
    try {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: "POST",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Failed to refresh access token")
        }

        const data = await response.json()
        return data.access_token

    } catch {
        console.log("Error refrehing token: ", error)
        throw error
    }
}

export const getSecureResponse = async (url, options, accessToken) => {
    const response = await fetch(`${BASE_URL}${url}`, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include"
    })
    return response
}