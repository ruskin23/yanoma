import React from "react";
import { useState, useEffect } from "react";
import NoteDisplay from "../components/NoteDisplay";
import NewCollection from "../components/NewCollection";
// import notesData from './notes.json'
import { useNotesApi } from "../hooks/useNotesApi";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {

  const [ collections, setCollections ] = useState([])
  const [ newCollection, setNewCollection ] = useState(false)
  const { accessToken } = useAuth()

  const notesApi = useNotesApi()

  useEffect(() => {

    // console.log("Access Token Dashboard: ", accessToken)
    if (accessToken) {
        const loadNotes = async () => {
            try {
                const data = await notesApi.getNotes()
                setCollections(data)
            } catch (error) {
                console.log(`Failed to load notes: `, error)
            }
        }
        loadNotes()
    }
  }, [accessToken])

  useEffect(() => console.log(collections), [collections])

  const toggleNewCollection = () => {
    setNewCollection(!newCollection);
  }

  const handleSaveNewCollection = (e) => {
    const { name, value } = e.target

    const addCollection = async () => {
        try {
            const response = await notesApi.addNewCollection({heading: value})
            setCollections(prevData => [response.collection, ...prevData])
        } catch (err) {
            console.log("Failed to add collection with error: ", err)
        }
    }

    addCollection();
    
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
            {newCollection && (
                    <NewCollection 
                        handleSaveNewCollection={handleSaveNewCollection}
                        handleCloseNewCollection={toggleNewCollection}
                    />
                )}

            <div className="space-y-4">
                {collections.map((collection) => (
                    <NoteDisplay 
                        key={collection.id}
                        collection={collection}
                        setCollections={setCollections}
                    />
                ))}
            </div>
        </div>
    </div>
)
};

export default Dashboard;
