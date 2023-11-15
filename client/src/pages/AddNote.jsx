import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

function AddNote() {
   const [error, setError] = useState(null)
   const [loading, setLoading] = useState(false)
   const [data, setData] = useState({})
   const {currentUser} = useSelector(state => state.user)

   const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: "",
        body: ""
    })


function handleFormData (e){
 setFormData({
    ...formData,
    [e.target.id]: e.target.value
 })
}

async function handleSubmit (e){
    e.preventDefault()
    if (!formData.title || !formData.body) {
      setError("Please fill in both title and body.");
      return;
    }
    try {
      setLoading(true)
        const res = await fetch('/api/notes/create',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...formData,
            userRef: currentUser._id,
          })
        })

        const data = await res.json()
        console.log(data);
        setData(data)
        setLoading(false)

        if(data.success === false){
          setError(data.message)
          setLoading(false)
        }
        navigate('/')

    } catch (error) {
        setError(error.message)
        setLoading(false)
    }
}


  return (
    <div className="max-w-6xl mx-auto bg-myColor mt-10 rounded-lg">
      <div className="p-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            id="title"
            value={formData.title}
            className="px-4 py-2 rounded-lg"
            type="text"
            placeholder="Title"
            onChange={handleFormData}
          />

      <textarea
        id="body"
        value={formData.body}
        className="resize-none w-full h-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
        placeholder="Write your note here... " 
        onChange={handleFormData}
      />
        
        <button disabled={loading} type="submit" className="w-full bg-slate-700 text-white py-2 rounded-lg text-2xl font-semibold">
          {
           loading ? "Loading..." : "Add Note"
          }
          
          </button>

        </form>
      </div>
      {
        error && <p className="text-red-500 text-center">{error}</p>
      }
 
    </div>
  );
}

export default AddNote;
