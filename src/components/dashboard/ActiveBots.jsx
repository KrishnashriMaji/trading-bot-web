import React from "react";
import { Link } from "react-router-dom";
import Badge from "../common/Badge";

function ActiveBots({ bots }) {
  const activeBots = bots.filter((bot) => bot.status === "RUNNING");

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Active Bots</h3>
        <Link to="/bots" className="text-blue-600 hover:underline text-sm">
          View All
        </Link>
      </div>

      {activeBots.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No active bots</p>
      ) : (
        <div className="space-y-3">
          {activeBots.map((bot) => (
            <div
              key={bot._id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-semibold">{bot.name}</p>
                <p className="text-sm text-gray-600">{bot.symbol?.symbol}</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Today</p>
                  <p
                    className={`font-semibold ${
                      bot.statistics?.todayPnL >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    ₹{bot.statistics?.todayPnL?.toFixed(2) || "0.00"}
                  </p>
                </div>
                <Badge variant="success">Running</Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ActiveBots;
