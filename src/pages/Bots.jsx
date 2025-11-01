import React, { useState, useEffect } from "react";
import { botService } from "../services/botService";

function Bots() {
  const [bots, setBots] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    loadBots();
  }, []);

  const loadBots = async () => {
    try {
      const data = await botService.getBots();
      setBots(data);
    } catch (error) {
      console.error("Error loading bots:", error);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Bots</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Create Bot
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bots.map((bot) => (
          <div key={bot._id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">{bot.name}</h3>
              <span
                className={`px-3 py-1 rounded-full text-xs ${
                  bot.status === "RUNNING"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {bot.status}
              </span>
            </div>

            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <p>Symbol: {bot.symbol?.symbol}</p>
              <p>Strategy: {bot.strategyId?.name}</p>
              <p>Total Trades: {bot.statistics?.totalTrades || 0}</p>
              <p
                className={
                  bot.statistics?.totalPnL >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                Total P&L: ₹{bot.statistics?.totalPnL?.toFixed(2) || "0.00"}
              </p>
            </div>

            <div className="flex gap-2">
              {bot.status === "RUNNING" ? (
                <button
                  onClick={() => handleStop(bot._id)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Stop
                </button>
              ) : (
                <button
                  onClick={() => handleStart(bot._id)}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Start
                </button>
              )}

              <button
                onClick={() => handleDelete(bot._id)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {bots.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-xl mb-4">No bots created yet</p>
          <p>Create your first trading bot to get started!</p>
        </div>
      )}
    </div>
  );

  async function handleStart(id) {
    try {
      await botService.startBot(id);
      loadBots();
    } catch (error) {
      alert("Failed to start bot");
    }
  }

  async function handleStop(id) {
    try {
      await botService.stopBot(id);
      loadBots();
    } catch (error) {
      alert("Failed to stop bot");
    }
  }

  async function handleDelete(id) {
    if (confirm("Are you sure you want to delete this bot?")) {
      try {
        await botService.deleteBot(id);
        loadBots();
      } catch (error) {
        alert("Failed to delete bot");
      }
    }
  }
}

export default Bots;
