import React from "react";

function StatsCard({ title, value, subtitle, icon, trend }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
        {icon && <div className="text-4xl">{icon}</div>}
      </div>
      {trend && (
        <div
          className={`mt-4 text-sm ${
            trend >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}% from last month
        </div>
      )}
    </div>
  );
}

export default StatsCard;
