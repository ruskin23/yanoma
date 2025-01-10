import { useState } from "react"

function NewCollection({ handleSaveNewCollection, handleCloseNewCollection}) {
    const [ newHeadingValue, setNewHeadingValue ] = useState("")

    const handleNewHeadingValue = (e) => setNewHeadingValue(e.target.value)
 
    return (
        <div className="bg-stone-700 rounded-lg shadow-lg p-4 mb-4">
            <div className="flex flex-col sm:flex-row gap-4">
                <input 
                    className="flex-1 bg-stone-600 px-3 py-2 rounded text-stone-200 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all"
                    type="text"
                    name="heading"
                    placeholder="Enter Collection Name"
                    value={newHeadingValue}
                    onChange={handleNewHeadingValue}
                />
                <div className="flex justify-end gap-2">
                    <button 
                        className="px-4 py-2 bg-stone-500 text-stone-200 rounded hover:bg-stone-400 transition-colors text-sm font-medium"
                        name="save-collection"
                        value={newHeadingValue}
                        onClick={handleSaveNewCollection}
                    >
                        Save Collection
                    </button>
                    <button 
                        className="px-4 py-2 border border-stone-400 text-stone-200 rounded hover:bg-stone-500 transition-colors text-sm font-medium"
                        name="close-collection"
                        onClick={handleCloseNewCollection}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )}

export default NewCollection