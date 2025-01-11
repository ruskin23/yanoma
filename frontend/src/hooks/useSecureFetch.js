import { useAuth } from "../context/AuthContext";
import { getAccessToken, getSecureResponse } from "../api/auth";

export const useSecureFetch = () => {
    const { accessToken, setAccessToken } = useAuth();
    
    const fetchSecure = async (url, options) => {
        try {
            let response = await getSecureResponse(url, options, accessToken)

            if (response.status === 401) {
                const newAccessToken = await getAccessToken()
                setAccessToken(newAccessToken)
                response = await getSecureResponse(url, options, newAccessToken)
            }
    
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`)
            }
    
            return await response.json()    
        } catch (err) {
            console.log(`Error in fetchSecure:`, err)
            throw err
        }
    }

    return fetchSecure
}