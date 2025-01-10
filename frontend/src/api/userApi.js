const BASE_URL = "http://127.0.0.1:5000/api"

const userApi = async (data, url) => {
    try {
        const response = await fetch(`${BASE_URL}${url}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
                credentials: "include"
            });
        
        if (!response.ok) {
            
            const errorData = await response.json();
            console.log("Error Data:", errorData)
            throw new Error(errorData.message);
        }
        
        return await response.json();
    } catch (error) {
        console.log("Error", error);
        throw error;
    }
} 

export const registerUser = async formData =>  await userApi(formData, '/users/register')
export const loginUser = async formData =>  await userApi(formData, '/users/login')