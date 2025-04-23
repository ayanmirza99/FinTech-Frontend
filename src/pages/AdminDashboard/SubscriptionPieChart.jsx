// components/SubscriptionPieCharts.tsx
"use client";

import { GET_SUBSCRIPTION_DISTRIBUTION } from "@/api/apiDeclaration";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#4CAF50", "#FF7043", "#2196F3", "#FFEB3B"]; // Green, Red, Blue & Yellow colors

export default function SubscriptionPieCharts() {
  const [activeInactiveData, setActiveInactiveData] = useState([]);
  const [monthYearData, setMonthYearData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await GET_SUBSCRIPTION_DISTRIBUTION();

      // Format data for Active/Inactive Pie Chart
      const activeInactive = res.statusLabels.map((label, i) => ({
        name: label,
        value: res.statusData[i],
      }));
      setActiveInactiveData(activeInactive);

      // Format data for Monthly/Yearly Pie Chart
      const monthYear = res.durationLabels.map((label, i) => ({
        name: label,
        value: res.durationData[i],
      }));
      setMonthYearData(monthYear);
    };

    fetchData();
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Active vs Inactive Pie Chart */}
      <div className="w-full h-96 p-4 bg-white rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Active vs Inactive Subscriptions
        </h2>
        <ResponsiveContainer width="100%" height="110%">
          <PieChart>
            <Pie
              data={activeInactiveData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
            >
              {activeInactiveData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[(index % COLORS.length) + 1]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly vs Yearly Pie Chart */}
      <div className="w-full h-96 p-4 bg-white rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Monthly vs Yearly Subscriptions
        </h2>
        <ResponsiveContainer width="110%" height="110%">
          <PieChart>
            <Pie
              data={monthYearData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
            >
              {monthYearData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
