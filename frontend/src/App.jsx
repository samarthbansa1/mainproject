import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landingpage from './pages/Landingpage';
import UserReg from './pages/UserReg';
import UserSignin from './pages/UserSignin';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import ProblemPage from './pages/ProblemPage';
import ProblemScreen from './pages/ProblemScreen';
import Dashboard from './pages/Dashboard';
import DashboardProblemDetail from './pages/DashboardProblemDetail';
import DashboardProblemCreate from './pages/DashboardProblemCreate';
import Leaderboard from './pages/Leaderboard';
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
      <Route path='/problem/:p_id' element={<ProblemScreen />} />



      {/* this is also a protected route  */}
      <Route path='/dashboard' element={<Dashboard/>}/>

      {/* this is  also a protected route */}
      <Route path="/dashboard/:p_id" element={<DashboardProblemDetail/>}/>

        {/* this is also a protected route  */}
        <Route path="/dashboard/create" element={<DashboardProblemCreate/>}/>

        <Route path='/leaderboard' element={<Leaderboard/>}/>






    </Routes>
   </BrowserRouter>
  )
}

export default App
