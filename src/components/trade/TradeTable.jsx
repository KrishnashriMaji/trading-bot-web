import React from "react";
import { format } from "date-fns";
import Table from "../common/Table";
import Badge from "../common/Badge";

function TradeTable({ trades }) {
  const columns = [
    {
      key: "symbol",
      label: "Symbol",
      render: (value) => <span className="font-semibold">{value}</span>,
    },
    {
      key: "side",
      label: "Side",
      render: (value) => (
        <Badge variant={value === "BUY" ? "success" : "danger"}>{value}</Badge>
      ),
    },
    {
      key: "quantity",
      label: "Quantity",
    },
    {
      key: "entryPrice",
      label: "Entry Price",
      render: (value) => `₹${value.toFixed(2)}`,
    },
    {
      key: "exitPrice",
      label: "Exit Price",
      render: (value) => (value ? `₹${value.toFixed(2)}` : "-"),
    },
    {
      key: "pnl",
      label: "P&L",
      render: (value, row) => {
        if (!value) return "-";
        const className = value >= 0 ? "text-green-600" : "text-red-600";
        return (
          <span className={`font-semibold ${className}`}>
            {value >= 0 ? "+" : ""}₹{value.toFixed(2)} (
            {row.pnlPercent?.toFixed(2)}%)
          </span>
        );
      },
    },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <Badge variant={value === "OPEN" ? "info" : "default"}>{value}</Badge>
      ),
    },
    {
      key: "entryTime",
      label: "Entry Time",
      render: (value) => format(new Date(value), "MMM dd, HH:mm"),
    },
  ];

  return <Table columns={columns} data={trades} />;
}

export default TradeTable;
