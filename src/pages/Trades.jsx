import React, { useState, useEffect } from "react";
import { tradeService } from "../services/tradeService";
import TradeTable from "../components/trade/TradeTable";
import TradeStats from "../components/trade/TradeStats";
import Loading from "../components/common/Loading";
import Card from "../components/common/Card";

function Trades() {
  const [trades, setTrades] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    status: "",
    botId: "",
  });

  useEffect(() => {
    loadData();
  }, [filter]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [tradesData, statsData] = await Promise.all([
        tradeService.getTrades(filter),
        tradeService.getStats(),
      ]);
      setTrades(tradesData.trades);
      setStats(statsData);
    } catch (error) {
      console.error("Error loading trades:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading text="Loading trades..." />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Trade History</h1>

      {/* Statistics */}
      {stats && (
        <div className="mb-6">
          <TradeStats stats={stats} />
        </div>
      )}

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex gap-4">
          <select
            value={filter.status}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, status: e.target.value }))
            }
            className="px-4 py-2 border rounded-lg"
          >
            <option value="">All Status</option>
            <option value="OPEN">Open</option>
            <option value="CLOSED">Closed</option>
          </select>

          <button
            onClick={loadData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>
      </Card>

      {/* Trades Table */}
      <Card>
        {trades.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No trades found</p>
        ) : (
          <TradeTable trades={trades} />
        )}
      </Card>
    </div>
  );
}

export default Trades;
