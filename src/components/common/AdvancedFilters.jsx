import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";

function AdvancedFilters({ onApply, onReset }) {
  const [filters, setFilters] = useState({
    symbol: "",
    status: "",
    startDate: "",
    endDate: "",
    minPnL: "",
    maxPnL: "",
  });

  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleApply = () => {
    onApply(filters);
  };

  const handleReset = () => {
    const resetFilters = {
      symbol: "",
      status: "",
      startDate: "",
      endDate: "",
      minPnL: "",
      maxPnL: "",
    };
    setFilters(resetFilters);
    onReset();
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <Input
          label="Symbol"
          name="symbol"
          value={filters.symbol}
          onChange={handleChange}
          placeholder="e.g. RELIANCE"
        />

        <Select
          label="Status"
          name="status"
          value={filters.status}
          onChange={handleChange}
          options={[
            { value: "OPEN", label: "Open" },
            { value: "CLOSED", label: "Closed" },
          ]}
        />

        <Input
          label="Start Date"
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleChange}
        />

        <Input
          label="End Date"
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleChange}
        />

        <Input
          label="Min P&L"
          type="number"
          name="minPnL"
          value={filters.minPnL}
          onChange={handleChange}
          placeholder="0"
        />

        <Input
          label="Max P&L"
          type="number"
          name="maxPnL"
          value={filters.maxPnL}
          onChange={handleChange}
          placeholder="10000"
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={handleApply} variant="primary">
          Apply Filters
        </Button>
        <Button onClick={handleReset} variant="secondary">
          Reset
        </Button>
      </div>
    </div>
  );
}

export default AdvancedFilters;
