import React from "react";
import { useNavigate } from "react-router-dom";

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

const ProblemStatement = ({
  serial,
  id,
  problem_statement,
  problem_category,
  difficulty,
}) => {
  const navigate = useNavigate(); // You forgot this line 👈

  // Truncate to 10 words
  const truncatedStatement =
    problem_statement.split(" ").slice(0, 10).join(" ") +
    (problem_statement.split(" ").length > 10 ? "..." : "");

  return (
    <div className="h-[9%] p-[0.5px] w-full bg-gradient-to-r from-purple-500 to-blue-500">
      <div className="h-full w-full bg-[#110D14] text-white flex items-center px-2 justify-between">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate(`/problem/${id}`);
          }}
        >
          <h1>
            Problem {serial}: {truncatedStatement}
          </h1>
        </a>
        <div className="flex gap-4 text-xs">
          <span className="text-blue-300">
            {CATEGORY_LABELS[problem_category] || problem_category}
          </span>
          <span className={DIFFICULTY_COLORS[difficulty] + " font-bold"}>
            {DIFFICULTY_LABELS[difficulty] || difficulty}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProblemStatement;
