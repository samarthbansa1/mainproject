import React from "react";
import Navbar from "../components/Navbar";
import "@fontsource/cascadia-code";
import { IoCodeSlash } from "react-icons/io5";
import { FaRobot } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { IoNewspaperOutline } from "react-icons/io5";
const Landingpage = () => {
  return (
    <>
      {/* background image */}
      <img className="absolute right-12 -z-10 top-10" src="./backg.png" />
      {/* background blur div */}
      <div className=" w-[0rem] absolute -z-10 top-[50%] left-[-2%] shadow-[0_0_1200px_150px_#951ec0]"></div>

      <Navbar />

      <div className=" flex  h-[85vh] w-full">
        {/* image div */}
        <div className="imgdiv   w-[50%] h-full">
          <img src="./laptop.png" />
        </div>
        {/* text dive */}
        <div className="textdiv relative  w-[50%] h-[70%] flex flex-col justify-center text-white font-instrument text-5xl font-[1000] leading-snug">
          <h1>TEST YOUR CODE</h1>
          <div className="flex">
            <h1>GET INSTANT</h1>
            <img className="h-[55px]" src="./verdict.png" />
          </div>
          <h1>LEVEL UP YOUR SKILLS</h1>
          <div className=" absolute flex justify-center items-center bottom-0 w-full  h-[20%]">
            <div className="btnDiv bg-gradient-to-r from-purple-400 to-purple-600 w-[29%] p-[2px] rounded-lg">
              <div className="h-full w-full bg-[#110D14] font-[900] text-lg font-instrument rounded-lg py-1.5 px-4">
                <h1>
                  <a href="/signup">GET STARTED</a>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" h-[100vh] w-[100vw] relative">
        <div className="h-0 w-[40rem] absolute -z-10 top-[9%] left-[12%] rounded-2xl shadow-[0_0_100px_20px_#951ec0]"></div>
        <div className="h-0 w-[40rem] absolute -z-10 top-[9%] left-[30%] rounded-2xl shadow-[0_0_100px_20px_#12A8F9]"></div>

        <div className="w-full h-[17%] font-cascadia  text-white flex flex-col items-center justify-center text-[25px] ">
          <h1>Code Smarter , Not Harder</h1>
          <h1>with AlgoJudge</h1>
        </div>
        <div className="w-full flex justify-around items-center h-[83%] ">
          {/* Purple Gradient Card */}
          <div className="w-[30%] h-[80%] p-[2px] rounded-xl bg-gradient-to-br from-purple-500 via-purple-300 to-purple-900">
            <div className="w-full h-full rounded-xl bg-[#110D14] ">
              <div className="w-full h-[20%] flex justify-around items-center ">
                <h1 className="text-white font-cascadia font-bold text-2xl">
                  Custom Compiler{" "}
                </h1>
                <IoCodeSlash className="text-white text-3xl" />
              </div>
              <div className="w-full h-[80%]  flex justify-center items-center p-2">
                <h2 className="text-white  ">
                  Run your code instantly in a secure, isolated environment
                  tailored for multiple programming languages. The custom
                  compiler allows users to write, compile, and execute code
                  directly from the browser—no setup required. This feature
                  supports real-time feedback and error messages, making it easy
                  to test solutions before submission.
                </h2>
              </div>
            </div>
          </div>

          {/* Blue Gradient Card */}
          <div className="w-[30%] h-[80%] p-[2px] rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-900">
            <div className="w-full h-full rounded-xl bg-[#110D14] flex flex-col items-center justify-center">
              <div className="w-full h-[20%] flex justify-around items-center ">
                <h1 className="text-white font-cascadia font-bold text-2xl">
                  AI Support{" "}
                </h1>
                <FaRobot Slash className="text-white text-3xl" />
              </div>
              <div className="w-full h-[80%]  flex justify-center items-center p-2">
                <h2 className="text-white  ">
                  Get intelligent help as you code! The AI assistant provides
                  instant suggestions, debugging tips, and code explanations.
                  Whether you're stuck on a problem or want to optimize your
                  solution, the AI support feature acts as your personal coding
                  mentor, guiding you through logic errors and offering best
                  practices.
                </h2>
              </div>
            </div>
          </div>

          {/* Yellow Gradient Card */}
          <div className="w-[30%] h-[80%] p-[2px] rounded-xl bg-gradient-to-br from-yellow-400 via-yellow-200 to-yellow-600">
            <div className="w-full h-full rounded-xl bg-[#110D14] flex flex-col items-center justify-center">
              <div className="w-full h-[20%] flex justify-around items-center ">
                <h1 className="text-white font-cascadia font-bold text-2xl">
                  Leaderboard{" "}
                </h1>
                <MdLeaderboard className="text-white text-3xl" />
              </div>
              <div className="w-full h-[80%]  flex justify-center items-center p-2">
                <h2 className="text-white  ">
                  Track your progress and compete with others on the platform.
                  The leaderboard displays real-time rankings based on problems
                  solved. See how you stack up against peers, celebrate your
                  achievements, and stay motivated to climb higher with every
                  challenge you solve
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[100vh] w-[100vw] flex relative ">
        {/* colour div */}
        <div className="h-[200px] w-[10rem] absolute -z-10 top-[29%] left-[65%] rounded-2xl shadow-[0_0_1500px_30px_#951ec0]"></div>
        <div className="h-0 w-[0rem] absolute -z-10 top-[50%] left-[80%] rounded-2xl shadow-[0_0_1500px_120px_#12A8F9]"></div>
        {/* colour div end */}
        <div className="h-full w-[50%] flex flex-col justify-center items-center ">
          <div className="w-[80%] h-[60%] p-[2px] rounded-xl bg-gradient-to-br from-purple-500 via-purple-300 to-blue-900">
            <div className="w-full h-full p-2 rounded-xl bg-[#110D14] ">
              <div className="w-full h-[20%] flex flex-col   ">
                <h1 className="font-cascadia text-[#F055FE]">I Am</h1>
                <h1 className="font-kode-mono text-4xl font-bold text-[#ffffff]">
                  Samarth Bansal
                </h1>
                <h1 className="font-cascadia text-[#F055FE]">From</h1>
                <h1 className="font-kode-mono text-2xl font-bold text-[#ffffff]">
                  Delhi Technological University{" "}
                </h1>

                <h1 className="font-cascadia text-[#F055FE]">About me</h1>
                <p className=" text-amber-50 text-[15px]">
                  I’m an aspiring full-stack developer passionate about learning
                  and building impactful software. I adapt quickly to new
                  challenges and enjoy solving real-world problems through code.
                  My tech stack includes React.js, Tailwind CSS, Node.js,
                  Django, and REST APIs, along with MERN and SQL. I
                  love collaborating in teams and constantly expanding my
                  skills.
                </p>
              </div>
            </div>
          </div>
          <div className="w-[80%] h-[10%] flex justify-center items-center gap-9 ">
            {/* Purple Gradient Card */}
            <div className="w-[35px] h-[35px] p-[2px] rounded-[50%] bg-gradient-to-br from-purple-500 via-blue-400 to-red-500">
              <div className="w-full flex justify-center items-center h-full rounded-[50%] bg-[#110D14] ">
                <a
                  href="https://www.linkedin.com/in/bansal-samarth/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="text-white" />
                </a>
              </div>
            </div>
             <div className="w-[35px] h-[35px] p-[2px] rounded-[50%] bg-gradient-to-br from-purple-500 via-blue-400 to-red-500">
              <div className="w-full flex justify-center items-center h-full rounded-[50%] bg-[#110D14] ">
                <a
                  href="https://github.com/bansalsamarth1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub  className="text-white" />
                </a>
              </div>
            </div>
            <div className="w-[35px] h-[35px] p-[2px] rounded-[50%] bg-gradient-to-br from-purple-500 via-blue-400 to-red-500">
              <div className="w-full flex justify-center items-center h-full rounded-[50%] bg-[#110D14] ">
                <a
                  href="https://leetcode.com/u/youngsaturn/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiLeetcode   className="text-white" />
                </a>
              </div>
            </div>
            <div className="w-[35px] h-[35px] p-[2px] rounded-[50%] bg-gradient-to-br from-purple-500 via-blue-400 to-red-500">
              <div className="w-full flex justify-center items-center h-full rounded-[50%] bg-[#110D14] ">
                <a
                  href="https://drive.google.com/file/d/1TP6TrxtXYF519PwaQZwuht_5YlfQE1Sl/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IoNewspaperOutline    className="text-white" />
                </a>
              </div>
            </div>
            {/* socials links */}
          </div>
        </div>
        <div className="h-full flex justify-center items-center w-[50%] ">
          <img className="w-[300px] rounded-[50px]" src="profilepic.png" />
        </div>
      </div>
    </>
  );
};

export default Landingpage;
