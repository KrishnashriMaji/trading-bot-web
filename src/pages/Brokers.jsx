import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import Badge from "../components/common/Badge";
import BrokerForm from "../components/broker/BrokerForm";
import BrokerCard from "../components/broker/BrokerCard";
import Loading from "../components/common/Loading";
import { brokerService } from "../services/brokerService";

function Brokers() {
  const { user } = useAuth();
  const [brokers, setBrokers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    loadBrokers();
  }, []);

  const loadBrokers = async () => {
    try {
      // API call will go here
      const data = await brokerService.getBrokers();

      // Mock data for now
      setBrokers(data);
    } catch (error) {
      console.error("Error loading brokers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBroker = async (brokerData) => {
    try {
      const result = await brokerService.addBroker(brokerData);
      console.log("Adding broker:", result);
      setShowAddModal(false);
      loadBrokers();
    } catch (error) {
      alert("Failed to add broker: " + error.message);
    }
  };

  const handleTestConnection = async (brokerId, totp) => {
    try {
      await brokerService.testConnection(brokerId, { totp });
      loadBrokers();
    } catch (error) {
      alert("Connection failed: " + error.message);
    }
  };

  const handleRemove = async (brokerId) => {
    if (!confirm("Are you sure you want to remove this broker?")) return;

    try {
      await brokerService.removeBroker(brokerId);
      loadBrokers();
    } catch (error) {
      alert("Failed to remove broker");
    }
  };

  if (loading) return <Loading text="Loading brokers..." />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Broker Connections</h1>
          <p className="text-gray-600 mt-2">
            Connect your broker accounts to start automated trading
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>+ Add Broker</Button>
      </div>

      {/* Supported Brokers Info */}
      <Card className="mb-6 bg-blue-50 border border-blue-200">
        <div className="flex items-start gap-4">
          <div className="text-3xl">ℹ️</div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">
              Supported Brokers
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Angel One - Free API, No monthly charges</li>
              <li>• Zerodha - Kite Connect (₹500/month)</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Broker Cards */}
      {brokers.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏦</div>
            <h3 className="text-xl font-semibold mb-2">No Brokers Connected</h3>
            <p className="text-gray-600 mb-6">
              Connect your first broker to start trading
            </p>
            <Button onClick={() => setShowAddModal(true)}>
              Add Your First Broker
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brokers.map((broker) => (
            <BrokerCard
              key={broker._id}
              broker={broker}
              onTest={handleTestConnection}
              onRemove={() => handleRemove(broker._id)}
            />
          ))}
        </div>
      )}

      {/* Add Broker Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Broker Connection"
        size="lg"
      >
        <BrokerForm
          onSubmit={handleAddBroker}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>
    </div>
  );
}

export default Brokers;
