import { useSecureFetch } from "./useSecureFetch";

export const useNotesApi = () => {
    const fetchSecure = useSecureFetch();

    const getNotes = () => {
        return fetchSecure(
            '/notes/get', 
            {method: 'GET'}
        );
    };

    return {
        getNotes
    }
}