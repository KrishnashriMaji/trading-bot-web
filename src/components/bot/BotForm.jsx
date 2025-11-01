import React, { useState, useEffect } from "react";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";

function BotForm({ onSubmit, onCancel, initialData = {} }) {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    symbol: initialData.symbol?.symbol || "",
    exchange: initialData.symbol?.exchange || "NSE",
    token: initialData.symbol?.token || "",
    lotSize: initialData.symbol?.lotSize || 1,
    strategyId: initialData.strategyId || "",
    brokerCredentialId: initialData.brokerCredentialId || "",
    stopLossPercent: initialData.config?.stopLossPercent || 1.0,
    takeProfitPercent: initialData.config?.takeProfitPercent || 2.0,
    maxTradesPerDay: initialData.config?.maxTradesPerDay || 10,
    paperTrading:
      initialData.config?.paperTrading !== undefined
        ? initialData.config.paperTrading
        : true,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.symbol.trim()) newErrors.symbol = "Symbol is required";
    if (!formData.strategyId) newErrors.strategyId = "Strategy is required";
    if (!formData.brokerCredentialId)
      newErrors.brokerCredentialId = "Broker is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      onSubmit({
        name: formData.name,
        symbol: {
          symbol: formData.symbol,
          exchange: formData.exchange,
          token: formData.token,
          lotSize: parseInt(formData.lotSize),
        },
        strategyId: formData.strategyId,
        brokerCredentialId: formData.brokerCredentialId,
        config: {
          paperTrading: formData.paperTrading,
          maxTradesPerDay: parseInt(formData.maxTradesPerDay),
          stopLossPercent: parseFloat(formData.stopLossPercent),
          takeProfitPercent: parseFloat(formData.takeProfitPercent),
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Bot Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
        placeholder="My Trading Bot"
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Symbol"
          name="symbol"
          value={formData.symbol}
          onChange={handleChange}
          error={errors.symbol}
          required
          placeholder="RELIANCE-EQ"
        />

        <Select
          label="Exchange"
          name="exchange"
          value={formData.exchange}
          onChange={handleChange}
          options={[
            { value: "NSE", label: "NSE" },
            { value: "BSE", label: "BSE" },
            { value: "NFO", label: "NFO" },
          ]}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Symbol Token"
          name="token"
          value={formData.token}
          onChange={handleChange}
          placeholder="2885"
        />

        <Input
          label="Lot Size"
          name="lotSize"
          type="number"
          value={formData.lotSize}
          onChange={handleChange}
        />
      </div>

      {/* Strategy & Broker Selection */}
      <Select
        label="Strategy"
        name="strategyId"
        value={formData.strategyId}
        onChange={handleChange}
        error={errors.strategyId}
        required
        options={[
          { value: "strategy1", label: "EMA Crossover" },
          { value: "strategy2", label: "RSI Strategy" },
        ]}
      />

      <Select
        label="Broker"
        name="brokerCredentialId"
        value={formData.brokerCredentialId}
        onChange={handleChange}
        error={errors.brokerCredentialId}
        required
        options={[{ value: "broker1", label: "Angel One" }]}
      />

      {/* Risk Management */}
      <div className="border-t pt-4 mt-4">
        <h4 className="font-semibold mb-4">Risk Management</h4>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Stop Loss %"
            name="stopLossPercent"
            type="number"
            step="0.1"
            value={formData.stopLossPercent}
            onChange={handleChange}
          />

          <Input
            label="Take Profit %"
            name="takeProfitPercent"
            type="number"
            step="0.1"
            value={formData.takeProfitPercent}
            onChange={handleChange}
          />
        </div>

        <Input
          label="Max Trades Per Day"
          name="maxTradesPerDay"
          type="number"
          value={formData.maxTradesPerDay}
          onChange={handleChange}
        />

        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            name="paperTrading"
            checked={formData.paperTrading}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-gray-700">
            Enable Paper Trading (Test mode - No real trades)
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-6">
        <Button type="submit" variant="primary" className="flex-1">
          {initialData._id ? "Update Bot" : "Create Bot"}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default BotForm;
