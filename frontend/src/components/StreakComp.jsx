import React from 'react';
import GitHubCalendar from "react-github-calendar";
import { ActivityCalendar } from 'react-activity-calendar'




// Sample data - note the correct property names
const data = [
  {
    date: '2024-06-23',
    count: 2,
    level: 1,
  },
  {
    date: '2024-01-23',
    count: 2,
    level: 1,
  },
  {
    date: '2024-08-02',
    count: 16,
    level: 4,
  },
  {
    date: '2024-11-29',
    count: 11,
    level: 3,
  },
  {
    date: '2024-07-10',
    count: 5,
    level: 2,
  },
  {
    date: '2024-09-15',
    count: 8,
    level: 3,
  },
  {
    date: '2024-10-05',
    count: 1,
    level: 1,
  },
  {
    date: '2024-12-20',
    count: 20,
    level: 4,
  },
  {
    date: '2024-12-31',
    count: 3,
    level: 2,
  },
];


const StreakComp = () => {
  
  return (
    
<>
   <div className='flex justify-center items-center text-amber-50'>
    
    

<ActivityCalendar data={data} theme={{ light: ['#eee', 'violet'] }}
 />

   </div>

</>
  );
};

export default StreakComp;