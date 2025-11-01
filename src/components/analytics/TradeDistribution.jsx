import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

function TradeDistribution({ data }) {
  // data format: [{ range: "0-500", count: 15 }, ...]

  const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  const totalTrades = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <div>
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {data.map((item, index) => {
          const percentage = ((item.count / totalTrades) * 100).toFixed(1);
          return (
            <div key={index} className="text-center">
              <p className="text-sm text-gray-600 mb-1">₹{item.range}</p>
              <p
                className="text-2xl font-bold"
                style={{ color: colors[index % colors.length] }}
              >
                {item.count}
              </p>
              <p className="text-xs text-gray-500">{percentage}% of trades</p>
            </div>
          );
        })}
      </div>

      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="range"
            stroke="#6b7280"
            label={{
              value: "P&L Range (₹)",
              position: "insideBottom",
              offset: -5,
            }}
          />
          <YAxis
            stroke="#6b7280"
            label={{
              value: "Number of Trades",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip
            formatter={(value) => [`${value} trades`, "Count"]}
            labelFormatter={(label) => `P&L Range: ₹${label}`}
          />
          <Bar dataKey="count" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Additional Info */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-600">Total Trades</p>
            <p className="text-xl font-bold text-gray-800">{totalTrades}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Most Common Range</p>
            <p className="text-xl font-bold text-blue-600">
              ₹
              {
                data.reduce(
                  (max, item) => (item.count > max.count ? item : max),
                  data[0]
                ).range
              }
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Average per Range</p>
            <p className="text-xl font-bold text-gray-800">
              {(totalTrades / data.length).toFixed(1)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TradeDistribution;
