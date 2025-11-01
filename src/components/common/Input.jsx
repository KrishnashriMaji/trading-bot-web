import React from "react";

function Input({
  label,
  type = "text",
  value,
  name,
  onChange,
  placeholder = "",
  error = "",
  required = false,
  disabled = false,
  className = "",
}) {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-gray-700 font-semibold mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        } ${disabled ? "bg-gray-100" : ""}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default Input;
