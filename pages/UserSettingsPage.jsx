
import React, { useState, useEffect } from 'react';

export default function UserSettingsPage() {
  const [notifications, setNotifications] = useState({
    eventReminders: true,
    commentReplies: true,
    newsletter: false,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    
    const saved = JSON.parse(localStorage.getItem('userSettings'));
    if (saved) {
      setNotifications(saved);
    }
  }, []);

  const handleToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = () => {
    setSaving(true);
    localStorage.setItem('userSettings', JSON.stringify(notifications));
    setTimeout(() => {
      setSaving(false);
      alert('Settings saved!');
    }, 500);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Account Settings</h1>
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-700 mb-2">Notification Preferences</h2>
        <div className="space-y-4">
          {Object.keys(notifications).map(key => (
            <label key={key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={notifications[key]}
                onChange={() => handleToggle(key)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="capitalize text-gray-800">
                {key.replace(/([A-Z])/g, ' $1')}
              </span>
            </label>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}
