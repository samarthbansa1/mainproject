import React from 'react'
import GitHubCalendar from "react-github-calendar";

const StreakComp = () => {
  return (
    <div className="bg-[110D14] p-4 rounded-lg text-white">
      <GitHubCalendar
        username="your-github-username"
        colorScheme="light"
        blockSize={14}
        blockMargin={4}
        fontSize={14}
        theme={{
          light: ["#e5e7eb", "#a7f3d0", "#6ee7b7", "#22d3ee", "#059669"], // custom green shades
        }}
      />
    </div>
  )
}

export default StreakComp
