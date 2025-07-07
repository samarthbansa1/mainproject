import React from 'react';

const LeaderboardCatgories = ({ rank, username, college, solved }) => {
  return (
    <div className="h-[23%] w-[90%] flex items-center border-1 border-amber-50 rounded-2xl">
      <div className="h-full w-[35%] flex justify-around items-center ">
        <h1 className="font-[1000] text-white text-2xl">{rank}</h1>
        <img className="w-[120px]" src="./Profilepic.jpg" alt="profile" />
      </div>
      <div className="h-full w-fit flex flex-col justify-center mx-3">
        <h1 className="font-[1000] text-white text-xl">{username}</h1>
        <h1 className="font-[1000] text-white text-xl">{college || "No College"}</h1>
        <h2 className="font-bold text-lg text-white">Solved: {solved}</h2>
      </div>
    </div>
  );
};

export default LeaderboardCatgories;
