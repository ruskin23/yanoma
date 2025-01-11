const BASE_URL = "http://127.0.0.1:5000/api"

export const getAccessToken = async () => {
    try {
        const response = await fetch(`${BASE_URL}/users/refresh`, {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) {
            // console.log("Response status:", response.status);
            // console.log("Response headers:", response.headers);
            const errorData = await response.json();
            // console.log("Error data:", errorData);
            throw new Error("Failed to refresh access token")
        }

        const data = await response.json()
        return data.access_token

    } catch (error) {
        console.log("Error refrehing token: ", error)
        throw error
    }
}

export const getSecureResponse = async (url, options, accessToken) => {
    console.log("Get Secure Response for URL, ", url)
    console.log("With optiouns: ", options)
    
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