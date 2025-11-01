import React from "react";

function BotStatus({ status, lastRunAt, errorMessage }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "RUNNING":
        return "text-green-600";
      case "STOPPED":
        return "text-gray-600";
      case "ERROR":
        return "text-red-600";
      case "PAUSED":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "RUNNING":
        return "🟢";
      case "STOPPED":
        return "⚫";
      case "ERROR":
        return "🔴";
      case "PAUSED":
        return "🟡";
      default:
        return "⚫";
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-2xl">{getStatusIcon(status)}</span>
      <div>
        <p className={`font-semibold ${getStatusColor(status)}`}>{status}</p>
        {lastRunAt && (
          <p className="text-xs text-gray-500">
            Last run: {new Date(lastRunAt).toLocaleString()}
          </p>
        )}
        {errorMessage && (
          <p className="text-xs text-red-600 mt-1">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}

export default BotStatus;
