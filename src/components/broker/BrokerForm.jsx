import React, { useState } from "react";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";

function BrokerForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    brokerName: "",
    apiKey: "",
    clientCode: "",
    password: "",
    totpSecret: "",
  });

  const [errors, setErrors] = useState({});

  const brokerOptions = [
    { value: "angelone", label: "Angel One (Recommended - FREE)" },
    { value: "zerodha", label: "Zerodha (₹2,000/month)" },
    { value: "upstox", label: "Upstox" },
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.brokerName) newErrors.brokerName = "Select a broker";
    if (!formData.apiKey) newErrors.apiKey = "API Key is required";
    if (!formData.clientCode) newErrors.clientCode = "Client Code is required";
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Select
        label="Select Broker"
        name="brokerName"
        value={formData.brokerName}
        onChange={handleChange}
        options={brokerOptions}
        error={errors.brokerName}
        required
      />

      <Input
        label="API Key"
        name="apiKey"
        value={formData.apiKey}
        onChange={handleChange}
        error={errors.apiKey}
        required
        placeholder="Enter your API key"
      />

      <Input
        label="Client Code / User ID"
        name="clientCode"
        value={formData.clientCode}
        onChange={handleChange}
        error={errors.clientCode}
        required
        placeholder="Your client code"
      />

      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        required
        placeholder="Your trading password"
      />

      <Input
        label="TOTP Secret (Optional)"
        name="totpSecret"
        value={formData.totpSecret}
        onChange={handleChange}
        placeholder="For 2FA authentication"
      />

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
        <p className="text-sm text-yellow-800">
          <strong>🔒 Security:</strong> Your credentials are encrypted and
          stored securely. We never share your data with third parties.
        </p>
      </div>

      <div className="flex gap-4">
        <Button type="submit" variant="primary" className="flex-1">
          Connect Broker
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default BrokerForm;
