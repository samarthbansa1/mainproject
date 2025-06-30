import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import api from '../api';

const Dashboard = () => {
  const [problems, setProblems] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await api.get("/api/auth/dashboard/");
        setProblems(response.data);
      } catch (err) {
        setError("Not authorised");
        navigate("/profile");
      }
    };
    fetchProblems();
  }, []);
  const handleDelete = async (problemId) => {
  if (!window.confirm("Are you sure you want to delete this problem?")) return;
  try {
    await api.delete(`/api/auth/dashboard/${problemId}/`);
    window.alert("Problem deleted successfully!");
    // Remove the deleted problem from the list in UI
    setProblems(prev => prev.filter(p => p.id !== problemId));
  } catch (err) {
    setError("Failed to delete problem.");
    console.log(err);
  }
};



  return (
    <div className=' min-h-full w-[100vw] bg-white'>
      <h1 className='font-bold text-center'>All problems</h1>
      <button
  className='bg-yellow-500 cursor-pointer text-white px-4 py-2 rounded mt-2 hover:bg-yellow-600'
  onClick={() => navigate('/dashboard/create')}
>
  Create Problem
</button>
      {error && <div className="text-red-500 text-center">{error}</div>}
      {problems.map((problem, idx) => (
        <div key={problem.id} className='problem_div border-2 border-black w-full h-fit p-2 my-4'>
          <h1>Problem ID- {problem.id}</h1>
          <div className='text-[13px] overflow-auto'>
            <h5>Problem statement-</h5>
            <p>{problem.problem_statement}</p>
            <div>Category: {problem.problem_category}</div>
            <div>Difficulty: {problem.difficulty}</div>
          </div>
          <button onClick={() => handleDelete(problem.id)}
 className='bg-red-500 cursor-pointer text-white px-4 py-2 rounded mt-2 hover:bg-red-600'>
            Delete
          </button>
          <button onClick={()=>{
            navigate(`/dashboard/${problem.id}`)
          }} className='bg-green-500 cursor-pointer text-white px-4 py-2 rounded mt-2 hover:bg-green-600 m-2'>
            EDIT
          </button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
