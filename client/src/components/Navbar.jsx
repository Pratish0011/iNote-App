import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Navbar() {

  const {currentUser} = useSelector(state => state.user)

  return (
    <div className='flex justify-between items-center bg-myColor px-12 lg:px-24 py-4'>
        <div className="font-bold text-2xl">
          <Link to={'/'}>
          <h1>iNOTE</h1>
          </Link>
        </div>
         {
           currentUser.avatar ? 
           (
             <Link to={'/profile'}>
              <div className="flex gap-4 items-center font-semibold text-2xl">
               <img src={currentUser.avatar} alt="" className='w-12 rounded-full' />
                <h2>{currentUser.username}</h2>
           </div>
               </Link>
           ) :
          (
            <div className="flex gap-4 items-center font-semibold text-2xl">
             <Link to={'/sign-up'}>
           <button className='bg-slate-700 text-base px-4 py-2 rounded-lg text-white hover:shadow-lg'>SignUp</button>
           </Link>
             <Link to={'/sign-in'}>
           <button className='bg-slate-100 text-base px-4 py-2 rounded-lg text-black hover:shadow-lg'>SignIn</button>
           </Link>
        </div>
           )
         }
    </div>
  )
}

export default Navbar
