import React from 'react';
import { VictoryPie } from "victory";

const QuestionChart = ({ difficultyCategory }) => {
  const easy = difficultyCategory?.easy || 0;
  const medium = difficultyCategory?.medium || 0;
  const hard = difficultyCategory?.hard || 0;

  const total = easy + medium + hard;

  // Prepare data, but filter out zero values
  const data = [
    { x: "Easy", y: easy },
    { x: "Medium", y: medium },
    { x: "Hard", y: hard },
  ].filter(item => item.y > 0);

  if (total === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <span className="text-gray-400 text-lg font-semibold">
          No problem solved
        </span>
      </div>
    );
  }

  return (
    <VictoryPie
      innerRadius={120}
      data={data}
      colorScale={["#1CBABA", "#facc15", "#ef4444"].slice(0, data.length)}
      labels={({ datum }) => `${datum.x}: ${datum.y}`}
      style={{
        labels: { fill: "#fff", fontSize: 24, fontWeight: "bold" }
      }}
    />
  );
};

export default QuestionChart;
