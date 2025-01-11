import { useState } from "react";

import NoteCard from "./NoteCard"
import NewNote from "./NewNote";
import { useNotesApi } from "../hooks/useNotesApi";

function NoteDisplay({ collection, setCollections }) {

    const [ newNote, setNewNote ] = useState(false);
    const notesApi = useNotesApi()

    const handleDeleteCollection = (e) => {
        const collectionId = e.target.value
        setCollections(prevCollections => prevCollections.filter(collection => collection.id != collectionId))
    }

    const toggleNewNote = () => {
        setNewNote(!newNote);
    }

    const handleSaveNoteT = (noteObj) => {
        const noteToAdd = {
            id: noteObj.id,
            title: noteObj.title,
            description: noteObj.description,
        }

        setCollections(prevCollections => prevCollections.map(col => {
            if (col.id === collection.id) {
                if (noteObj.mode === "edit") {
                    return {
                        ...col,
                        notes: col.notes.map(note => 
                            note.id === noteObj.id ? noteToAdd : note
                        )
                    }
                } else {
                    return {
                        ...col,
                        notes: [...col.notes, noteToAdd]
                    }
                }
            }
            return col
        }))
    
        if (noteObj.mode !== "edit") toggleNewNote()
    }

    const handleSaveNote = (noteObj) => {

        const noteToAdd = {
            title: noteObj.title,
            description: noteObj.description,
        };

        if (noteObj.mode === 'new') {
            const addNew = async () => {
                const response = await notesApi.addNewNote(collection.id, noteToAdd);
                const newNote = response.note;
                setCollections(prevCollections => prevCollections.map(col => {
                    if (col.id === collection.id) {
                        return {
                            ...col,
                            notes: [...col.notes, newNote]
                        }
                    };
                    return col;
                }));
            };

            addNew();
        } else if (noteObj.mode === 'edit') {
            const addNew = async () => {
                const response = await notesApi.updateNote(collection.id, noteObj.id, noteToAdd);
                const newNote = response.note;
                setCollections(prevCollections => prevCollections.map(col => {
                    if (col.id === collection.id) {
                        return {
                            ...col,
                            notes: col.notes.map(note => 
                                note.id === newNote.id ? newNote : note)
                        }
                    };
                    return col;
                }));
            };

            addNew();
        }

        if (noteObj.mode !== "edit") toggleNewNote()
    }

    const handleDeleteNote = (e) => {
        const noteId = e.target.value
        setCollections(prevCollections => prevCollections.map(col => {
            if (col.id === collection.id) {
                return {
                    ...col,
                    notes: col.notes.filter(note => note.id != noteId)
                }
            }
            return col
        }))
    }

    return (
        <div className="bg-stone-700 rounded-lg overflow-hidden">
            <div className="flex flex-row justify-between items-center bg-stone-600 w-full p-3">
                <h1 className="text-xl font-medium text-stone-200">{collection.heading}</h1>
                <div className="flex space-x-2">
                    <button 
                        className="px-3 py-1.5 bg-stone-500 text-stone-200 rounded hover:bg-stone-400 transition-colors"
                        value={collection.id}
                        onClick={toggleNewNote}
                    >
                        New Note
                    </button>
                    <button 
                        className="px-3 py-1.5 border border-stone-400 text-stone-200 rounded hover:bg-stone-500 transition-colors"
                        name="delete-collection"
                        value={collection.id}
                        onClick={handleDeleteCollection}
                    >
                        Delete
                    </button>
                </div>
            </div>

            {newNote && (
                <NewNote 
                    toggleNewNote={toggleNewNote} 
                    handleSaveNote={handleSaveNote} 
                />
            )}

            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-0 max-h-96 overflow-auto ${collection.notes.length > 0 ? 'p-4' : 'p-0'}`}>                
                {collection.notes.map((note) => (
                    <NoteCard 
                        key={note.id} 
                        note={note}
                        handleSaveNote={handleSaveNote}
                        handleDeleteNote={handleDeleteNote}
                    />
                ))}
            </div>
        </div>
    )
}

export default NoteDisplay