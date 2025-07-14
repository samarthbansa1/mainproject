import React from 'react';
import GitHubCalendar from "react-github-calendar";

// Sample data - note the correct property names
const sampleData = [
  { date: "2025-07-01", count: 1, level: 1 },
  { date: "2025-07-02", count: 2, level: 2 },
  { date: "2025-07-03", count: 4, level: 3 },
  { date: "2025-07-05", count: 3, level: 2 },
  { date: "2025-07-07", count: 5, level: 4 },
  { date: "2025-06-28", count: 2, level: 2 },
  { date: "2025-06-29", count: 1, level: 1 },
  { date: "2025-07-06", count: 1, level: 1 },
  { date: "2025-07-08", count: 3, level: 2 },
  { date: "2025-07-09", count: 2, level: 2 },
  { date: "2025-07-10", count: 6, level: 4 },
  { date: "2025-07-11", count: 1, level: 1 },
  { date: "2025-07-12", count: 4, level: 3 },
  { date: "2025-07-13", count: 2, level: 2 },
  { date: "2025-07-14", count: 3, level: 2 },
];

const StreakComp = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <h2 className="text-white text-xl font-bold mb-4">Coding Activity</h2>
      <div className="w-full flex justify-center" style={{ minWidth: '800px' }}>
        <GitHubCalendar
          values={sampleData}
          until="2025-07-14"
          blockSize={15}
          blockMargin={4}
          fontSize={14}
          colorScheme="dark"
          theme={{
            dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
          }}
          showWeekdayLabels={true}
          showMonthLabels={true}
          labels={{
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            totalCount: '{{count}} contributions in {{year}}',
            legend: {
              less: 'Less',
              more: 'More'
            }
          }}
          transformData={(data) => {
            // Transform the data to match expected format
            return sampleData.map(item => ({
              ...item,
              date: item.date,
              count: item.count,
              level: item.level || Math.min(Math.floor(item.count / 2) + 1, 4)
            }));
          }}
        />
      </div>
    </div>
  );
};

export default StreakComp;