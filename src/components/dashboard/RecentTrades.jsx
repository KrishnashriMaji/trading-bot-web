import React from "react";
import { format } from "date-fns";
import Badge from "../common/Badge";

function RecentTrades({ trades }) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b">
        <h3 className="text-lg font-semibold">Recent Trades</h3>
      </div>
      <div className="p-6">
        {trades.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No trades yet</p>
        ) : (
          <div className="space-y-4">
            {trades.map((trade) => (
              <div
                key={trade._id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">{trade.symbol}</span>
                    <Badge
                      variant={trade.side === "BUY" ? "success" : "danger"}
                    >
                      {trade.side}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {format(new Date(trade.entryTime), "MMM dd, yyyy HH:mm")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₹{trade.entryPrice}</p>
                  {trade.exitPrice && (
                    <p
                      className={`text-sm ${
                        trade.pnl >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {trade.pnl >= 0 ? "+" : ""}₹{trade.pnl?.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RecentTrades;
