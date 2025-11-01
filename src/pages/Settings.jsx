import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

function Settings() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // API call to update profile
    alert("Profile updated!");
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (password.new !== password.confirm) {
      alert("Passwords do not match!");
      return;
    }
    // API call to change password
    alert("Password changed!");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <Card title="Profile Information">
          <form onSubmit={handleProfileUpdate}>
            <Input
              label="Name"
              value={profile.name}
              onChange={(e) =>
                setProfile((prev) => ({ ...prev, name: e.target.value }))
              }
            />

            <Input
              label="Email"
              type="email"
              value={profile.email}
              onChange={(e) =>
                setProfile((prev) => ({ ...prev, email: e.target.value }))
              }
            />

            <Button type="submit">Update Profile</Button>
          </form>
        </Card>

        {/* Password Change */}
        <Card title="Change Password">
          <form onSubmit={handlePasswordChange}>
            <Input
              label="Current Password"
              type="password"
              value={password.current}
              onChange={(e) =>
                setPassword((prev) => ({ ...prev, current: e.target.value }))
              }
            />

            <Input
              label="New Password"
              type="password"
              value={password.new}
              onChange={(e) =>
                setPassword((prev) => ({ ...prev, new: e.target.value }))
              }
            />

            <Input
              label="Confirm New Password"
              type="password"
              value={password.confirm}
              onChange={(e) =>
                setPassword((prev) => ({ ...prev, confirm: e.target.value }))
              }
            />

            <Button type="submit" variant="danger">
              Change Password
            </Button>
          </form>
        </Card>

        {/* API Settings */}
        <Card title="API Settings">
          <p className="text-gray-600 mb-4">
            Manage your API keys and broker connections
          </p>
          <Button variant="secondary">Manage Brokers</Button>
        </Card>

        {/* Notification Settings */}
        <Card title="Notifications">
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="emailNotif"
                className="mr-2"
                defaultChecked
              />
              <label htmlFor="emailNotif">Email notifications for trades</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="errorNotif"
                className="mr-2"
                defaultChecked
              />
              <label htmlFor="errorNotif">Email notifications for errors</label>
            </div>
            <Button>Save Preferences</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Settings;
