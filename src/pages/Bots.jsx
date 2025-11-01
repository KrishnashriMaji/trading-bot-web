import React, { useState, useEffect } from "react";
import { botService } from "../services/botService";
import BotCard from "../components/bot/BotCard";
import BotForm from "../components/bot/BotForm";
import Modal from "../components/common/Modal";
import Loading from "../components/common/Loading";
import EmptyState from "../components/common/EmptyState";

function Bots() {
  const [bots, setBots] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadBots();
  }, []);

  const loadBots = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await botService.getBots();
      setBots(data);
    } catch (error) {
      console.error("Error loading bots:", error);
      setError(error.message || "Failed to load bots");

      // Use mock data for development/testing when API fails
      if (process.env.NODE_ENV === "development") {
        setBots(getMockBots());
      }
    } finally {
      setLoading(false);
    }
  };

  const getMockBots = () => [
    {
      _id: "1",
      name: "RSI Scalper Bot",
      status: "RUNNING",
      symbol: { symbol: "NIFTY", exchange: "NSE" },
      strategyId: { name: "RSI Strategy", _id: "strategy1" },
      statistics: {
        totalTrades: 45,
        totalPnL: 12500.5,
        todayTrades: 5,
        todayPnL: 850.25,
      },
      lastRunAt: new Date().toISOString(),
    },
    {
      _id: "2",
      name: "EMA Crossover",
      status: "STOPPED",
      symbol: { symbol: "BANKNIFTY", exchange: "NSE" },
      strategyId: { name: "Moving Average", _id: "strategy2" },
      statistics: {
        totalTrades: 32,
        totalPnL: -2500.25,
        todayTrades: 0,
        todayPnL: 0,
      },
      lastRunAt: new Date().toISOString(),
    },
    {
      _id: "3",
      name: "Breakout Strategy",
      status: "ERROR",
      symbol: { symbol: "RELIANCE", exchange: "NSE" },
      strategyId: { name: "Breakout", _id: "strategy3" },
      statistics: {
        totalTrades: 18,
        totalPnL: 3200.75,
        todayTrades: 2,
        todayPnL: 150.0,
      },
      errorMessage: "Broker connection failed",
      lastRunAt: new Date().toISOString(),
    },
  ];

  const handleCreateBot = async (botData) => {
    try {
      await botService.createBot(botData);
      setShowCreateForm(false);
      await loadBots();
      alert("✅ Bot created successfully!");
    } catch (error) {
      console.error("Error creating bot:", error);
      alert("❌ Failed to create bot: " + (error.message || "Unknown error"));
    }
  };

  const handleStart = async (id) => {
    try {
      await botService.startBot(id);
      await loadBots();
      alert("✅ Bot started successfully!");
    } catch (error) {
      console.error("Error starting bot:", error);
      alert("❌ Failed to start bot: " + (error.message || "Unknown error"));
    }
  };

  const handleStop = async (id) => {
    try {
      await botService.stopBot(id);
      await loadBots();
      alert("✅ Bot stopped successfully!");
    } catch (error) {
      console.error("Error stopping bot:", error);
      alert("❌ Failed to stop bot: " + (error.message || "Unknown error"));
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "⚠️ Are you sure you want to delete this bot? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      await botService.deleteBot(id);
      await loadBots();
      alert("✅ Bot deleted successfully!");
    } catch (error) {
      console.error("Error deleting bot:", error);
      alert("❌ Failed to delete bot: " + (error.message || "Unknown error"));
    }
  };

  const handleView = (id) => {
    // Navigate to bot details page
    console.log("View bot:", id);
    alert("Bot details view coming soon!");
    // You can implement navigation here: navigate(`/bots/${id}`)
  };

  if (loading) {
    return <Loading text="Loading bots..." />;
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">My Trading Bots</h1>
          <p className="text-gray-600 mt-1">
            Manage and monitor your automated trading bots
          </p>
          {error && (
            <p className="text-orange-500 text-sm mt-2">
              ⚠️ {error} (Showing mock data for development)
            </p>
          )}
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-xl"
        >
          + Create New Bot
        </button>
      </div>

      {/* Bots Grid */}
      {bots.length === 0 ? (
        <EmptyState
          title="No bots created yet"
          message="Create your first trading bot to start automated trading"
          actionLabel="Create Your First Bot"
          onAction={() => setShowCreateForm(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bots.map((bot) => (
            <BotCard
              key={bot._id}
              bot={bot}
              onStart={handleStart}
              onStop={handleStop}
              onDelete={handleDelete}
              onView={handleView}
            />
          ))}
        </div>
      )}

      {/* Create Bot Modal */}
      <Modal
        isOpen={showCreateForm}
        title="Create New Trading Bot"
        onClose={() => setShowCreateForm(false)}
        size="lg"
      >
        <BotForm
          onSubmit={handleCreateBot}
          onCancel={() => setShowCreateForm(false)}
        />
      </Modal>
    </div>
  );
}

export default Bots;
