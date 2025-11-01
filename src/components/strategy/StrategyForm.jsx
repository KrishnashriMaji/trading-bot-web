import React, { useState } from "react";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";

function StrategyForm({ onSubmit, onCancel, initialData = null }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    type: initialData?.type || "",
    description: initialData?.description || "",
    isActive: initialData?.isActive !== undefined ? initialData.isActive : true,
    // Default parameters based on strategy type
    parameters: initialData?.parameters || {},
  });

  const [errors, setErrors] = useState({});

  const strategyTypes = [
    { value: "emaCrossover", label: "EMA Crossover" },
    { value: "rsi", label: "RSI Oversold/Overbought" },
    { value: "macd", label: "MACD Signal" },
    { value: "breakout", label: "Breakout Strategy" },
    { value: "meanReversion", label: "Mean Reversion" },
    { value: "bollingerBands", label: "Bollinger Bands" },
  ];

  const timeframes = [
    { value: "1m", label: "1 Minute" },
    { value: "5m", label: "5 Minutes" },
    { value: "15m", label: "15 Minutes" },
    { value: "30m", label: "30 Minutes" },
    { value: "1h", label: "1 Hour" },
    { value: "4h", label: "4 Hours" },
    { value: "1d", label: "1 Day" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("param_")) {
      const paramName = name.replace("param_", "");
      setFormData((prev) => ({
        ...prev,
        parameters: {
          ...prev.parameters,
          [paramName]: type === "number" ? parseFloat(value) : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Strategy name is required";
    }

    if (!formData.type) {
      newErrors.type = "Strategy type is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit(formData);
  };

  // Render parameter fields based on strategy type
  const renderParameterFields = () => {
    switch (formData.type) {
      case "emaCrossover":
        return (
          <>
            <Input
              label="Fast EMA Period"
              name="param_fastEma"
              type="number"
              value={formData.parameters.fastEma || 9}
              onChange={handleChange}
              min="1"
              required
            />
            <Input
              label="Slow EMA Period"
              name="param_slowEma"
              type="number"
              value={formData.parameters.slowEma || 21}
              onChange={handleChange}
              min="1"
              required
            />
            <Select
              label="Timeframe"
              name="param_timeframe"
              value={formData.parameters.timeframe || "5m"}
              onChange={handleChange}
              options={timeframes}
              required
            />
          </>
        );

      case "rsi":
        return (
          <>
            <Input
              label="RSI Period"
              name="param_period"
              type="number"
              value={formData.parameters.period || 14}
              onChange={handleChange}
              min="1"
              required
            />
            <Input
              label="Oversold Level"
              name="param_oversold"
              type="number"
              value={formData.parameters.oversold || 30}
              onChange={handleChange}
              min="0"
              max="50"
              required
            />
            <Input
              label="Overbought Level"
              name="param_overbought"
              type="number"
              value={formData.parameters.overbought || 70}
              onChange={handleChange}
              min="50"
              max="100"
              required
            />
            <Select
              label="Timeframe"
              name="param_timeframe"
              value={formData.parameters.timeframe || "15m"}
              onChange={handleChange}
              options={timeframes}
              required
            />
          </>
        );

      case "macd":
        return (
          <>
            <Input
              label="Fast Period"
              name="param_fastPeriod"
              type="number"
              value={formData.parameters.fastPeriod || 12}
              onChange={handleChange}
              min="1"
              required
            />
            <Input
              label="Slow Period"
              name="param_slowPeriod"
              type="number"
              value={formData.parameters.slowPeriod || 26}
              onChange={handleChange}
              min="1"
              required
            />
            <Input
              label="Signal Period"
              name="param_signalPeriod"
              type="number"
              value={formData.parameters.signalPeriod || 9}
              onChange={handleChange}
              min="1"
              required
            />
            <Select
              label="Timeframe"
              name="param_timeframe"
              value={formData.parameters.timeframe || "1h"}
              onChange={handleChange}
              options={timeframes}
              required
            />
          </>
        );

      case "breakout":
        return (
          <>
            <Input
              label="Lookback Period"
              name="param_lookbackPeriod"
              type="number"
              value={formData.parameters.lookbackPeriod || 20}
              onChange={handleChange}
              min="1"
              required
            />
            <Input
              label="Breakout Threshold (%)"
              name="param_threshold"
              type="number"
              step="0.1"
              value={formData.parameters.threshold || 0.5}
              onChange={handleChange}
              min="0"
              required
            />
            <Select
              label="Timeframe"
              name="param_timeframe"
              value={formData.parameters.timeframe || "15m"}
              onChange={handleChange}
              options={timeframes}
              required
            />
          </>
        );

      case "meanReversion":
        return (
          <>
            <Input
              label="Moving Average Period"
              name="param_maPeriod"
              type="number"
              value={formData.parameters.maPeriod || 20}
              onChange={handleChange}
              min="1"
              required
            />
            <Input
              label="Standard Deviations"
              name="param_stdDevs"
              type="number"
              step="0.1"
              value={formData.parameters.stdDevs || 2.0}
              onChange={handleChange}
              min="0"
              required
            />
            <Select
              label="Timeframe"
              name="param_timeframe"
              value={formData.parameters.timeframe || "15m"}
              onChange={handleChange}
              options={timeframes}
              required
            />
          </>
        );

      case "bollingerBands":
        return (
          <>
            <Input
              label="Period"
              name="param_period"
              type="number"
              value={formData.parameters.period || 20}
              onChange={handleChange}
              min="1"
              required
            />
            <Input
              label="Standard Deviations"
              name="param_stdDev"
              type="number"
              step="0.1"
              value={formData.parameters.stdDev || 2.0}
              onChange={handleChange}
              min="0"
              required
            />
            <Select
              label="Timeframe"
              name="param_timeframe"
              value={formData.parameters.timeframe || "15m"}
              onChange={handleChange}
              options={timeframes}
              required
            />
          </>
        );

      default:
        return (
          <div className="text-center text-gray-500 py-4">
            Select a strategy type to configure parameters
          </div>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div>
        <Input
          label="Strategy Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="e.g., My EMA Strategy"
          required
        />
      </div>

      <div>
        <Select
          label="Strategy Type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          options={strategyTypes}
          error={errors.type}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe your strategy..."
          required
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      {/* Strategy Parameters */}
      {formData.type && (
        <div className="border-t pt-6">
          <h4 className="font-semibold text-lg mb-4">Strategy Parameters</h4>
          <div className="space-y-4">{renderParameterFields()}</div>
        </div>
      )}

      {/* Active Toggle */}
      <div className="flex items-center">
        <input
          type="checkbox"
          name="isActive"
          checked={formData.isActive}
          onChange={handleChange}
          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
        />
        <label className="ml-2 text-sm text-gray-700">
          Activate this strategy immediately
        </label>
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
