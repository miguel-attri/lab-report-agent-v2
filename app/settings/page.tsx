'use client';

import { useState } from 'react';
import {
  Cog6ToothIcon,
  BellIcon,
  BeakerIcon,
  UserGroupIcon,
  CheckCircleIcon,
  PlusIcon,
  PencilIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { thresholds, physicians } from '@/lib/data/dummy-data';

type Tab = 'thresholds' | 'notifications' | 'physicians';

interface ThresholdFormData {
  testName: string;
  unit: string;
  category: string;
  normalMin: string;
  normalMax: string;
  criticalLow: string;
  criticalHigh: string;
  notifyPhysician: boolean;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('notifications');
  const [showAddThreshold, setShowAddThreshold] = useState(false);
  const [editingThreshold, setEditingThreshold] = useState<number | null>(null);
  const [formData, setFormData] = useState<ThresholdFormData>({
    testName: '',
    unit: '',
    category: 'Nephrology',
    normalMin: '',
    normalMax: '',
    criticalLow: '',
    criticalHigh: '',
    notifyPhysician: true
  });

  const handleEditThreshold = (index: number) => {
    const threshold = thresholds[index];
    setFormData({
      testName: threshold.testName,
      unit: threshold.unit,
      category: threshold.category,
      normalMin: threshold.normalMin.toString(),
      normalMax: threshold.normalMax?.toString() || '',
      criticalLow: threshold.criticalLow?.toString() || '',
      criticalHigh: threshold.criticalHigh?.toString() || '',
      notifyPhysician: threshold.notifyPhysician
    });
    setEditingThreshold(index);
    setShowAddThreshold(true);
  };

  const handleCloseModal = () => {
    setShowAddThreshold(false);
    setEditingThreshold(null);
    setFormData({
      testName: '',
      unit: '',
      category: 'Nephrology',
      normalMin: '',
      normalMax: '',
      criticalLow: '',
      criticalHigh: '',
      notifyPhysician: true
    });
  };

  const handleSaveThreshold = () => {
    // In a real app, this would save to a backend
    console.log('Saving threshold:', formData);
    handleCloseModal();
  };

  const tabs = [
    { id: 'notifications' as Tab, name: 'Notifications', icon: BellIcon },
    { id: 'thresholds' as Tab, name: 'Thresholds', icon: BeakerIcon },
    { id: 'physicians' as Tab, name: 'Physicians', icon: UserGroupIcon },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">Configure thresholds, notifications, and physician preferences</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#5F4AE8] text-[#5F4AE8]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Automated Physician Notifications</h2>
                <p className="text-gray-600 mb-6">
                  Configure when and how physicians are automatically notified of critical lab values
                </p>
              </div>

              {/* Notification Rules */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="mt-1 h-4 w-4 text-[#5F4AE8] border-gray-300 rounded focus:ring-[#5F4AE8]"
                      />
                      <div>
                        <p className="font-medium text-gray-900">Immediate notification for critical values</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Automatically notify physician via SMS + Email when any value exceeds critical threshold
                        </p>
                        <div className="mt-3 flex gap-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            SMS
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Email
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Phone (if no response in 15 min)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="mt-1 h-4 w-4 text-[#5F4AE8] border-gray-300 rounded focus:ring-[#5F4AE8]"
                      />
                      <div>
                        <p className="font-medium text-gray-900">Batch notifications for abnormal values</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Send email digest of abnormal values at scheduled times (9 AM, 2 PM, 5 PM)
                        </p>
                        <div className="mt-3 flex gap-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Email Only
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="mt-1 h-4 w-4 text-[#5F4AE8] border-gray-300 rounded focus:ring-[#5F4AE8]"
                      />
                      <div>
                        <p className="font-medium text-gray-900">Trend-based alerts</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Notify when patient shows declining kidney function trend (eGFR decline &gt;10% or 3 consecutive increases in creatinine)
                        </p>
                        <div className="mt-3 flex gap-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            SMS + Email
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notification Threshold */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Notification Threshold Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Critical value count for immediate notification
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#5F4AE8] focus:border-[#5F4AE8]">
                      <option value="1">1 or more critical values</option>
                      <option value="2">2 or more critical values</option>
                      <option value="3">3 or more critical values</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Response timeout (for escalation)
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#5F4AE8] focus:border-[#5F4AE8]">
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">60 minutes</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-4">
                <button className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#5F4AE8] text-white rounded-lg hover:bg-[#4E3BC7] transition-colors">
                  <CheckCircleIcon className="h-5 w-5" />
                  Save Notification Settings
                </button>
              </div>
            </div>
          )}

          {/* Thresholds Tab */}
          {activeTab === 'thresholds' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Lab Test Thresholds</h2>
                  <p className="text-gray-600 mt-1">Configure normal and critical ranges for lab values</p>
                </div>
                <button
                  onClick={() => setShowAddThreshold(!showAddThreshold)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#5F4AE8] text-white rounded-lg hover:bg-[#4E3BC7] transition-colors"
                >
                  <PlusIcon className="h-5 w-5" />
                  Add Threshold
                </button>
              </div>

              {/* Thresholds Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Test Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Normal Range
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Critical Low
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Critical High
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Auto-Notify
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {thresholds.map((threshold, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="font-medium text-gray-900">{threshold.testName}</p>
                          <p className="text-sm text-gray-500">{threshold.unit}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            {threshold.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {threshold.normalMin} - {threshold.normalMax}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {threshold.criticalLow || '—'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {threshold.criticalHigh || '—'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {threshold.notifyPhysician ? (
                            <CheckCircleIcon className="h-5 w-5 text-green-500" />
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button
                            onClick={() => handleEditThreshold(index)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-[#5F4AE8] hover:bg-purple-50 rounded-lg transition-colors"
                          >
                            <PencilIcon className="h-4 w-4" />
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Physicians Tab */}
          {activeTab === 'physicians' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Physician Notification Preferences</h2>
                <p className="text-gray-600 mt-1">Manage physician contact information and notification preferences</p>
              </div>

              <div className="space-y-4">
                {physicians.map((physician) => (
                  <div key={physician.id} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-[#5F4AE8] flex items-center justify-center text-white text-lg font-medium">
                          {physician.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{physician.name}</p>
                          <p className="text-sm text-gray-600">{physician.specialty}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="text-sm font-medium text-gray-900">{physician.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="text-sm font-medium text-gray-900">{physician.phone}</p>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-sm font-medium text-gray-900 mb-3">Notification Preferences:</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-gray-600 mb-2">Critical Values</p>
                          <div className="flex gap-2">
                            {physician.notificationPreferences.critical.map((method) => (
                              <span key={method} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800">
                                {method}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-2">Abnormal Values</p>
                          <div className="flex gap-2">
                            {physician.notificationPreferences.abnormal.map((method) => (
                              <span key={method} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                {method}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-2">Normal Values</p>
                          <div className="flex gap-2">
                            {physician.notificationPreferences.normal.length > 0 ? (
                              physician.notificationPreferences.normal.map((method) => (
                                <span key={method} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                                  {method}
                                </span>
                              ))
                            ) : (
                              <span className="text-xs text-gray-500">No notifications</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Threshold Modal */}
      {showAddThreshold && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-xl font-bold text-gray-900">
                {editingThreshold !== null ? 'Edit Threshold' : 'Add New Threshold'}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Test Details */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Test Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Test Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.testName}
                      onChange={(e) => setFormData({ ...formData, testName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F4AE8] focus:border-[#5F4AE8] transition-colors"
                      placeholder="e.g., Potassium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Unit <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.unit}
                      onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F4AE8] focus:border-[#5F4AE8] transition-colors"
                      placeholder="e.g., mEq/L"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F4AE8] focus:border-[#5F4AE8] transition-colors"
                  >
                    <option value="Nephrology">Nephrology</option>
                    <option value="Electrolytes">Electrolytes</option>
                    <option value="Hematology">Hematology</option>
                    <option value="Metabolic">Metabolic</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Normal Range */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Normal Range</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Normal Min <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.normalMin}
                      onChange={(e) => setFormData({ ...formData, normalMin: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F4AE8] focus:border-[#5F4AE8] transition-colors"
                      placeholder="e.g., 3.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Normal Max
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.normalMax}
                      onChange={(e) => setFormData({ ...formData, normalMax: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F4AE8] focus:border-[#5F4AE8] transition-colors"
                      placeholder="e.g., 5.0 (leave empty for open-ended)"
                    />
                  </div>
                </div>
              </div>

              {/* Critical Values */}
              <div className="space-y-4 bg-red-50 p-4 rounded-lg border border-red-100">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-600 text-xs font-bold">!</span>
                  Critical Values
                </h4>
                <p className="text-sm text-gray-600">
                  Set thresholds that trigger immediate physician notifications. Leave empty if not applicable.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Critical Low
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.criticalLow}
                      onChange={(e) => setFormData({ ...formData, criticalLow: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F4AE8] focus:border-[#5F4AE8] bg-white transition-colors"
                      placeholder="e.g., 2.5"
                    />
                    <p className="text-xs text-gray-500 mt-1">Values below this are critical</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Critical High
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.criticalHigh}
                      onChange={(e) => setFormData({ ...formData, criticalHigh: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F4AE8] focus:border-[#5F4AE8] bg-white transition-colors"
                      placeholder="e.g., 6.0"
                    />
                    <p className="text-xs text-gray-500 mt-1">Values above this are critical</p>
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Notification Settings</h4>
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <input
                    type="checkbox"
                    id="notifyPhysician"
                    checked={formData.notifyPhysician}
                    onChange={(e) => setFormData({ ...formData, notifyPhysician: e.target.checked })}
                    className="mt-1 h-4 w-4 text-[#5F4AE8] border-gray-300 rounded focus:ring-[#5F4AE8]"
                  />
                  <div className="flex-1">
                    <label htmlFor="notifyPhysician" className="font-medium text-gray-900 cursor-pointer">
                      Auto-notify physician when critical
                    </label>
                    <p className="text-sm text-gray-600 mt-1">
                      Automatically send notifications when values exceed critical thresholds
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3 rounded-b-2xl">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveThreshold}
                className="inline-flex items-center gap-2 px-6 py-2 bg-[#5F4AE8] text-white rounded-lg hover:bg-[#4E3BC7] transition-colors shadow-sm"
              >
                <CheckCircleIcon className="h-5 w-5" />
                {editingThreshold !== null ? 'Update Threshold' : 'Add Threshold'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
