import React from 'react'
import 'boxicons/css/boxicons.min.css';
import { FaUser } from 'react-icons/fa'; // Font Awesome
import logo from '../assets/Logo.png'; 

const ProfileNavbar = () => {
  return (
     <>
     <div className=" h-0 w-[16rem] absolute -z-10 top-[9%] left-[35%] shadow-[0_0_60px_14px_#951ec0]"></div>
     <div className=" h-0 w-[16rem] absolute -z-10 top-[9%] left-[50%] shadow-[0_0_60px_14px_#12A8F9]"></div>
        <nav className="navbar  w-full h-[15vh] flex justify-between items-center px-3">
        <div className="logo h-full  flex items-center gap-3">
            {/* <img className="w-10" src="./Logo.png"/> */}
            <img className="w-10" src={logo}/>
            <h1 className="text-white font-[1000] text-2xl font-instrument "><a href='/'>AlgoJudge</a></h1>
        </div>
        <div className="centerdiv h-full  text-white font-light flex items-center justify-between gap-5 px-5">
            <h2><a href='/problems'>Problems</a></h2>
            <h2><a href='/leaderboard'>Leaderboard</a></h2>
            
        </div>
        <div className="signin  text-white h-full  gap-3 px-4  flex items-center justify-center">
            <div className="btnDiv h-10 w-10 bg-gradient-to-r from-indigo-500 via-purple-500 p-0.5 to-pink-500  rounded-full flex justify-between items-center">
                <div className="h-full w-full bg-[#110D14] font-[900] text-lg font-instrument  rounded-full flex justify-center items-center " ><h1><a href='/profile'><FaUser size={24} color="#FFF" /></a></h1></div>
            </div>
        </div>
      </nav>
    </>
  )
}

export default ProfileNavbar
