import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const UserReg = () => {
  const [formData,setFormData]=useState({
    username:"",
    password:"",
    college_name:"",
  });
  const [message,setMessage]=useState("");
  //handle change
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  };
  //handle form submission
  const handleSubmit= async(e)=>{
    e.preventDefault();
    setMessage("");
    try{
      //code
      const response=await axios.post("http://13.223.56.111:8000/api/auth/reg/",formData);
      console.log(response)
      if(response.status==201||response.status==200){
        setMessage("Registration successful! You can now log in.");
          //redirect to profile page i will implement after i implement login functionlaity
      }
      else{
        setMessage(response.data.error || "Registration failed.");

      }
    }catch(error){
      //error handle
      if (error.response) {
        setMessage(error.response.data.error || "Registration failed.");
      } else {
        setMessage("An error occurred. Please try again.");
      }

    }
  }



  return (
    <>
      <Navbar />
      <div className=" w-[0rem] absolute -z-10 top-[50%] left-[40%] shadow-[0_0_900px_80px_#951ec0]"></div>
      <div className=" w-[0rem] absolute -z-9 top-[50%] left-[60%] shadow-[0_0_900px_100px_#37A6EB]"></div>
      <div className=" w-[0rem] absolute -z-8 top-[80%] left-[50%] shadow-[0_0_900px_80px_#37DCEB]"></div>
      
      
  <form onSubmit={handleSubmit}  className="w-[400px] p-8 mx-auto rounded-2xl border-2 border-white shadow-2xl bg-white/10 backdrop-blur-md relative">
    <h2 className="text-3xl font-bold text-white text-center mb-8">LOGIN/SIGNUP</h2>
    
    <label className="block text-xl font-bold text-white mb-2" htmlFor="name">NAME:</label>
    <input id="name" name="username" value={formData.username} onChange={handleChange} type="text" className="w-full mb-6 p-3 rounded-md bg-gray-200/90 focus:outline-none" />

    <label className="block text-xl font-bold text-white mb-2" htmlFor="password">PASSWORD:</label>
    <input id="password" name="password" value={formData.password} onChange={handleChange} type="password" className="w-full mb-6 p-3 rounded-md bg-gray-200/90 focus:outline-none" />

    <label className="block text-xl font-bold text-white mb-2" htmlFor="college">COLLEGE NAME:</label>
    <input id="college" type="text" value={formData.college_name} onChange={handleChange} name="college_name" className="w-full mb-8 p-3 rounded-md bg-gray-200/90 focus:outline-none" />

    <div className="flex justify-center">
      <button type="submit"
        className="px-8 py-2 rounded-md font-semibold text-white bg-gradient-to-r from-purple-500 to-cyan-500 shadow-lg border border-purple-300 hover:from-purple-600 hover:to-cyan-600 transition">
        SIGN IN
      </button>
    </div>
    {message && <div className="mt-2 text-center text-red-500">{message}</div>}
  </form>


    </>
  );
};

export default UserReg;
