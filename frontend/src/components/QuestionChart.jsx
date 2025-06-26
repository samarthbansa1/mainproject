import React from 'react'
import { VictoryPie, VictoryTheme } from "victory";


const QuestionChart = () => {
    
  return (
   <VictoryPie
  innerRadius={120}
  data={[
    { x: "Easy", y: 80 },
    { x: "Medium", y: 30 },
    { x: "Hard", y: 20 },
  ]}
  colorScale={["#1CBABA", "#facc15", "#ef4444"]}
  labels={({ datum }) => `${datum.x}: ${datum.y}`}
  style={{
    labels: { fill: "#fff", fontSize: 28, fontWeight: "bold" }
  }}
/>

  )
}

export default QuestionChart
