import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landingpage from './pages/Landingpage';
import UserReg from './pages/UserReg';
import UserSignin from './pages/UserSignin';
import ProfilePage from './pages/ProfilePage';
const App = () => {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landingpage/>} />
      <Route path='/signup' element={<UserReg/>} />
      <Route path='/signin' element={<UserSignin/>} />
      <Route path='/profile' element={<ProfilePage/>} />
    </Routes>
   </BrowserRouter>
  )
}

export default App
