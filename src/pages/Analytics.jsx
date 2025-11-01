import React, { useState, useEffect } from "react";
import Card from "../components/common/Card";
import PerformanceChart from "../components/analytics/PerformanceChart";
import WinLossChart from "../components/analytics/WinLossChart";
import MonthlyPnLChart from "../components/analytics/MonthlyPnLChart";
// import TradeDistribution from "../components/analytics/TradeDistribution";
import Loading from "../components/common/Loading";

function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30d");

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = async () => {
    try {
      // API call will go here
      // Mock data
      setData({
        performance: generateMockPerformance(),
        winLoss: { wins: 65, losses: 35 },
        monthly: generateMockMonthly(),
        distribution: generateMockDistribution(),
      });
    } catch (error) {
      console.error("Error loading analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateMockPerformance = () => {
    const data = [];
    let value = 100000;
    for (let i = 0; i < 30; i++) {
      value += (Math.random() - 0.45) * 1000;
      data.push({
        date: new Date(
          Date.now() - (29 - i) * 24 * 60 * 60 * 1000
        ).toLocaleDateString(),
        value: value,
      });
    }
    return data;
  };

  const generateMockMonthly = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    return months.map((month) => ({
      month,
      pnl: (Math.random() - 0.3) * 10000,
    }));
  };

  const generateMockDistribution = () => {
    return [
      { range: "0-500", count: 15 },
      { range: "500-1000", count: 25 },
      { range: "1000-2000", count: 20 },
      { range: "2000+", count: 10 },
    ];
  };

  if (loading) return <Loading text="Loading analytics..." />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Analytics & Insights</h1>

        {/* Time Range Selector */}
        <div className="flex gap-2">
          {["7d", "30d", "90d", "1y", "all"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                timeRange === range
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {range.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Performance Chart */}
      <Card title="Portfolio Performance" className="mb-6">
        <PerformanceChart data={data.performance} />
      </Card>

      {/* Grid of Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card title="Win/Loss Ratio">
          <WinLossChart data={data.winLoss} />
        </Card>

        <Card title="Monthly P&L">
          <MonthlyPnLChart data={data.monthly} />
        </Card>
      </div>

      {/* Trade Distribution */}
      <Card title="Trade Distribution by P&L">
        {/* <TradeDistribution data={data.distribution} /> */}
      </Card>
    </div>
  );
}

export default Analytics;
