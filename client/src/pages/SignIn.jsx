import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate} from "react-router-dom"
import { signInStart,signInSuccess,signInFailure } from '../redux/userSlice/userSlice'
import GoogleAuth from '../components/GoogleAuth'
import {toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


  const options = {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      }





function SignIn() {

 const [formData, setFormData] =  useState({})
const {loading, error} = useSelector((state)=> state.user)
 const navigate = useNavigate()
 const dispatch = useDispatch()

function handleChange(e){
setFormData({
 ...formData,
 [e.target.id]:e.target.value,
})
}

async function handleSubmit(e){
  e.preventDefault()
  try {
   dispatch(signInStart())
   const res = await fetch('/api/auth/sign-in',
 {
   method:'POST',
   headers: {
     'Content-Type':'application/json',
   },
   body:JSON.stringify(formData)
  
 })
 const data = await res.json()
 console.log(data)
 if(data.success === false){
  dispatch(signInFailure(data.message))
  return;
 }
 dispatch(signInSuccess(data))
 toast.success("😊Welcome to iNote App!")
 navigate('/')
 } catch (error) {
 dispatch(signInFailure(error.message))
 }
} 

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-bold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>


       <input type="email"
       placeholder='Email'
        className='border p-3 rounded-lg'
         id='email'onChange={handleChange}/>

       <input type="password"
       placeholder='Password'
        className='border p-3 rounded-lg'
         id='password'onChange={handleChange}/>

         <button disabled={loading} type='submit' className='bg-slate-700 text-white p-3
         rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
           {loading? "loading...":"Sign In"}</button>
          <GoogleAuth/>
      </form>
      <div className="flex gap-2 mt-5">
       <p>Create an account?</p>
       <Link to={"/sign-up"} className='text-blue-700'>Sign Up</Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default SignIn
