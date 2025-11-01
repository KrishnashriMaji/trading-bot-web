import React from "react";
import Button from "./Button";

function EmptyState({
  icon = "📭",
  title = "No data",
  description = "There is no data to display",
  actionLabel,
  onAction,
}) {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
}

export default EmptyState;
