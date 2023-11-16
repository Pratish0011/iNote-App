import React from 'react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInSuccess } from '../redux/userSlice/userSlice';



function GoogleAuth() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

async function handleGoogleClick(){
try {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth,provider)
    console.log(result);
    const res = await fetch('api/auth/google',{
        method:"POST",
        headers:{
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: result.user.displayName,
            email: result.user.email,
            photo: result.user.photoURL
        })
    })
        const data = await res.json()
        dispatch(signInSuccess(data))
        navigate('/')
} catch (error) {
    console.log('Could not sign in with Google',error)
}
}



  return (
    <button onClick={handleGoogleClick} type='button' className='bg-slate-200  border-solid text-black p-3 rounded-lg uppercase border hover:shadow-lg'>
    Continue with Google
  </button>
  )
}

export default GoogleAuth
