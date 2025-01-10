import { useState } from "react";

const NoteCard = ({ note, handleSaveNote, handleDeleteNote }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [ editNote, setEditNote ] = useState({
        id: note.id,
        title: note.title,
        description: note.description,
        content: note.content,
        mode: "edit"
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setEditNote(prevNote => ({
            ...prevNote,
            [name]: value
        }))
    }

    const handleSave = () => {
        setIsEditing(false)
        handleSaveNote(editNote)
    }

    if (isEditing) {
        return (
            <div className="h-40 flex flex-col bg-stone-600 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex-1 p-3">
                    <input 
                        className="w-full bg-stone-700 p-2 rounded text-stone-200 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all mb-2"
                        type="text"
                        name="title"
                        value={editNote.title}
                        placeholder="Note Title"
                        onChange={handleChange}
                    />
                    <textarea 
                        className="w-full bg-stone-700 p-2 rounded text-stone-200 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all text-sm resize-none h-12"
                        placeholder="Note Description"
                        name="description"
                        value={editNote.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex justify-end gap-2 p-2 bg-stone-700 rounded-b-lg">
                    <button 
                        className="px-3 py-1.5 bg-stone-500 text-stone-200 rounded text-sm hover:bg-stone-400 transition-colors"
                        onClick={handleSave} // This will be replaced with your save handler
                    >
                        Save
                    </button>
                    <button 
                        className="px-3 py-1.5 border border-stone-400 text-stone-200 rounded text-sm hover:bg-stone-500 transition-colors"
                        onClick={() => setIsEditing(false)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-40 flex flex-col bg-stone-600 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex-1 p-3">
                <h2 className="font-semibold text-stone-100 mb-2 truncate">{note.title}</h2>
                <p className="text-stone-300 text-sm line-clamp-3">{note.description}</p>
            </div>
            <div className="flex justify-end gap-2 p-2 bg-stone-700 rounded-b-lg">
            <button 
                    className="px-3 py-1.5 bg-stone-500 text-stone-200 rounded text-sm hover:bg-stone-400 transition-colors"
                    onClick={() => setIsEditing(true)}
                >
                    Edit
                </button>
                <button 
                    className="px-3 py-1.5 bg-stone-500 text-stone-200 rounded text-sm hover:bg-stone-400 transition-colors"
                >
                    Open
                </button>
                <button 
                    className="px-3 py-1.5 border border-stone-400 text-stone-200 rounded text-sm hover:bg-stone-500 transition-colors"
                    value={note.id}
                    onClick={handleDeleteNote}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default NoteCard