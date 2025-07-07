import React, { useEffect, useState } from "react";
import ProfileNavbar from "../components/ProfileNavbar";
import LeaderboardCatgories from "../components/LeaderboardCatgories";
import api from "../api";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await api.get("/api/auth/leaderboard/");
        setLeaderboard(res.data);
      } catch (err) {
        setLeaderboard([]);
      }
      setLoading(false);
    };
    fetchLeaderboard();
  }, []);

  if (loading) return <div className="text-white p-4">Loading...</div>;

  const topUser = leaderboard[0];
  const restUsers = leaderboard.slice(1);

  return (
    <>
      <ProfileNavbar />
      <div className="h-[85vh] border-t-1 border-amber-50 w-full flex ">
        {/* Top User Card */}
        <div className="w-[35%] border-r-1 border-amber-50 h-full flex justify-center items-center">
          <div className="h-[80%] w-[80%] border-1 flex items-center flex-col border-amber-50 rounded-[5px] text-white">
            <div className="border-b-1 w-full border-amber-50 h-[57%] flex flex-col items-center justify-around">
              <h1 className="font-[1000] text-xl">Top 1</h1>
              <img className="w-[200px] rounded-[50%]" src="./Profilepic.jpg" alt="profile" />
            </div>
            <h1 className="font-[1000] my-2 text-2xl">
              {topUser ? topUser.username : "N/A"}
            </h1>
            <h1 className="font-[1000] my-2 text-2xl">
              {topUser ? (topUser.college_name || "No College") : ""}
            </h1>
            <h2 className="font-bold text-lg">
              {topUser ? `Solved: ${topUser.solved_questions_count}` : ""}
            </h2>
          </div>
        </div>
        {/* Rest of the Leaderboard */}
        <div className="w-[65%] py-4 overflow-auto h-full flex flex-col items-center gap-4">
          {restUsers.length === 0 ? (
            <div className="text-white">No more users in leaderboard.</div>
          ) : (
            restUsers.map((user, idx) => (
              <LeaderboardCatgories
                key={user.username}
                rank={idx + 2} // +2 because top user is 1
                username={user.username}
                college={user.college_name}
                solved={user.solved_questions_count}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
