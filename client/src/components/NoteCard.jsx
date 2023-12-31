import React from 'react'
import { Link } from 'react-router-dom'

function NoteCard({id, title,body}) {
  return (
    <Link to={`/note/${id}`}>
    <div id={id}>
      <div className="w-80 h-80 bg-gray-300 rounded-lg  overflow-hidden p-4 hover:shadow-lg cursor-pointer ">
        <h1 className='text-2xl font-bold text-center mb-2 border-b-2'>{title}</h1>
        <p className='text-sm font-normal text-center opacity-60'>{body.slice(0,430)}</p>
      </div>
    </div>
    </Link>
  )
}

export default NoteCard
