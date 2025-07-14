import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const UserSignin = () => {
  const navigate = useNavigate();
  useEffect(() => {
      const access = localStorage.getItem("access_token");
      const refresh = localStorage.getItem("refresh_token");
      if (access || refresh) {
        navigate("/profile");
      }
    }, [navigate]);

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      //code
      const response = await axios.post(
        "https://algojudgemyproject.duckdns.org/api/auth/login/",
        formData
      );
      // console.log(response);
      if (response.status == 200) {
        // console.log("Token:", response.data.token);
        localStorage.setItem("access_token", response.data.tokens.access);
        localStorage.setItem("refresh_token", response.data.tokens.refresh);

        setMessage("login succesfull");
        //store token i will do it after completing and designing the proile page
        //redirect to the secured page /profile etc
        navigate("/profile");
      } else {
        setMessage(response.data.error || "Login failed.");
      }
    } catch (error) {
      //handle error
      if (error.response) {
        // console.log(error)
        setMessage(error.response.data.error || "Login failed.");
      } else {
        // console.log(error)
        setMessage("An error occurred. Please try again.");
      }
    }
  };
  return (
    <>
      <Navbar />
      <div className=" w-[0rem] absolute -z-10 top-[50%] left-[40%] shadow-[0_0_900px_80px_#951ec0]"></div>
      <div className=" w-[0rem] absolute -z-9 top-[50%] left-[60%] shadow-[0_0_900px_100px_#37A6EB]"></div>
      <div className=" w-[0rem] absolute -z-8 top-[80%] left-[50%] shadow-[0_0_900px_80px_#37DCEB]"></div>

      <form
        onSubmit={handleSubmit}
        className="w-[400px] p-8 mx-auto rounded-2xl border-2 border-white shadow-2xl bg-white/10 backdrop-blur-md relative"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          LOGIN/SIGNUP
        </h2>

        <label
          className="block text-xl font-bold text-white mb-2"
          htmlFor="name"
        >
          NAME:
        </label>
        <input
          id="name"
          value={formData.username}
          onChange={handleChange}
          name="username"
          type="text"
          className="w-full mb-6 p-3 rounded-md bg-gray-200/90 focus:outline-none"
        />

        <label
          className="block text-xl font-bold text-white mb-2"
          htmlFor="password"
        >
          PASSWORD:
        </label>
        <div className="relative">
          <input
            id="password"
            value={formData.password}
            onChange={handleChange}
            name="password"
            type={showPassword ? "text" : "password"}
            className="w-full mb-6 p-3 rounded-md bg-gray-200/90 focus:outline-none pr-10"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-8 py-2 rounded-md font-semibold text-white bg-gradient-to-r from-purple-500 to-cyan-500 shadow-lg border border-purple-300 hover:from-purple-600 hover:to-cyan-600 transition"
          >
            SIGN IN
          </button>
        </div>
        {message && (
          <div className="mt-2 text-center text-red-500">{message}</div>
        )}
      </form>
    </>
  );
};

export default UserSignin;
