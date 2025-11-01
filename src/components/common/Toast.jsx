import React, { useState, useEffect } from "react";

let showToastFn = null;

export function useToast() {
  return {
    showToast: (title, message, type = "info") => {
      if (showToastFn) {
        showToastFn(title, message, type);
      }
    },
  };
}

function Toast() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    showToastFn = (title, message, type) => {
      const id = Date.now();
      const newToast = { id, title, message, type };

      setToasts((prev) => [...prev, newToast]);

      // Auto remove after 5 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 5000);
    };

    return () => {
      showToastFn = null;
    };
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const getTypeStyles = (type) => {
    switch (type) {
      case "success":
        return "bg-green-500 border-green-600";
      case "error":
        return "bg-red-500 border-red-600";
      case "warning":
        return "bg-yellow-500 border-yellow-600";
      default:
        return "bg-blue-500 border-blue-600";
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${getTypeStyles(
            toast.type
          )} text-white px-6 py-4 rounded-lg shadow-lg border-l-4 min-w-[300px] animate-fade-in`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-bold">{toast.title}</h4>
              <p className="text-sm mt-1">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-4 text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Toast;
