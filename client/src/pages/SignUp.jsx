import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import GoogleAuth from '../components/GoogleAuth'
// import OAuth from '../components/OAuth'
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


  

function SignUp() {

 const [formData, setFormData] =  useState({})
 const [error, setError] = useState(null)
 const [loading, setLoading] = useState(false)
 const navigate = useNavigate()

function handleChange(e){
setFormData({
 ...formData,
 [e.target.id]:e.target.value,
})
}

async function handleSubmit(e){
 e.preventDefault()
 setLoading(true)
 try {
   const res = await fetch('/api/auth/sign-up',
 {
   method:'POST',
   headers: {
     'Content-Type':'application/json',
   },
   body:JSON.stringify(formData)
  
 })
 const data = await res.json()
 if(data.success === false){
   setError(data.message)
   setLoading(false)
   return
 }
 setLoading(false)
 setError(null)
toast.success('🙌User created successfully')
 navigate('/sign-in')
 } catch (error) {
   setLoading(false)
   setError(error.message)
 }
} 

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-bold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

       <input type="text"
       placeholder='Username'
        className='border p-3 rounded-lg'
         id='username'onChange={handleChange} />

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
           {loading? "loading...":"Sign Up"}</button>
           <GoogleAuth/>
      </form>
      <div className="flex gap-2 mt-5">
       <p>Have an account?</p>
       <Link to={"/sign-in"} className='text-blue-700'>Sign In</Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default SignUp
