import React from 'react'

const Navbar = () => {
  return (
    <>
        <nav className="navbar  w-full h-[15vh] flex justify-between items-center px-3">
        <div className="logo h-full  flex items-center gap-3">
            <img className="w-10" src="./Logo.png"/>
            <h1 className="text-white font-[1000] text-2xl font-instrument "><a href='/'>AlgoJudge</a></h1>
        </div>
        <div className="centerdiv h-full  text-white font-light flex items-center justify-between gap-5 px-5">
            <h2>Features</h2>
            <h2>About</h2>
        </div>
        <div className="signin text-white h-full  gap-3 px-4  flex items-center justify-between">
            <h2 className="font-light"><a href="/signup">New Account</a></h2>
            <div className="btnDiv bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[2px] rounded-lg">
                <div className="h-full w-full bg-[#110D14] font-[900] text-lg font-instrument rounded-lg py-1.5 px-4" ><h1><a href="/signin">SIGN IN</a></h1></div>
            </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
