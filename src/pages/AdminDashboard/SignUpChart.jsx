import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { GET_RECENT_SIGNUPS } from "@/api/apiDeclaration";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Filler);

const UserSignupChart = () => {
  const [labels, setLabels] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSignupData = async () => {
      try {
        let data = await GET_RECENT_SIGNUPS()
        setLabels(data.labels);
        setDataPoints(data.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load signup data", err);
        setLoading(false);
      }
    };

    fetchSignupData();
  }, []);

  if (loading) return <p className="text-center">Loading chart...</p>;

  const chartData = {
    labels,
    datasets: [
      {
        label: "User Signups",
        data: dataPoints,
        fill: true,
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        tension: 0.4,
        pointBackgroundColor: "#4f46e5",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">Daily Signups</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default UserSignupChart;
