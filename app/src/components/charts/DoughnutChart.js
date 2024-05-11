// DoughnutChart.js
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ data }) => {
  const chartData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        label: "Completion %",
        data: data.map((d) => d.value),
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#cc65fe",
          "#ffce56",
          "#c9cbcf",
          "#62d9a1",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return <Doughnut data={chartData} />;
};

export default DoughnutChart;
