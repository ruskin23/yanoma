import React from "react";
import { useState, useEffect } from "react";
import NoteDisplay from "../components/NoteDisplay";
import NewCollection from "../components/NewCollection";
import notesData from './notes.json'

const Dashboard = () => {

  const [ collections, setCollections ] = useState([])
  const [ newCollection, setNewCollection ] = useState(false)

  useEffect(() => {
    // First check if there's data in localStorage
    const savedData = localStorage.getItem('notesData')
    if (savedData) {
        setCollections(JSON.parse(savedData))
    } else {
        // If not, use the imported JSON
        setCollections(notesData)
        localStorage.setItem('notesData', JSON.stringify(notesData))
    }
  }, [])

  const toggleNewCollection = () => {
    setNewCollection(!newCollection);
  }

  const handleSaveNewCollection = (e) => {
    const { name, value } = e.target
    const collectionToAdd = {
        id: Date.now().toString(),
        heading: value,
        notes: []
    }

    setCollections(prevData => {
      const newData = [...prevData, collectionToAdd]
      localStorage.setItem('notesData', JSON.stringify(newData))
      return newData
    })
    
    if (newCollection) setNewCollection(false)
  }


  return (
    <div className="min-h-screen bg-stone-800 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-stone-200">Welcome to the notes</h1>
                {!newCollection && (
                    <button 
                        className="px-4 py-2 bg-stone-600 text-stone-200 rounded hover:bg-stone-500 transition-colors flex items-center space-x-2"
                        onClick={toggleNewCollection}
                    >
                        <span>New Collection</span>
                    </button>  
                )}
            </header>

            <div className="space-y-4">
                {collections.map((collection) => (
                    <NoteDisplay 
                        key={collection.id}
                        collection={collection}
                        setCollections={setCollections}
                    />
                ))}
                {newCollection && (
                    <NewCollection 
                        handleSaveNewCollection={handleSaveNewCollection}
                        handleCloseNewCollection={toggleNewCollection}
                    />
                )}
            </div>
        </div>
    </div>
)
};

export default Dashboard;
