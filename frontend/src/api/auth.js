import { useToken } from "../routers/TokenContext";

const BASE_URL = "http://127.0.0.1:5000/api"

const getAccessToken = async () => {
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

const getSecureResponse = async (url, options, acessToken) => {
    const response = await fetch(`${BASE_URL}${url}`, {
        ...options,
        headers: {
            ...options.headers,
            Authroization: `Bearer ${acessToken}`,
        },
        credentials: "include"
    })

    return response
}


export const fetchSecureURL = async (url, options)  => {

    const { accessToken, setAccessToken } = useToken();

    try {
        response = await getSecureResponse(url, options, accessToken)

        if (response.status === 401) {
            console.warn("Access token expired. Attempting to refresh...")
            
            const newAccessToken = await getAccessToken()
            setAccessToken(newAccessToken)

            response = await getSecureResponse(url, options, newAccessToken)

            if (!response.ok) {
                throw new Error(`Retry failed with status ${retryResponse.status}`)
            }
        }

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        return await response.json()

    } catch (error) {
        console.log("Error in fetchSecureURL: ", error)
        throw error
    }
    
}