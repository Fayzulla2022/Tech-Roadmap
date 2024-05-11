import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { usePersistStore } from "../../store";
import ROADMAPS from "../../utils/roadmaps.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function PieChart() {
  const { user } = usePersistStore((s) => s);
  let [data, setData] = useState({
    labels: ["Enrollment", "Remaining"],
    datasets: [
      {
        data: [
          user?.roadmaps?.length || 0,
          ROADMAPS.length - user?.roadmaps?.length,
        ],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
      },
    ],
  });

  useEffect(() => {
    setData({
      labels: ["Enrollment", "Remaining"],
      datasets: [
        {
          data: [
            user?.roadmaps?.length || 0,
            ROADMAPS.length - user?.roadmaps?.length,
          ],
          backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
          hoverOffset: 4,
        },
      ],
    });
  }, [user]);

  return <Pie data={data} options={{ responsive: true }} />;
}

export default PieChart;
