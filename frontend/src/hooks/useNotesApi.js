import { useSecureFetch } from "./useSecureFetch";

export const useNotesApi = () => {
    const fetchSecure = useSecureFetch();

    const getNotes = () => {
        return fetchSecure(
            '/notes/get/collections', 
            {
                method: 'GET'
            }
        );
    };

    const addNewCollection = (collectionToAdd) => {

        // console.log("Collection to add", collectionToAdd)
        // console.log("JSON STRING: ", JSON.stringify(collectionToAdd))
        return fetchSecure(
            '/notes/add/collection',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },    
                body: JSON.stringify(collectionToAdd)
            }
        )
    }

    const addNewNote = (collectionId, noteToAdd) => {
        console.log("Collection Id: ", collectionId)
        console.log("Add the new note: ", noteToAdd)
        return fetchSecure(
            `/notes/add/note/${collectionId}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(noteToAdd)
            }
        )
    }
    
    const updateNote = (collectionId, noteId, noteToAdd) => {
        return fetchSecure(
            `/notes/update/note/${collectionId}/${noteId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(noteToAdd)
            }
        )
    }

    return {
        getNotes,
        addNewCollection,
        addNewNote,
        updateNote
    }
}