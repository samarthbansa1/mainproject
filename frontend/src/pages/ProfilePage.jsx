import React, { useEffect, useState } from "react";
import ProfileNavbar from "../components/ProfileNavbar";
import { useNavigate } from "react-router-dom";
import { SiTicktick } from "react-icons/si";
import QuestionChart from "../components/QuestionChart";
import CalendarComp from "../components/CalendarComp";
import StreakComp from "../components/StreakComp";
import api from "../api";
import LogoutButton from "../components/LogoutButton";

const ProfilePage = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [allProblems, setAllProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [calendarDate, setCalendarDate] = useState(new Date());


  useEffect(() => {
    const fetchProfileAndProblems = async () => {
      try {
        // Fetch profile (gets solved_problem_ids)
        const profileRes = await api.get("/api/auth/profile/");
        setProfile(profileRes.data);

        // Fetch all problems
        const problemsRes = await api.get("/api/auth/problems/");
        setAllProblems(problemsRes.data.problems);

        // Map solved IDs to problem objects
        const solvedIds = profileRes.data.solved_problem_ids || [];
        const solved = problemsRes.data.problems.filter(p =>
          solvedIds.includes(p.id)
        );
        setSolvedProblems(solved);
      } catch (err) {
        setError("Failed to fetch user profile or problems. Please login again.");
        navigate("/signin");
      } finally {
        setLoading(false);
      }
    };
    fetchProfileAndProblems();
  }, [navigate]);

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <>
      <ProfileNavbar />
      <div className="h-[85vh] flex border-t border-t-gray-300">
        <div className="h-full w-[30%] border-r border-r-gray-300 ">
          <div className="profile_pic w-full h-[50%] flex flex-col justify-center items-center">
            <img className="w-[200px] rounded-[50%]" src="./Profilepic.jpg" />
            <h1 className="text-white font-[900] text-2xl font-instrument">
              {profile?.username}
            </h1>
            <h1 className="text-white font-[700] text-xl font-instrument">
              {profile?.college_name}
            </h1>
          </div>
          <div className="past_submission border-t border-t-gray-300 w-full h-[50%] ">
            <div className="w-full h-[20%] flex justify-center items-center">
              <h1 className="text-white font-[900] text-md">
                PAST SUBMISSIONS :
              </h1>
            </div>
            <div className="problemsdiv w-full h-[80%] overflow-auto flex flex-col gap-2">
              {solvedProblems.length === 0 ? (
                <div className="text-gray-400 px-4">No solved problems yet.</div>
              ) : (
                solvedProblems.map(problem => (
                  <div key={problem.id} className="flex items-center gap-2 bg-gray-800 rounded px-3 py-2">
                    <SiTicktick size={20} color="#32CD32" />
                    <h2 className="text-white text-base">
                      {problem.problem_statement
                        .split(' ')
                        .slice(0, 5)
                        .join(' ')
                      }
                      {problem.problem_statement.split(' ').length > 5 ? '...' : ''}
                    </h2>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="h-full w-[70%] overflow-auto p-2 flex flex-wrap">
          <div className="h-[50%] w-1/2 border-1 rounded-md border-amber-50">
            <QuestionChart difficultyCategory={profile?.difficulty_category} />
          </div>
          <div className="h-[50%] w-1/2 border-1 rounded-md border-amber-50 overflow-auto">
            <CalendarComp value={calendarDate} onChange={setCalendarDate} />
          </div>
          <div className="h-[50%] border-2 border-amber-50 overflow-auto w-full ">
            <StreakComp />
          </div>
          <LogoutButton />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
