import React, { useState, useEffect } from "react";
import { botService } from "../services/botService";
import { tradeService } from "../services/tradeService";
import { useWebSocket } from "../hooks/useWebSocket";
import StatsCard from "../components/dashboard/StatsCard";
import ActiveBots from "../components/dashboard/ActiveBots";
import RecentTrades from "../components/dashboard/RecentTrades";

function Dashboard() {
  const [bots, setBots] = useState([]);
  const [stats, setStats] = useState(null);
  const [recentTrades, setRecentTrades] = useState([]);
  const [loading, setLoading] = useState(true);

  const { isConnected, subscribe } = useWebSocket();

  useEffect(() => {
    loadData();

    // Subscribe to WebSocket events
    const unsubscribePosition = subscribe(
      "position_opened",
      handlePositionOpened
    );
    const unsubscribeClosed = subscribe(
      "position_closed",
      handlePositionClosed
    );
    const unsubscribeBotStatus = subscribe(
      "bot_status_changed",
      handleBotStatusChanged
    );
    const unsubscribeStats = subscribe("stats_updated", handleStatsUpdated);

    // Cleanup subscriptions
    return () => {
      unsubscribePosition();
      unsubscribeClosed();
      unsubscribeBotStatus();
      unsubscribeStats();
    };
  }, []);

  const loadData = async () => {
    try {
      const [botsData, statsData, tradesData] = await Promise.all([
        botService.getBots(),
        tradeService.getStats(),
        tradeService.getTrades({ limit: 10 }),
      ]);
      setBots(botsData);
      setStats(statsData);
      setRecentTrades(tradesData.trades);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  // WebSocket event handlers
  const handlePositionOpened = (data) => {
    console.log("Position opened:", data);

    // Show notification
    showNotification(
      "Position Opened",
      `${data.data.symbol} @ ₹${data.data.entryPrice}`,
      "success"
    );

    // Reload data
    loadData();
  };

  const handlePositionClosed = (data) => {
    console.log("Position closed:", data);

    const pnl = data.data.pnl;
    const message = `${data.data.symbol} - ${
      data.data.reason
    }\nP&L: ₹${pnl.toFixed(2)}`;

    // Show notification
    showNotification(
      "Position Closed",
      message,
      pnl >= 0 ? "success" : "error"
    );

    // Reload data
    loadData();
  };

  const handleBotStatusChanged = (data) => {
    console.log("Bot status changed:", data);

    // Update bot in state
    setBots((prevBots) =>
      prevBots.map((bot) =>
        bot._id === data.data.botId ? { ...bot, status: data.data.status } : bot
      )
    );
  };

  const handleStatsUpdated = (data) => {
    console.log("Stats updated:", data);
    setStats(data.data);
  };

  const showNotification = (title, message, type) => {
    // You can use a toast library here
    // For now, using browser notification
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, {
        body: message,
        icon: "/logo.png",
      });
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      {/* WebSocket Status Indicator */}
      <div className="mb-4 flex items-center gap-2">
        <div
          className={`w-3 h-3 rounded-full ${
            isConnected ? "bg-green-500" : "bg-red-500"
          }`}
        />
        <span className="text-sm text-gray-600">
          {isConnected
            ? "Connected - Real-time updates active"
            : "Disconnected - Reconnecting..."}
        </span>
      </div>

      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Total P&L"
          value={`₹${stats?.totalPnL?.toFixed(2) || "0.00"}`}
          icon="💰"
        />
        <StatsCard
          title="Total Trades"
          value={stats?.totalTrades || 0}
          icon="📊"
        />
        <StatsCard
          title="Win Rate"
          value={`${stats?.winRate || 0}%`}
          icon="🎯"
        />
        <StatsCard
          title="Active Bots"
          value={bots.filter((b) => b.status === "RUNNING").length}
          icon="🤖"
        />
      </div>

      {/* Active Bots & Recent Trades */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActiveBots bots={bots} />
        <RecentTrades trades={recentTrades} />
      </div>
    </div>
  );
}

export default Dashboard;
