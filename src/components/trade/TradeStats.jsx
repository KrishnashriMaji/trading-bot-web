import React from "react";

function TradeStats({ stats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-sm text-gray-600">Total Trades</p>
        <p className="text-2xl font-bold">{stats.totalTrades}</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-sm text-gray-600">Wins</p>
        <p className="text-2xl font-bold text-green-600">{stats.wins}</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-sm text-gray-600">Losses</p>
        <p className="text-2xl font-bold text-red-600">{stats.losses}</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-sm text-gray-600">Win Rate</p>
        <p className="text-2xl font-bold">{stats.winRate}%</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-sm text-gray-600">Total P&L</p>
        <p
          className={`text-2xl font-bold ${
            stats.totalPnL >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          ₹{stats.totalPnL?.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default TradeStats;
