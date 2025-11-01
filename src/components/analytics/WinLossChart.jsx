import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

function WinLossChart({ data }) {
  const chartData = [
    { name: "Wins", value: data.wins, color: "#10b981" },
    { name: "Losses", value: data.losses, color: "#ef4444" },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-1">Wins</p>
          <p className="text-3xl font-bold text-green-600">{data.wins}%</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-1">Losses</p>
          <p className="text-3xl font-bold text-red-600">{data.losses}%</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WinLossChart;
