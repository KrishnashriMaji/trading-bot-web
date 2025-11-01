import React, { useState } from "react";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import Badge from "../components/common/Badge";

function Strategies() {
  const [strategies, setStrategies] = useState([
    {
      _id: "1",
      name: "EMA Crossover",
      type: "emaCrossover",
      isActive: true,
      parameters: { fastEma: 9, slowEma: 21 },
    },
  ]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Strategies</h1>
        <Button onClick={() => setShowCreateModal(true)}>
          + Create Strategy
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {strategies.map((strategy) => (
          <Card key={strategy._id}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">{strategy.name}</h3>
              <Badge variant={strategy.isActive ? "success" : "default"}>
                {strategy.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>

            <div className="space-y-2 text-sm">
              <p>
                <span className="text-gray-600">Type:</span> {strategy.type}
              </p>
              <p>
                <span className="text-gray-600">Parameters:</span>
              </p>
              <pre className="bg-gray-100 p-2 rounded text-xs">
                {JSON.stringify(strategy.parameters, null, 2)}
              </pre>
            </div>

            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="secondary">
                Edit
              </Button>
              <Button size="sm" variant="danger">
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create Strategy"
      >
        <p>Strategy creation form will go here</p>
      </Modal>
    </div>
  );
}

export default Strategies;
