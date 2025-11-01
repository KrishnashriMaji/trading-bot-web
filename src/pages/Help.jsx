import React, { useState } from "react";
import Card from "../components/common/Card";

function Help() {
  const [activeTab, setActiveTab] = useState("getting-started");

  const tabs = [
    { id: "getting-started", label: "Getting Started", icon: "🚀" },
    { id: "brokers", label: "Broker Setup", icon: "🏦" },
    { id: "strategies", label: "Strategies", icon: "🎯" },
    { id: "bots", label: "Bot Management", icon: "🤖" },
    { id: "faq", label: "FAQ", icon: "❓" },
  ];

  const content = {
    "getting-started": (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Getting Started with TradingBot</h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">
              1. Connect Your Broker
            </h3>
            <p className="text-gray-700">
              First, connect your broker account (Angel One, Zerodha, or Upstox)
              to enable automated trading. Go to Brokers page and add your
              credentials.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">2. Create a Strategy</h3>
            <p className="text-gray-700">
              Choose or create a trading strategy. We provide pre-built
              strategies like EMA Crossover, RSI, and MACD. You can customize
              parameters to match your trading style.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">
              3. Create Your First Bot
            </h3>
            <p className="text-gray-700">
              Create a bot by selecting a symbol, strategy, and broker.
              Configure risk parameters like stop loss and take profit
              percentages.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">
              4. Test in Paper Trading
            </h3>
            <p className="text-gray-700">
              Always start with paper trading mode enabled. This lets you test
              your bot without risking real money. Monitor performance for at
              least a week.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">5. Go Live</h3>
            <p className="text-gray-700">
              Once satisfied with paper trading results, disable paper trading
              mode and start live trading. Start with small position sizes and
              scale up gradually.
            </p>
          </div>
        </div>
      </div>
    ),

    brokers: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Broker Setup Guide</h2>

        <Card className="bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">
            Supported Brokers
          </h3>
          <ul className="space-y-2 text-blue-800">
            <li>
              <strong>Angel One:</strong> FREE API, No monthly charges ✅
            </li>
            <li>
              <strong>Zerodha:</strong> Kite Connect (₹2,000/month)
            </li>
            <li>
              <strong>Upstox:</strong> Pro API
            </li>
          </ul>
        </Card>

        <div>
          <h3 className="text-xl font-semibold mb-3">Angel One Setup</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>
              Visit{" "}
              <a
                href="https://smartapi.angelbroking.com/"
                className="text-blue-600 hover:underline"
                target="_blank"
              >
                smartapi.angelbroking.com
              </a>
            </li>
            <li>Login with your Angel One credentials</li>
            <li>Create a new app</li>
            <li>Get your API Key, Client Code, and TOTP Secret</li>
            <li>Add these credentials in the Brokers page</li>
          </ol>
        </div>
      </div>
    ),

    strategies: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Trading Strategies Explained</h2>

        <div className="space-y-4">
          <Card>
            <h3 className="text-xl font-semibold mb-2">EMA Crossover</h3>
            <p className="text-gray-700 mb-2">
              Uses two exponential moving averages (fast and slow). Generates
              buy signal when fast EMA crosses above slow EMA, and sell signal
              when fast EMA crosses below slow EMA.
            </p>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm">
                <strong>Best for:</strong> Trending markets
              </p>
              <p className="text-sm">
                <strong>Parameters:</strong> Fast EMA (9), Slow EMA (21)
              </p>
            </div>
          </Card>

          <Card>
            <h3 className="text-xl font-semibold mb-2">RSI Strategy</h3>
            <p className="text-gray-700 mb-2">
              Uses Relative Strength Index to identify overbought and oversold
              conditions. Buys when RSI crosses above oversold level, sells when
              crosses below overbought.
            </p>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm">
                <strong>Best for:</strong> Range-bound markets
              </p>
              <p className="text-sm">
                <strong>Parameters:</strong> Period (14), Overbought (70),
                Oversold (30)
              </p>
            </div>
          </Card>
        </div>
      </div>
    ),

    bots: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Bot Management</h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">Bot Status Meanings</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                  RUNNING
                </span>
                <span className="text-gray-700">Bot is actively trading</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">
                  STOPPED
                </span>
                <span className="text-gray-700">Bot is paused</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm">
                  ERROR
                </span>
                <span className="text-gray-700">Bot encountered an error</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Risk Management</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <strong>Stop Loss:</strong> Automatically exit if loss exceeds
                percentage
              </li>
              <li>
                <strong>Take Profit:</strong> Automatically exit if profit
                reaches target
              </li>
              <li>
                <strong>Max Trades/Day:</strong> Limit number of trades per day
              </li>
              <li>
                <strong>Paper Trading:</strong> Test without real money
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),

    faq: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>

        <div className="space-y-4">
          {[
            {
              q: "Is my broker data secure?",
              a: "Yes! All broker credentials are encrypted using industry-standard AES-256 encryption before being stored. We never share your data with third parties.",
            },
            {
              q: "Can I run multiple bots simultaneously?",
              a: "Yes, you can run as many bots as you want on different symbols and strategies.",
            },
            {
              q: "What happens if my internet connection drops?",
              a: "The backend server keeps running independently. Your bots continue trading even if you close the UI or lose connection.",
            },
            {
              q: "How do I stop a bot?",
              a: 'Click the "Stop" button on the bot card. The bot will stop after completing any open positions.',
            },
            {
              q: "Can I backtest my strategies?",
              a: "Yes, use the backtesting feature in the Strategies page to test your strategy on historical data before going live.",
            },
            {
              q: "What is paper trading?",
              a: "Paper trading simulates real trading without using actual money. It's perfect for testing strategies risk-free.",
            },
          ].map((faq, index) => (
            <Card key={index}>
              <h3 className="font-semibold mb-2">{faq.q}</h3>
              <p className="text-gray-700">{faq.a}</p>
            </Card>
          ))}
        </div>
      </div>
    ),
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Help & Documentation</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <Card>{content[activeTab]}</Card>
        </div>
      </div>
    </div>
  );
}

export default Help;
