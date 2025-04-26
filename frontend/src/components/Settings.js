import React, { useState, useEffect } from 'react';

const Settings = ({ isOpen, onClose, onSave }) => {
  const [settings, setSettings] = useState({
    theme: 'light',
    currency: 'CAD',
    defaultCity: 'Toronto',
    showHeatmap: true,
    showAllGTA: false,
    dashboardView: 'compact',
    notifyNewListings: true,
    autoRefreshMinutes: 30,
  });

  // Load saved settings from localStorage on initial render
  useEffect(() => {
    const savedSettings = localStorage.getItem('propertyMapSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('propertyMapSettings', JSON.stringify(settings));

    // Notify parent component
    if (onSave) {
      onSave(settings);
    }

    // Close the modal
    if (onClose) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="settings-modal-overlay">
      <div className="settings-modal">
        <div className="settings-header">
          <h2>Application Settings</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="settings-content">
          <div className="settings-section">
            <h3>Display Settings</h3>

            <div className="setting-group">
              <label>Theme</label>
              <div className="setting-options">
                <button
                  className={`setting-option ${
                    settings.theme === 'light' ? 'selected' : ''
                  }`}
                  onClick={() => handleChange('theme', 'light')}
                >
                  Light
                </button>
                <button
                  className={`setting-option ${
                    settings.theme === 'dark' ? 'selected' : ''
                  }`}
                  onClick={() => handleChange('theme', 'dark')}
                >
                  Dark
                </button>
                <button
                  className={`setting-option ${
                    settings.theme === 'system' ? 'selected' : ''
                  }`}
                  onClick={() => handleChange('theme', 'system')}
                >
                  System
                </button>
              </div>
            </div>

            <div className="setting-group">
              <label>Currency</label>
              <div className="setting-options">
                <button
                  className={`setting-option ${
                    settings.currency === 'CAD' ? 'selected' : ''
                  }`}
                  onClick={() => handleChange('currency', 'CAD')}
                >
                  CAD ($)
                </button>
                <button
                  className={`setting-option ${
                    settings.currency === 'USD' ? 'selected' : ''
                  }`}
                  onClick={() => handleChange('currency', 'USD')}
                >
                  USD ($)
                </button>
              </div>
            </div>

            <div className="setting-group">
              <label>Default City</label>
              <select
                value={settings.defaultCity}
                onChange={(e) => handleChange('defaultCity', e.target.value)}
                className="settings-select"
              >
                <option value="Toronto">Toronto</option>
                <option value="Mississauga">Mississauga</option>
                <option value="Brampton">Brampton</option>
                <option value="Vaughan">Vaughan</option>
                <option value="Markham">Markham</option>
                <option value="Oakville">Oakville</option>
                <option value="All">All GTA</option>
              </select>
            </div>
          </div>

          <div className="settings-section">
            <h3>Map Settings</h3>

            <div className="setting-group checkbox">
              <input
                type="checkbox"
                id="showHeatmap"
                checked={settings.showHeatmap}
                onChange={(e) => handleChange('showHeatmap', e.target.checked)}
              />
              <label htmlFor="showHeatmap">Show heatmap by default</label>
            </div>

            <div className="setting-group checkbox">
              <input
                type="checkbox"
                id="showAllGTA"
                checked={settings.showAllGTA}
                onChange={(e) => handleChange('showAllGTA', e.target.checked)}
              />
              <label htmlFor="showAllGTA">
                Show all GTA regions by default
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h3>Dashboard Settings</h3>

            <div className="setting-group">
              <label>Dashboard View</label>
              <div className="setting-options">
                <button
                  className={`setting-option ${
                    settings.dashboardView === 'compact' ? 'selected' : ''
                  }`}
                  onClick={() => handleChange('dashboardView', 'compact')}
                >
                  Compact
                </button>
                <button
                  className={`setting-option ${
                    settings.dashboardView === 'detailed' ? 'selected' : ''
                  }`}
                  onClick={() => handleChange('dashboardView', 'detailed')}
                >
                  Detailed
                </button>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <h3>Notification Settings</h3>

            <div className="setting-group checkbox">
              <input
                type="checkbox"
                id="notifyNewListings"
                checked={settings.notifyNewListings}
                onChange={(e) =>
                  handleChange('notifyNewListings', e.target.checked)
                }
              />
              <label htmlFor="notifyNewListings">
                Notify me about new listings
              </label>
            </div>

            <div className="setting-group">
              <label>Auto-refresh data every</label>
              <select
                value={settings.autoRefreshMinutes}
                onChange={(e) =>
                  handleChange('autoRefreshMinutes', parseInt(e.target.value))
                }
                className="settings-select"
              >
                <option value="0">Never</option>
                <option value="5">5 minutes</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">60 minutes</option>
              </select>
            </div>
          </div>
        </div>

        <div className="settings-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
