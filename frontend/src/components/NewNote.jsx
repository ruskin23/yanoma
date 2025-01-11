import { useState } from "react"

const NewNote = ({ toggleNewNote, handleSaveNote }) => {
    const [ addNote, setAddNote ] = useState({
        id: Date.now().toString(),
        title: "",
        description: "",
        mode: "new"
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setAddNote(prevNote => ({
            ...prevNote,
            [name]: value
        }))
    }

    const handleSave = () => {
        handleSaveNote(addNote)
    }

    return (
        <div className="bg-stone-600 rounded-lg p-4 my-3 shadow-lg">
            <div className="space-y-4">
                <div>
                    <input 
                        className="w-full bg-stone-700 p-2.5 rounded text-stone-200 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all"
                        type="text"
                        placeholder="Note Title"
                        name="title"
                        value={addNote.title}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <textarea 
                        className="w-full bg-stone-700 p-2.5 rounded text-stone-200 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all min-h-[100px] resize-none"
                        placeholder="Note Description"
                        name="description"
                        value={addNote.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex justify-end space-x-2 pt-2">
                    <button 
                        className="px-4 py-2 bg-stone-500 text-stone-200 rounded hover:bg-stone-400 transition-colors text-sm font-medium"
                        name="note-save-button"
                        onClick={handleSave}
                    >
                        Save Note
                    </button>
                    <button 
                        className="px-4 py-2 border border-stone-400 text-stone-200 rounded hover:bg-stone-500 transition-colors text-sm font-medium"
                        name="note-close-button"
                        onClick={toggleNewNote}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NewNote