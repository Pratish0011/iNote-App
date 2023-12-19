import React, { useEffect, useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import NoteCard from "../components/NoteCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
 
const {currentUser} = useSelector(state=> state.user)
console.log(currentUser._id);
const [noteData, setNoteData] = useState([])
const [error, setError] = useState(null)
const [searchTerm, setSearchTerm] = useState('')

useEffect(()=>{
const fetchUserNotes = async()=>{
try {
const res = await fetch(`/api/notes/getNotes/${currentUser._id}`)
const data = await res.json()
const revData  = [...data].reverse()
if (data.success === false) {
  setError(data.message);
  return;
}
setNoteData(revData)

} catch (error) {
  setError(error);
}
}
fetchUserNotes()
},[])


const handleSearch = async(e)=>{
  e.preventDefault();
  try {
    const url = searchTerm
      ? `/api/notes/searchNotes/${currentUser._id}?searchTerm=${searchTerm}`
      : `/api/notes/getNotes/${currentUser._id}`;

    const res = await fetch(url);
    const data = await res.json();

    const revData = [...data].reverse();
    console.log(revData);
    if (data.success === false) {
      setError(data.message);
      return;
    }
    setNoteData(revData);
  } catch (error) {
    setError(error);
  }

}




return (
    <>
    <div className="my-4 flex justify-between max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto p-4">
      <Link to={'/add-note'}>
      <div className="flex  items-center gap-2 px-4 py-2 bg-myColor rounded-lg">
        <BiAddToQueue className="text-2xl font-semibold" />
        <span className="font-semibold">Add Note</span>
      </div>
      </Link>
      <div className="">
        <form className="flex gap-4" onSubmit={handleSearch}>
          <input
            className="py-2 px-2 w-96 rounded-lg bg-myColor"
            type="text"
            value={searchTerm}
            onChange={(e)=> setSearchTerm(e.target.value)}
            placeholder="Search Here.."
          />
          <button
            className="py-2 px-2 text-white font-semibold bg-slate-600 rounded-lg"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </div>
      <div className="flex gap-8 flex-wrap  max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto">
        {
          noteData.map((note)=>(
            <NoteCard
            id={note._id}
            title={note.title}
            body={note.body}
            />
          ))
        }
      </div>
      </>
  )

}

export default Home;
