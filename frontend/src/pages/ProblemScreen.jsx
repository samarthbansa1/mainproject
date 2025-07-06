import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileNavbar from "../components/ProfileNavbar";
import api from "../api";
import axios from "axios";

// Vite environment variable for Gemini API key
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-8b:generateContent?key=${GEMINI_API_KEY}`;
console.log("Gemini API Key:", GEMINI_API_KEY);

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

  // Code runner states
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [inputData, setInputData] = useState("");
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [runError, setRunError] = useState("");

  // Submit states
  const [submitting, setSubmitting] = useState(false);
  const [verdict, setVerdict] = useState(null);
  const [verdictError, setVerdictError] = useState("");

  // UI toggle state
  const [showVerdict, setShowVerdict] = useState(false);

  // Gemini states
  const [geminiLoading, setGeminiLoading] = useState(false);
  const [geminiError, setGeminiError] = useState("");
  const [geminiReview, setGeminiReview] = useState("");

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

  // Handler for RUN button
  const handleRun = async (e) => {
    e.preventDefault();
    setRunning(true);
    setRunError("");
    setOutput("");
    try {
      const res = await api.post("/api/auth/problems/compile/", {
        language,
        code,
        input_data: inputData,
      });
      setOutput(res.data.output_data || res.data.output || "");
    } catch (err) {
      setRunError("Compilation or runtime error.");
      setOutput(
        err.response?.data?.output_data ||
        err.response?.data?.error ||
        err.message
      );
    }
    setRunning(false);
  };

  // Handler for SUBMIT button
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setVerdictError("");
    setVerdict(null);
    try {
      const res = await api.post("/api/auth/problems/submit/", {
        problem_id: Number(p_id),
        language,
        code,
      });
      setVerdict(res.data);
      setShowVerdict(true);
    } catch (err) {
      setVerdictError(
        err.response?.data?.error ||
        err.response?.data?.detail ||
        err.message
      );
    }
    setSubmitting(false);
  };

  // Handler for Gemini improvement
  const handleGeminiImprove = async () => {
    if (!GEMINI_API_KEY) {
      setGeminiError("Gemini API key missing. Please set VITE_GEMINI_API_KEY in your .env.");
      return;
    }
    setGeminiLoading(true);
    setGeminiError("");
    setGeminiReview("");
    try {
      const prompt = `You are a code reviewer. Please review the following code for correctness, efficiency, time and space complexity, and suggest improvements. Do not give direct code or full solutions. Here is the code:\n\nLanguage: ${language}\n\n${code}`;
      const geminiRes = await axios.post(
        GEMINI_URL,
        {
          contents: [
            {
              parts: [
                { text: prompt }
              ]
            }
          ]
        }
      );
      setGeminiReview(
        geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No review generated."
      );
    } catch (err) {
      console.error("Gemini API error:", err);
      setGeminiError("Failed to get suggestions from Gemini.");
    }
    setGeminiLoading(false);
  };

  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!problem) return <div className="p-4 text-white">Loading...</div>;

  // Helper to check if all test cases passed
  const allPassed =
    verdict &&
    verdict.submission &&
    verdict.submission.passed_count === verdict.submission.total_count &&
    verdict.submission.total_count > 0;

  return (
    <>
      <ProfileNavbar />
      <div className="w-[0rem] absolute -z-10 top-[40%] left-[20%] shadow-[0_0_200px_130px_#8212F9]"></div>
      <div className="w-[0rem] absolute -z-10 top-[60%] left-[20%] shadow-[0_0_200px_100px_#12A8F9]"></div>

      <div className="h-[85vh] flex border-t border-t-gray-300 text-white">
        {/* Left side: Problem description and verdict */}
        <div className="h-full w-[50%] border-r overflow-auto border-r-gray-300 p-4 flex flex-col">
          <div className="flex gap-2 mb-4">
            <button
              className={`px-4 py-2 rounded-t-lg font-bold ${
                !showVerdict
                  ? "bg-[#894DB9] text-white"
                  : "bg-gray-700 text-gray-300"
              }`}
              onClick={() => setShowVerdict(false)}
            >
              Description
            </button>
            <button
              className={`px-4 py-2 rounded-t-lg font-bold ${
                showVerdict
                  ? "bg-[#894DB9] text-white"
                  : "bg-gray-700 text-gray-300"
              }`}
              onClick={() => setShowVerdict(true)}
              disabled={!verdict}
            >
              Verdict
            </button>
          </div>
          {!showVerdict ? (
            <>
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
                  {CATEGORY_LABELS[problem.problem_category] ||
                    problem.problem_category}
                </span>
                <span
                  className={`${DIFFICULTY_COLORS[problem.difficulty]} font-bold`}
                >
                  {DIFFICULTY_LABELS[problem.difficulty] || problem.difficulty}
                </span>
                {problem.solved && (
                  <span className="text-green-500 font-semibold">Solved</span>
                )}
              </div>
              <div className="examples overflow-auto p-2 border-t border-t-gray-600">
                <h2 className="font-bold mb-2">Examples:</h2>
                {problem.examples && problem.examples.length > 0 ? (
                  problem.examples.map((ex, idx) => (
                    <div key={idx} className="mb-4">
                      <div>
                        <strong>Input:</strong> {ex.input}
                      </div>
                      <div>
                        <strong>Output:</strong> {ex.output}
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No examples provided.</p>
                )}
              </div>
            </>
          ) : (
            <div className="verdict_section flex flex-col gap-3">
              <h2 className="text-xl font-bold">Verdict</h2>
              {verdictError && (
                <div className="text-red-500">{verdictError}</div>
              )}
              {verdict ? (
                <>
                  <div className="font-semibold text-lg">
                    {verdict.result}
                    {allPassed && (
                      <span className="ml-2 text-green-400 font-bold">
                        &#10003; Correct!
                      </span>
                    )}
                  </div>
                  <div>
                    {verdict.details.map((tc, idx) => (
                      <div
                        key={idx}
                        className={`p-2 mb-2 rounded ${
                          tc.result === "Passed"
                            ? "bg-green-900/40 border-l-4 border-green-400"
                            : "bg-red-900/40 border-l-4 border-red-400"
                        }`}
                      >
                        <div>
                          <b>Input:</b> <span className="font-mono">{tc.input}</span>
                        </div>
                        <div>
                          <b>Expected:</b> <span className="font-mono">{tc.expected}</span>
                        </div>
                        <div>
                          <b>Your Output:</b> <span className="font-mono">{tc.output}</span>
                        </div>
                        <div>
                          <b>Result:</b>{" "}
                          <span
                            className={
                              tc.result === "Passed"
                                ? "text-green-400 font-bold"
                                : "text-red-400 font-bold"
                            }
                          >
                            {tc.result}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Improve with Gemini Button */}
                  <div className="mt-4">
                    <button
                      className="bg-[#12A8F9] text-white px-4 py-2 rounded font-bold"
                      onClick={handleGeminiImprove}
                      disabled={geminiLoading || !GEMINI_API_KEY}
                      title={
                        !GEMINI_API_KEY
                          ? "Gemini API key missing. Set VITE_GEMINI_API_KEY in your .env."
                          : undefined
                      }
                    >
                      {geminiLoading
                        ? "Improving..."
                        : "Improve with Gemini"}
                    </button>
                  </div>
                  {!GEMINI_API_KEY && (
                    <div className="text-yellow-400 mt-2">
                      Gemini API key missing. Please set <b>VITE_GEMINI_API_KEY</b> in your <b>.env</b> file and restart the dev server.
                    </div>
                  )}
                  {geminiError && (
                    <div className="text-red-500 mt-2">{geminiError}</div>
                  )}
                  {geminiReview && (
                    <div className="mt-4 bg-gray-900 p-3 rounded text-white">
                      <h3 className="font-bold mb-2">Gemini Suggestions:</h3>
                      <div style={{ whiteSpace: "pre-wrap" }}>{geminiReview}</div>
                    </div>
                  )}
                </>
              ) : (
                <div>Submit your code to see verdict.</div>
              )}
            </div>
          )}
        </div>

        {/* Right side: Code, input, output, and buttons */}
        <div className="h-full w-[50%] relative overflow-auto">
          <form>
            <div className="lang_select_codeInput h-[65vh] w-full ">
              <div className="lang_select flex justify-between items-center px-2 h-[40px] w-full">
                <h1 className="text-lg font-bold">Code :</h1>
                <select
                  className="bg-gray-700 text-white rounded px-2 py-1"
                  value={language}
                  onChange={e => setLanguage(e.target.value)}
                >
                  <option value="python">Python</option>
                  <option value="cpp">C++</option>
                  <option value="java">Java</option>
                </select>
              </div>
              <textarea
                className="bg-black resize-none overflow-auto focus:outline-none focus:ring-0 focus:border-black h-[56vh] rounded-[1%] w-full"
                value={code}
                onChange={e => setCode(e.target.value)}
              />
            </div>
            <div className="input_output h-[35vh] w-full ">
              <div className="input_div flex flex-col justify-between h-[55%] w-full">
                <h1 className="text-lg font-bold">Inputs:</h1>
                <textarea
                  className="bg-gray-400 rounded-[7px] focus:outline-none focus:ring-0 focus:border-gray-400 text-black resize-none overflow-auto w-full h-[30px]"
                  value={inputData}
                  onChange={e => setInputData(e.target.value)}
                />
                <div className="btn_div w-full h-[fit] flex gap-2">
                  <button
                    type="button"
                    className="h-[30px] w-[70px] text-[14px] font-bold bg-gray-800 rounded-2xl"
                    onClick={handleRun}
                    disabled={running}
                  >
                    {running ? "Running..." : "RUN"}
                  </button>
                  <button
                    type="button"
                    className="h-[30px] w-[70px] bg-[#894DB9] text-[14px] font-bold rounded-2xl"
                    onClick={handleSubmit}
                    disabled={submitting}
                  >
                    {submitting ? "Submitting..." : "SUBMIT"}
                  </button>
                </div>
              </div>
              <div className="output_div h-[55%] w-full">
                <h1 className="text-lg font-bold">Outputs:</h1>
                <textarea
                  className="bg-gray-400 rounded-[7px] mt-1 focus:outline-none focus:ring-0 focus:border-gray-400 text-black resize-none overflow-auto w-full h-[30px]"
                  value={output}
                  readOnly
                />
                {runError && <div className="text-red-500">{runError}</div>}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProblemScreen;
