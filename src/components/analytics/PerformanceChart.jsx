import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

function PerformanceChart({ data }) {
  const startValue = data[0]?.value || 0;
  const endValue = data[data.length - 1]?.value || 0;
  const change = endValue - startValue;
  const changePercent = ((change / startValue) * 100).toFixed(2);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Current Value</p>
          <p className="text-3xl font-bold">₹{endValue.toLocaleString()}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Change</p>
          <p
            className={`text-2xl font-bold ${
              change >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {change >= 0 ? "+" : ""}₹{change.toLocaleString()} ({changePercent}
            %)
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PerformanceChart;
