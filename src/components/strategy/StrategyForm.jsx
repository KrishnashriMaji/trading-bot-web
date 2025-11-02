import React, { useState, useEffect } from "react";
import Select from "../common/Select";
import Button from "../common/Button";
import { strategyService } from "../../services/strategyService";

function StrategyForm({ onSubmit, onCancel, initialData = null }) {
  const [formData, setFormData] = useState({
    strategyName: initialData?.strategyName || "",
    strategyLabel: initialData?.strategyLabel || "",
    description: initialData?.description || "",
  });

  const [availableStrategies, setAvailableStrategies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadStrategyNames();
  }, []);

  const loadStrategyNames = async () => {
    try {
      setLoading(true);
      const response = await strategyService.getAvailableStrategies();
      setAvailableStrategies(response?.templates || []);
    } catch (error) {
      console.error("Error loading strategy names:", error);
      alert("❌ Failed to load strategy names");
    } finally {
      setLoading(false);
    }
  };

  const handleStrategyChange = (e) => {
    const selectedLabel = e.target.value;
    const selectedStrategy = availableStrategies.find(
      (s) => s.label === selectedLabel
    );

    if (selectedStrategy) {
      setFormData({
        strategyName: selectedStrategy.name,
        strategyLabel: selectedStrategy.label,
        description: selectedStrategy.description,
      });
    }

    // Clear error
    if (errors.strategyLabel) {
      setErrors((prev) => ({ ...prev, strategyLabel: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.strategyLabel) {
      newErrors.strategyLabel = "Strategy name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }
    onSubmit({
      name: formData.strategyName,
      label: formData.strategyLabel,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-gray-500">Loading strategies...</div>
      </div>
    );
  }

  // Convert strategies to Select options format
  const strategyOptions = availableStrategies.map((strategy) => ({
    value: strategy.label,
    label: strategy.name,
  }));

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Strategy Name - Dropdown from Backend */}
      <div>
        <Select
          label="Strategy Name"
          name="strategyLabel"
          value={formData.strategyLabel}
          onChange={handleStrategyChange}
          options={strategyOptions}
          error={errors.strategyLabel}
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Select from available backend strategies
        </p>
      </div>

      {/* Description - Read-only, auto-populated */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description"
          value={formData.description}
          rows="6"
          readOnly
          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 cursor-not-allowed"
          placeholder="Description will be auto-populated when you select a strategy..."
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          This description is provided by the backend and cannot be edited
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-end pt-4 border-t">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {initialData ? "Update Strategy" : "Create Strategy"}
        </Button>
      </div>
    </form>
  );
}

export default StrategyForm;
