import React from 'react';
import GitHubCalendar from "react-github-calendar";

const sampleData = [
  { date: "2025-07-01", count: 1 },
  { date: "2025-07-02", count: 2 },
  { date: "2025-07-03", count: 4 },
  { date: "2025-07-05", count: 3 },
  { date: "2025-07-07", count: 5 },
  { date: "2025-06-28", count: 2 },
  { date: "2025-06-29", count: 1 },
  { date: "2025-07-06", count: 1 },
];

const StreakComp = () => (
  <div>
    <GitHubCalendar
      values={sampleData}
      blockSize={14}
      blockMargin={4}
      fontSize={14}
      colorScheme="light"
      theme={{
        light: ["#e5e7eb", "#a7f3d0", "#6ee7b7", "#22d3ee", "#059669"],
      }}
    />
  </div>
);

export default StreakComp;
