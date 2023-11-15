import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'

function AddNote() {
   const [error, setError] = useState(null)
   const [loading, setLoading] = useState(false)
   const[edit, setEdit] = useState(true)
  const params = useParams()
 
   const [noteData, setNoteData] = useState({})
   const {currentUser} = useSelector(state => state.user)
  

   const navigate = useNavigate()


function handleEdit(e){
  e.preventDefault()
  setEdit(prev => !prev)
}


function handleFormData (e){
 setNoteData({
    ...noteData,
    [e.target.id]: e.target.value
 })
}


async function handleSubmit (e){
    e.preventDefault()
    if(edit){
        navigate('/')
        return
    }
   try{
        const res = await fetch(`/api/notes/updateNote/${params.noteId}`,{
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            ...noteData,
            userRef: currentUser._id,
          })
        })
        const data = await res.json()
        if(data.success === false){
          setError(data.message)
        }
        setNoteData(data)
        setEdit(true)
        // navigate('/')
    } catch (error) {
        setError(error.message)
        setLoading(false)
    }
}
useEffect(()=>{
const fetchNoteData = async() =>{
    try {
      const noteId = params.noteId
        const res = await fetch(`/api/notes/getNote/${noteId}`)
        const data = await res.json()
        if(data.success === false){
          setError(data.message)
          return
        }
        setNoteData(data)
     } catch (error) {
         setError(error.message)
     }
}
fetchNoteData()
},[params.noteId])


  return (
    <div className="max-w-6xl mx-auto bg-myColor mt-10 rounded-lg">
      <div className="p-4">
        <form onSubmit={handleSubmit}  className="flex flex-col gap-4">
          <input
            id="title"
            disabled={edit}
            value={noteData.title}
            className="px-4 py-2 rounded-lg"
            type="text"
            placeholder="Title"
            onChange={handleFormData}
          />

      <textarea
        id="body"
        disabled={edit}
        value={noteData.body}
        className="resize-none w-full h-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
        placeholder="Write your note here... " 
        onChange={handleFormData}
      />
      <div className="flex justify-between gap-4">
      
        <button onClick={handleEdit} type="submit" className="w-64 bg-slate-700 text-white py-2 rounded-lg text-2xl font-semibold">
        Edit
          
          </button>
        <button disabled={loading} type='submit' className="w-64 bg-slate-700 text-white py-2 rounded-lg text-2xl font-semibold">
          {
           edit ? "⬅️Back" : "Update"
          }
          
          </button>
      </div>
        

        </form>
      </div>
      {
        error && <p className="text-red-500 text-center">{error}</p>
      }
 
    </div>
  );
}

export default AddNote;
