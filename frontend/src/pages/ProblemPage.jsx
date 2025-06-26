import ProfileNavbar from "../components/ProfileNavbar";
import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa"; // Font Awesome
import { SiTicktick } from "react-icons/si";
import QuestionChart from "../components/QuestionChart";
import CalendarComp from "../components/CalendarComp";
import StreakComp from "../components/StreakComp";
import ProbCategory from "../components/ProbCategory";
import ProblemStatement from "../components/ProblemStatement";

const ProblemPage = () => {
  return (
    <>
      <ProfileNavbar />
      <div className="h-[85vh] flex border-t border-t-gray-300">
        <div className="h-full w-[30%] border-r border-r-gray-300 ">
          <div className="profile_pic w-full h-[50%]  flex flex-col justify-center items-center overflow-auto">
            <CalendarComp />
          </div>
          <div className="past_submission border-t border-t-gray-300 w-full h-[50%] ">
            <div className=" w-full h-[20%]  flex justify-center items-center">
              <h1 className="text-white font-[900] text-md">
                PAST SUBMISSIONS :
              </h1>
            </div>
            <div className="problemsdiv w-full h-[80%]  overflow-auto">
              <div className="w-full  h-[20%] flex">
                <a className="flex">
                  <SiTicktick size={25} color="#32CD32" />
                  <h2 className="text-white">Problem 1</h2>
                </a>
              </div>
              <div className="w-full  h-[20%] flex">
                <a className="flex">
                  <SiTicktick size={25} color="#32CD32" />
                  <h2 className="text-white">Problem 1</h2>
                </a>
              </div>
              <div className="w-full  h-[20%] flex">
                <a className="flex">
                  <SiTicktick size={25} color="#32CD32" />
                  <h2 className="text-white">Problem 1</h2>
                </a>
              </div>
              <div className="w-full  h-[20%] flex">
                <a className="flex">
                  <SiTicktick size={25} color="#32CD32" />
                  <h2 className="text-white">Problem 1</h2>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full overflow-auto w-[70%]  relative   ">
          <div className=" h-0 w-[40rem] absolute -z-10 top-[9%] left-[2%] rounded-2xl shadow-[0_0_100px_20px_#951ec0]"></div>
          <div className=" h-0 w-[40rem] absolute -z-10 top-[9%] left-[30%] rounded-2xl shadow-[0_0_100px_20px_#12A8F9]"></div>

          <div className="w-full px-4 overflow-auto h-[20%] flex items-center gap-3 ">
            <ProbCategory/>
            <ProbCategory/>
            <ProbCategory/>
            <ProbCategory/>
            <ProbCategory/>
            <ProbCategory/>
            <ProbCategory/>
            <ProbCategory/>
            <ProbCategory/>
            <ProbCategory/>
            <ProbCategory/>
            <ProbCategory/>
            <ProbCategory/>
          </div>
          <div className="w-full h-[80%]  overflow-auto">
          <ProblemStatement/>
          <ProblemStatement/>
          <ProblemStatement/>
          <ProblemStatement/>
          <ProblemStatement/>
          <ProblemStatement/>
          <ProblemStatement/>
          <ProblemStatement/>
          <ProblemStatement/>
          <ProblemStatement/>
          <ProblemStatement/>
          <ProblemStatement/>
          <ProblemStatement/>
          <ProblemStatement/>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProblemPage;
