import React, { use, useEffect, useState } from "react";
import ProfileNavbar from "../components/ProfileNavbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa"; // Font Awesome
import { SiTicktick } from "react-icons/si";
import QuestionChart from "../components/QuestionChart";
import CalendarComp from "../components/CalendarComp";
import StreakComp from "../components/StreakComp";
import api from "../api";
import LogoutButton from "../components/LogoutButton";
const ProfilePage = () => {
  const navigate = useNavigate();

  const [profile,setProfile]=useState(null);
  const [loading , setLoading]=useState(true);
  const [error,setError] = useState("");
  useEffect(()=>{
    const fetchProfile = async () => {
      try {
        const response = await api.get("/api/auth/profile/");
        setProfile(response.data);
        
      } catch (err) {
        setError("Failed to fetch user profile. Please login again.");
        navigate("/signin");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  },[navigate])
  if (loading) return <div>Loading profile...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  return (
    <>
      <ProfileNavbar />
      <div className="h-[85vh] flex border-t border-t-gray-300">
        <div className="h-full w-[30%] border-r border-r-gray-300 ">
          <div className="profile_pic w-full h-[50%]  flex flex-col justify-center items-center">
            <img className="w-[200px] rounded-[50%]" src="./Profilepic.jpg" />
            <h1 className="text-white font-[900] text-2xl font-instrument">
              {profile?.username}
            </h1>
            <h1 className="text-white font-[700] text-xl font-instrument">
              {profile?.college_name}
              
            </h1>
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
        <div className="h-full w-[70%]  p-2 flex flex-wrap">
          <div className="h-[50%] w-1/2 border-1 rounded-md border-amber-50">
            <QuestionChart />
          </div>
          <div className="h-[50%] w-1/2 border-1 rounded-md border-amber-50 overflow-auto">
            
            <CalendarComp/>
          </div>
          <div className="h-[50%] w-full ">
            <StreakComp/>
          </div>
          <LogoutButton/>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
