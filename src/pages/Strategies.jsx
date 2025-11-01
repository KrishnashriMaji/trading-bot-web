import React, { useState, useEffect } from "react";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import Badge from "../components/common/Badge";
import StrategyForm from "../components/strategy/StrategyForm";
import Loading from "../components/common/Loading";
import EmptyState from "../components/common/EmptyState";

function Strategies() {
  const [strategies, setStrategies] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStrategies();
  }, []);

  const loadStrategies = async () => {
    try {
      setLoading(true);
      // API call will go here
      // const data = await strategyService.getStrategies();

      // Mock data for now
      setStrategies([
        {
          _id: "1",
          name: "EMA Crossover",
          type: "emaCrossover",
          description: "Fast EMA crosses above/below slow EMA",
          isActive: true,
          parameters: {
            fastEma: 9,
            slowEma: 21,
            timeframe: "5m",
          },
          createdAt: new Date().toISOString(),
        },
        {
          _id: "2",
          name: "RSI Oversold/Overbought",
          type: "rsi",
          description: "Buy when RSI < 30, Sell when RSI > 70",
          isActive: true,
          parameters: {
            period: 14,
            oversold: 30,
            overbought: 70,
            timeframe: "15m",
          },
          createdAt: new Date().toISOString(),
        },
        {
          _id: "3",
          name: "MACD Signal",
          type: "macd",
          description: "Trade based on MACD histogram crossovers",
          isActive: false,
          parameters: {
            fastPeriod: 12,
            slowPeriod: 26,
            signalPeriod: 9,
            timeframe: "1h",
          },
          createdAt: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.error("Error loading strategies:", error);
      alert("❌ Failed to load strategies");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (strategyData) => {
    try {
      // API call will go here
      // await strategyService.createStrategy(strategyData);

      // Mock implementation
      const newStrategy = {
        _id: Date.now().toString(),
        ...strategyData,
        createdAt: new Date().toISOString(),
      };
      setStrategies([...strategies, newStrategy]);
      setShowCreateModal(false);
      alert("✅ Strategy created successfully!");
    } catch (error) {
      console.error("Error creating strategy:", error);
      alert("❌ Failed to create strategy");
    }
  };

  const handleEdit = (strategy) => {
    setSelectedStrategy(strategy);
    setShowEditModal(true);
  };

  const handleUpdate = async (strategyData) => {
    try {
      // API call will go here
      // await strategyService.updateStrategy(selectedStrategy._id, strategyData);

      // Mock implementation
      setStrategies(
        strategies.map((s) =>
          s._id === selectedStrategy._id ? { ...s, ...strategyData } : s
        )
      );
      setShowEditModal(false);
      setSelectedStrategy(null);
      alert("✅ Strategy updated successfully!");
    } catch (error) {
      console.error("Error updating strategy:", error);
      alert("❌ Failed to update strategy");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("⚠️ Are you sure you want to delete this strategy?")) {
      return;
    }

    try {
      // API call will go here
      // await strategyService.deleteStrategy(id);

      // Mock implementation
      setStrategies(strategies.filter((s) => s._id !== id));
      alert("✅ Strategy deleted successfully!");
    } catch (error) {
      console.error("Error deleting strategy:", error);
      alert("❌ Failed to delete strategy");
    }
  };

  const handleToggleActive = async (id) => {
    try {
      // API call will go here
      // await strategyService.toggleStrategy(id);

      // Mock implementation
      setStrategies(
        strategies.map((s) =>
          s._id === id ? { ...s, isActive: !s.isActive } : s
        )
      );
      alert("✅ Strategy status updated!");
    } catch (error) {
      console.error("Error toggling strategy:", error);
      alert("❌ Failed to update strategy status");
    }
  };

  if (loading) {
    return <Loading text="Loading strategies..." />;
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Trading Strategies</h1>
          <p className="text-gray-600 mt-1">
            Create and manage your trading strategies
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          + Create Strategy
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <p className="text-sm text-gray-600">Total Strategies</p>
          <p className="text-2xl font-bold">{strategies.length}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600">Active</p>
          <p className="text-2xl font-bold text-green-600">
            {strategies.filter((s) => s.isActive).length}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600">Inactive</p>
          <p className="text-2xl font-bold text-gray-600">
            {strategies.filter((s) => !s.isActive).length}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600">Most Used</p>
          <p className="text-lg font-bold">EMA Crossover</p>
        </Card>
      </div>

      {/* Strategies Grid */}
      {strategies.length === 0 ? (
        <EmptyState
          title="No strategies created yet"
          message="Create your first trading strategy to start automated trading"
          actionLabel="Create Your First Strategy"
          onAction={() => setShowCreateModal(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strategies.map((strategy) => (
            <Card key={strategy._id}>
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">{strategy.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {strategy.description}
                  </p>
                </div>
                <Badge variant={strategy.isActive ? "success" : "default"}>
                  {strategy.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm mb-4">
                <p>
                  <span className="font-medium text-gray-600">Type:</span>{" "}
                  <span className="text-gray-800">{strategy.type}</span>
                </p>
                <p>
                  <span className="font-medium text-gray-600">Parameters:</span>
                </p>
                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                  <pre className="text-xs text-gray-700 whitespace-pre-wrap">
                    {JSON.stringify(strategy.parameters, null, 2)}
                  </pre>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={strategy.isActive ? "warning" : "success"}
                  onClick={() => handleToggleActive(strategy._id)}
                  className="flex-1"
                >
                  {strategy.isActive ? "Deactivate" : "Activate"}
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleEdit(strategy)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(strategy._id)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Create Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Strategy"
        size="lg"
      >
        <StrategyForm
          onSubmit={handleCreate}
          onCancel={() => setShowCreateModal(false)}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedStrategy(null);
        }}
        title="Edit Strategy"
        size="lg"
      >
        {selectedStrategy && (
          <StrategyForm
            initialData={selectedStrategy}
            onSubmit={handleUpdate}
            onCancel={() => {
              setShowEditModal(false);
              setSelectedStrategy(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
}

export default Strategies;
