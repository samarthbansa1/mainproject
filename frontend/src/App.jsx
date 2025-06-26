import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landingpage from './pages/Landingpage';
import UserReg from './pages/UserReg';
import UserSignin from './pages/UserSignin';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import ProblemPage from './pages/ProblemPage';
import ProblemScreen from './pages/ProblemScreen';
const App = () => {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landingpage/>} />
      <Route path='/signup' element={<UserReg/>} />
      <Route path='/signin' element={<UserSignin/>} />
      {/* uncomment this after i design profile page */}
      {/* <Route path='/profile' element={
        <ProtectedRoute>
          <ProfilePage/>
        </ProtectedRoute>
      } /> */}
      <Route path='/profile' element={<ProfilePage/>} />
      {/* this is secured route */}


      {/* this is also a secured route problempage */}
      <Route path='/problems' element={<ProblemPage/>}/>



      {/* this is also a secured route change the url after design  */}
      <Route path='/problem' element={<ProblemScreen/>}/>








    </Routes>
   </BrowserRouter>
  )
}

export default App
