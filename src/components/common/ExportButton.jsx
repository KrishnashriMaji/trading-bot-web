import React, { useState } from "react";
import Button from "./Button";

function ExportButton({ data, filename = "export", onExport }) {
  const [isExporting, setIsExporting] = useState(false);

  const exportToCSV = () => {
    if (!data || data.length === 0) {
      alert("No data to export");
      return;
    }

    setIsExporting(true);

    try {
      // Convert data to CSV
      const headers = Object.keys(data[0]).join(",");
      const rows = data.map((row) =>
        Object.values(row)
          .map((val) =>
            typeof val === "string" && val.includes(",") ? `"${val}"` : val
          )
          .join(",")
      );

      const csv = [headers, ...rows].join("\n");

      // Download
      const blob = new Blob([csv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename}_${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);

      if (onExport) onExport();
    } catch (error) {
      alert("Export failed: " + error.message);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={exportToCSV}
      disabled={isExporting}
      variant="secondary"
      size="sm"
    >
      {isExporting ? "Exporting..." : "📥 Export CSV"}
    </Button>
  );
}

export default ExportButton;
