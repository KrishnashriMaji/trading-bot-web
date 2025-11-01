import React from "react";
import Badge from "../common/Badge";
import Button from "../common/Button";
import { format } from "date-fns";

function BrokerCard({ broker, onTest, onRemove }) {
  const getBrokerIcon = (name) => {
    switch (name.toLowerCase()) {
      case "angel one":
      case "angelone":
        return "😇";
      case "zerodha":
        return "🦓";
      case "upstox":
        return "📈";
      default:
        return "🏦";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-4xl">{getBrokerIcon(broker.name)}</div>
          <div>
            <h3 className="text-lg font-bold">{broker.name}</h3>
            {broker.lastConnected && (
              <p className="text-xs text-gray-500">
                Last: {format(new Date(broker.lastConnected), "MMM dd, HH:mm")}
              </p>
            )}
          </div>
        </div>
        <Badge variant={broker.isConnected ? "success" : "danger"}>
          {broker.isConnected ? "Connected" : "Disconnected"}
        </Badge>
      </div>

      <div className="space-y-2 mb-4 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Status:</span>
          <span className="font-semibold">
            {broker.isConnected ? "✅ Active" : "❌ Inactive"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">API Cost:</span>
          <span className="font-semibold">
            {broker.name === "Angel One" ? "FREE" : "₹2,000/mo"}
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          size="sm"
          variant="secondary"
          onClick={onTest}
          className="flex-1"
        >
          Test Connection
        </Button>
        <Button size="sm" variant="danger" onClick={onRemove}>
          Remove
        </Button>
      </div>
    </div>
  );
}

export default BrokerCard;
