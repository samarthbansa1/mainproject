import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileNavbar from '../components/ProfileNavbar';
import api from '../api';

const CATEGORY_LABELS = {
  arr: "Arrays",
  matrix: "Matrix",
  math: "Mathematics",
  dp: "Dynamic programming",
  graph: "Graphs",
};

const DIFFICULTY_LABELS = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

const DIFFICULTY_COLORS = {
  easy: "text-green-400",
  medium: "text-yellow-400",
  hard: "text-red-400",
};

const ProblemScreen = () => {
  const { p_id } = useParams();
  const [problem, setProblem] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await api.get(`/api/auth/problems/${p_id}/`);
        setProblem(res.data);
      } catch (err) {
        setError("Failed to load problem.");
      }
    };
    fetchProblem();
  }, [p_id]);

  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!problem) return <div className="p-4 text-white">Loading...</div>;

  return (
    <>
      <ProfileNavbar />
      <div className=" w-[0rem] absolute -z-10 top-[40%] left-[20%] shadow-[0_0_200px_130px_#8212F9]"></div>
    <div className=" w-[0rem] absolute -z-10 top-[60%] left-[20%] shadow-[0_0_200px_100px_#12A8F9]"></div>

      <div className="h-[85vh] flex border-t border-t-gray-300 text-white">
        <div className="h-full w-[50%] border-r border-r-gray-300 p-4 flex flex-col">
          <div className="problem_num mb-4">
            <h1 className="text-2xl font-bold font-instrument">
              Problem No: {problem.id}
            </h1>
          </div>

          <div className="problem_statement flex-grow overflow-auto mb-4 text-[15px] font-semibold">
            <p>{problem.problem_statement}</p>
          </div>

          <div className="flex gap-6 mb-4 text-sm items-center">
            <span className="text-blue-300 font-semibold">
              {CATEGORY_LABELS[problem.problem_category] || problem.problem_category}
            </span>
            <span className={`${DIFFICULTY_COLORS[problem.difficulty]} font-bold`}>
              {DIFFICULTY_LABELS[problem.difficulty] || problem.difficulty}
            </span>
            {problem.solved && (
              <span className="text-green-500 font-semibold">Solved</span>
            )}
          </div>

          <div className="examples overflow-auto p-2 border-t border-t-gray-600">
            <h2 className="font-bold mb-2">Examples:</h2>
            {/* Render examples if available */}
            {problem.examples && problem.examples.length > 0 ? (
              problem.examples.map((ex, idx) => (
                <div key={idx} className="mb-4">
                  <div><strong>Input:</strong> {ex.input}</div>
                  <div><strong>Output:</strong> {ex.output}</div>
                </div>
              ))
            ) : (
              <p>No examples provided.</p>
            )}
          </div>
        </div>

        <div className="h-full w-[50%] relative">
          {/* You can add additional content here */}
        </div>
      </div>
    </>
  );
};

export default ProblemScreen;
