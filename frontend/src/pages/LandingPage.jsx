import React from "react";
import Navbar from "../components/Navbar";

const Landingpage = () => {
  return (
    <> 
     {/* background image */}
        <img className="absolute right-12 -z-10 top-10" src="./backg.png"/>
    {/* background blur div */}
    <div className=" w-[0rem] absolute -z-10 top-[50%] left-[-2%] shadow-[0_0_1200px_150px_#951ec0]"></div>

      <Navbar/>

      <div className=" flex  h-[85vh] w-full">
        {/* image div */}
        <div className="imgdiv   w-[50%] h-full">
            <img src="./laptop.png"/>
        </div>
        {/* text dive */}
        <div className="textdiv relative  w-[50%] h-[70%] flex flex-col justify-center text-white font-instrument text-5xl font-[1000] leading-snug">
            <h1>TEST YOUR CODE</h1>
            <div className="flex">
                <h1>GET INSTANT</h1>
            <img className="h-[55px]" src="./verdict.png"/>
            </div>
            <h1>LEVEL UP YOUR SKILLS</h1>
            <div className=" absolute flex justify-center items-center bottom-0 w-full  h-[20%]">
                <div className="btnDiv bg-gradient-to-r from-purple-400 to-purple-600 w-[29%] p-[2px] rounded-lg">
                <div className="h-full w-full bg-[#110D14] font-[900] text-lg font-instrument rounded-lg py-1.5 px-4" ><h1><a href="/signup">GET STARTED</a></h1></div>
            </div>
            </div>
        </div>
        
      </div>
      <div className="border-2 flex border-amber-50 h-[100vh] w-[100vw] relative">
      <h1>sddd</h1>
        
      </div>
      
    </>
  );
};

export default Landingpage;
