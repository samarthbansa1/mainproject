import ProfileNavbar from "../components/ProfileNavbar";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SiTicktick } from "react-icons/si";
import CalendarComp from "../components/CalendarComp";
import ProbCategory from "../components/ProbCategory";
import ProblemStatement from "../components/ProblemStatement";
import api from "../api";

const CATEGORY_LABELS = {
  arr: "Arrays",
  matrix: "Matrix",
  math: "Mathematics",
  dp: "Dynamic programming",
  graph: "Graphs",
};

const ProblemPage = () => {
  const [problems, setProblems] = useState([]);
  const [solvedProblemIds, setSolvedProblemIds] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await api.get("/api/auth/problems/");
        setProblems(response.data.problems || []);
        setSolvedProblemIds(response.data.solved_problem_ids || []);
      } catch (err) {
        setError("Not authorized. Please sign in again.");
        navigate("/signin");
      }
    };
    fetchProblems();
  }, [navigate]);

  // Unique categories for buttons
  const uniqueCategories = Array.from(
    new Set(problems.map((p) => p.problem_category))
  );

  // Filtered problems for display
  const displayedProblems =
    activeCategory === "all"
      ? problems
      : problems.filter((p) => p.problem_category === activeCategory);

  // Solved problems for sidebar
  const solvedProblems = problems.filter(problem =>
    solvedProblemIds.includes(problem.id)
  );

  return (
    <>
      <ProfileNavbar />
      <div className="h-[85vh] flex border-t border-t-gray-300">
        <div className="h-full w-[30%] border-r border-r-gray-300 ">
          <div className="profile_pic w-full h-[50%] flex flex-col justify-center items-center overflow-auto">
            <CalendarComp />
          </div>
          <div className="past_submission border-t border-t-gray-300 w-full h-[50%] ">
            <div className="w-full h-[20%] flex justify-center items-center">
              <h1 className="text-white font-[900] text-md">
                PAST SUBMISSIONS :
              </h1>
            </div>
            <div className="problemsdiv w-full h-[80%] overflow-auto">
              {solvedProblems.length === 0 && (
                <div className="text-gray-400 text-center">No solved problems yet.</div>
              )}
              <div className="w-full flex flex-col gap-2">
  {solvedProblems.map((problem) => (
    <div key={problem.id} className="flex items-center gap-2 bg-gray-800 rounded px-3 py-2">
      <SiTicktick size={20} color="#32CD32" />
      <h2 className="text-white text-base">
        {problem.problem_statement
          .split(' ')
          .slice(0, 6)
          .join(' ') + (problem.problem_statement.split(' ').length > 5 ? '...' : '')}
      </h2>
    </div>
  ))}
</div>
            </div>
          </div>
        </div>
        <div className="h-full overflow-auto w-[70%] relative">
          <div className="h-0 w-[40rem] absolute -z-10 top-[9%] left-[2%] rounded-2xl shadow-[0_0_100px_20px_#951ec0]"></div>
          <div className="h-0 w-[40rem] absolute -z-10 top-[9%] left-[30%] rounded-2xl shadow-[0_0_100px_20px_#12A8F9]"></div>

          {/* Category Filter Buttons */}
          <div className="w-full px-4 overflow-auto h-[20%] flex items-center gap-3 ">
            <ProbCategory
              label="All"
              isActive={activeCategory === "all"}
              onClick={() => setActiveCategory("all")}
            />
            {uniqueCategories.map((cat) => (
              <ProbCategory
                key={cat}
                label={CATEGORY_LABELS[cat] || cat}
                isActive={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </div>
          {/* Filtered Problems */}
          <div className="w-full h-[80%] overflow-auto">
            {error && (
              <div className="text-red-500 text-center">{error}</div>
            )}
            {displayedProblems.map((problem, idx) => (
  <ProblemStatement
    key={problem.id}
    serial={idx + 1} // This is the serial number (1-based)
    id={problem.id}  // This is the actual problem ID
    problem_statement={problem.problem_statement}
    problem_category={problem.problem_category}
    difficulty={problem.difficulty}
  />
))}

          </div>
        </div>
      </div>
    </>
  );
};

export default ProblemPage;
