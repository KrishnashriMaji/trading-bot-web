import React from "react";
import Badge from "../common/Badge";
import Button from "../common/Button";

function BotCard({ bot, onStart, onStop, onDelete, onView }) {
  const getStatusVariant = (status) => {
    switch (status) {
      case "RUNNING":
        return "success";
      case "STOPPED":
        return "default";
      case "ERROR":
        return "danger";
      case "PAUSED":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold">{bot.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{bot.symbol?.symbol}</p>
        </div>
        <Badge variant={getStatusVariant(bot.status)}>{bot.status}</Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Total Trades</p>
          <p className="text-lg font-semibold">
            {bot.statistics?.totalTrades || 0}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Total P&L</p>
          <p
            className={`text-lg font-semibold ${
              bot.statistics?.totalPnL >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            ₹{bot.statistics?.totalPnL?.toFixed(2) || "0.00"}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Today's Trades</p>
          <p className="text-lg font-semibold">
            {bot.statistics?.todayTrades || 0}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Today's P&L</p>
          <p
            className={`text-lg font-semibold ${
              bot.statistics?.todayPnL >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            ₹{bot.statistics?.todayPnL?.toFixed(2) || "0.00"}
          </p>
        </div>
      </div>

      {/* Strategy Info */}
      <div className="mb-4 p-3 bg-gray-50 rounded">
        <p className="text-sm text-gray-600">Strategy</p>
        <p className="font-semibold">{bot.strategyId?.name || "N/A"}</p>
      </div>

      {/* Error Message */}
      {bot.status === "ERROR" && bot.errorMessage && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
          <p className="text-sm text-red-600">{bot.errorMessage}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        {bot.status === "RUNNING" ? (
          <Button
            variant="danger"
            onClick={() => onStop(bot._id)}
            className="flex-1"
          >
            Stop
          </Button>
        ) : (
          <Button
            variant="success"
            onClick={() => onStart(bot._id)}
            className="flex-1"
          >
            Start
          </Button>
        )}
        <Button variant="secondary" onClick={() => onView(bot._id)}>
          View
        </Button>
        <Button variant="danger" onClick={() => onDelete(bot._id)}>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default BotCard;
