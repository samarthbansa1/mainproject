import React from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const LogoutButton = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refresh_token");

    try {
      await axios.post("http://127.0.0.1:8000/api/auth/logout/", {
        refresh: refreshToken,
      });
    } catch (err) {
      console.error("Logout failed or token already invalid.");
    }

    // Clear tokens and redirect
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/signin");
  };
  return (
     <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded"
    >
      Logout
    </button>
  )
}

export default LogoutButton
