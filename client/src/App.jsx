import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import AddNote from './pages/AddNote'
import Note from './pages/Note'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path='/sign-in' element={<SignIn/>}/>
          <Route path='/' element={<Home/>}/>

          {/* <Route element={<PrivateRoute/>}>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/add-note' element={<AddNote/>}/>
          <Route path='/note/:noteId' element={<Note/>}/>
          </Route> */}

        <Route
          path='/profile'
          element={<PrivateRoute element={<Profile />} />}
        />
        <Route
          path='/add-note'
          element={<PrivateRoute element={<AddNote />} />}
        />
        <Route
          path='/note/:noteId'
          element={<PrivateRoute element={<Note />} />}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App
