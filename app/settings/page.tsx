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

type Tab = 'notifications' | 'thresholds';

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

interface PhysicianPreferences {
  critical: string[];
  abnormal: string[];
  normal: string[];
  immediateNotification: boolean;
  batchNotifications: boolean;
  trendBasedAlerts: boolean;
  criticalValueCount: string;
  responseTimeout: string;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('notifications');
  const [showAddThreshold, setShowAddThreshold] = useState(false);
  const [editingThreshold, setEditingThreshold] = useState<number | null>(null);
  const [showPhysicianModal, setShowPhysicianModal] = useState(false);
  const [selectedPhysician, setSelectedPhysician] = useState<number | null>(null);
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
  const [physicianPrefs, setPhysicianPrefs] = useState<PhysicianPreferences>({
    critical: [],
    abnormal: [],
    normal: [],
    immediateNotification: true,
    batchNotifications: true,
    trendBasedAlerts: true,
    criticalValueCount: '1',
    responseTimeout: '15'
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

  const handleAddPhysician = () => {
    setSelectedPhysician(null);
    setPhysicianPrefs({
      critical: [],
      abnormal: [],
      normal: [],
      immediateNotification: false,
      batchNotifications: false,
      trendBasedAlerts: false,
      criticalValueCount: '1',
      responseTimeout: '15'
    });
    setShowPhysicianModal(true);
  };

  const handleEditPhysician = (physicianId: number) => {
    const physician = physicians.find(p => p.id === physicianId);
    if (physician) {
      setSelectedPhysician(physicianId);
      setPhysicianPrefs({
        ...physician.notificationPreferences,
        ...physician.notificationRules
      });
      setShowPhysicianModal(true);
    }
  };

  const handleClosePhysicianModal = () => {
    setShowPhysicianModal(false);
    setSelectedPhysician(null);
    setPhysicianPrefs({
      critical: [],
      abnormal: [],
      normal: [],
      immediateNotification: true,
      batchNotifications: true,
      trendBasedAlerts: true,
      criticalValueCount: '1',
      responseTimeout: '15'
    });
  };

  const handleSavePhysicianPrefs = () => {
    console.log('Saving physician preferences:', physicianPrefs);
    handleClosePhysicianModal();
  };

  const toggleNotificationMethod = (severity: 'critical' | 'abnormal' | 'normal', method: string) => {
    setPhysicianPrefs(prev => ({
      ...prev,
      [severity]: prev[severity].includes(method)
        ? prev[severity].filter(m => m !== method)
        : [...prev[severity], method]
    }));
  };

  const tabs = [
    { id: 'notifications' as Tab, name: 'Notifications', icon: BellIcon },
    { id: 'thresholds' as Tab, name: 'Thresholds', icon: BeakerIcon },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">Settings</h1>
        {/* <p className="mt-2 text-[var(--text-secondary)]">Configure thresholds, notifications, and physician preferences</p> */}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
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
            <div className="space-y-8">
              {/* Physicians Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Physician Notification Preferences</h2>
                    <p className="text-gray-600 mt-1">
                      Manage physician contact information and notification preferences
                    </p>
                  </div>
                  <button
                    onClick={handleAddPhysician}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#5F4AE8] text-white rounded-lg hover:bg-[#4E3BC7] transition-colors shadow-sm"
                  >
                    <PlusIcon className="h-5 w-5" />
                    Add Physician
                  </button>
                </div>

                <div className="space-y-4">
                  {physicians.map((physician) => (
                    <div key={physician.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-[#5F4AE8] flex items-center justify-center text-white text-lg font-medium flex-shrink-0">
                            {physician.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{physician.name}</p>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                              <p className="text-gray-600">{physician.specialty}</p>
                              <div className="h-3 w-px bg-gray-300"></div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-gray-500">Email:</span>
                                <span className="font-medium text-gray-900">{physician.email}</span>
                              </div>
                              <div className="h-3 w-px bg-gray-300"></div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-gray-500">Phone:</span>
                                <span className="font-medium text-gray-900">{physician.phone}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleEditPhysician(physician.id)}
                          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#5F4AE8] hover:bg-purple-50 rounded-lg transition-colors flex-shrink-0"
                        >
                          <PencilIcon className="h-4 w-4" />
                          Update Preferences
                        </button>
                      </div>

                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-sm font-medium text-gray-900 mb-3">Notification Preferences:</p>
                        <div className="flex flex-wrap gap-4 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">Critical:</span>
                            <div className="flex gap-1.5">
                              {physician.notificationPreferences.critical.map((method) => (
                                <span key={method} className="inline-flex items-center px-2 py-1 rounded font-medium bg-red-100 text-red-800">
                                  {method}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="h-4 w-px bg-gray-300"></div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">Abnormal:</span>
                            <div className="flex gap-1.5">
                              {physician.notificationPreferences.abnormal.length > 0 ? (
                                physician.notificationPreferences.abnormal.map((method) => (
                                  <span key={method} className="inline-flex items-center px-2 py-1 rounded font-medium bg-yellow-100 text-yellow-800">
                                    {method}
                                  </span>
                                ))
                              ) : (
                                <span className="inline-flex items-center px-2 py-1 rounded font-medium bg-gray-100 text-gray-500">None</span>
                              )}
                            </div>
                          </div>
                          <div className="h-4 w-px bg-gray-300"></div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">Normal:</span>
                            <div className="flex gap-1.5">
                              {physician.notificationPreferences.normal.length > 0 ? (
                                physician.notificationPreferences.normal.map((method) => (
                                  <span key={method} className="inline-flex items-center px-2 py-1 rounded font-medium bg-green-100 text-green-800">
                                    {method}
                                  </span>
                                ))
                              ) : (
                                <span className="inline-flex items-center px-2 py-1 rounded font-medium bg-gray-100 text-gray-500">None</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Notification Rules - Horizontal Layout */}
                        <div className="border-t border-gray-200 mt-4 pt-4">
                          <p className="text-sm font-medium text-gray-900 mb-3">Notification Rules:</p>
                          <div className="flex flex-wrap gap-4 text-xs">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">Immediate:</span>
                              <span className={`px-2 py-1 rounded font-medium ${physician.notificationRules.immediateNotification ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                {physician.notificationRules.immediateNotification ? 'On' : 'Off'}
                              </span>
                            </div>
                            <div className="h-4 w-px bg-gray-300"></div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">Batch:</span>
                              <span className={`px-2 py-1 rounded font-medium ${physician.notificationRules.batchNotifications ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                {physician.notificationRules.batchNotifications ? 'On' : 'Off'}
                              </span>
                            </div>
                            <div className="h-4 w-px bg-gray-300"></div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">Trend Alerts:</span>
                              <span className={`px-2 py-1 rounded font-medium ${physician.notificationRules.trendBasedAlerts ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                {physician.notificationRules.trendBasedAlerts ? 'On' : 'Off'}
                              </span>
                            </div>
                            <div className="h-4 w-px bg-gray-300"></div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">Threshold:</span>
                              <span className="px-2 py-1 rounded font-medium bg-blue-100 text-blue-800">
                                {physician.notificationRules.criticalValueCount}+ values
                              </span>
                            </div>
                            <div className="h-4 w-px bg-gray-300"></div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">Timeout:</span>
                              <span className="px-2 py-1 rounded font-medium bg-blue-100 text-blue-800">
                                {physician.notificationRules.responseTimeout} min
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#5F4AE8] text-white rounded-lg hover:bg-[#4E3BC7] transition-colors shadow-sm"
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

      {/* Physician Preferences Modal */}
      {showPhysicianModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
            {/* Modal Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-xl font-bold text-gray-900">
                {selectedPhysician ? 'Update Notification Preferences' : 'Add New Physician'}
              </h3>
              <button
                onClick={handleClosePhysicianModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              <div>
                <p className="text-sm text-gray-600">
                  {selectedPhysician
                    ? `Configure notification preferences for ${physicians.find(p => p.id === selectedPhysician)?.name}`
                    : 'Configure notification preferences for the new physician'
                  }
                </p>
              </div>

              {/* Notification Methods by Severity */}
              <div className="space-y-6">
                <h4 className="text-base font-semibold text-gray-900">Notification Methods</h4>

                {/* Critical Values */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-900">
                    Critical Values
                  </label>
                  <div className="flex gap-3">
                    {['SMS', 'Email', 'Phone'].map(method => (
                      <button
                        key={method}
                        onClick={() => toggleNotificationMethod('critical', method)}
                        className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-colors ${
                          physicianPrefs.critical.includes(method)
                            ? 'border-red-500 bg-red-50 text-red-700'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Abnormal Values */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-900">
                    Abnormal Values
                  </label>
                  <div className="flex gap-3">
                    {['SMS', 'Email', 'Phone'].map(method => (
                      <button
                        key={method}
                        onClick={() => toggleNotificationMethod('abnormal', method)}
                        className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-colors ${
                          physicianPrefs.abnormal.includes(method)
                            ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Normal Values */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-900">
                    Normal Values
                  </label>
                  <div className="flex gap-3">
                    {['SMS', 'Email', 'Phone'].map(method => (
                      <button
                        key={method}
                        onClick={() => toggleNotificationMethod('normal', method)}
                        className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-colors ${
                          physicianPrefs.normal.includes(method)
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Automated Notification Rules */}
              <div className="border-t border-gray-200 pt-6 space-y-4">
                <h4 className="text-base font-semibold text-gray-900">Automated Notification Rules</h4>

                {/* Immediate Notification */}
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <input
                    type="checkbox"
                    id="immediateNotification"
                    checked={physicianPrefs.immediateNotification}
                    onChange={(e) => setPhysicianPrefs({ ...physicianPrefs, immediateNotification: e.target.checked })}
                    className="mt-1 h-4 w-4 text-[#5F4AE8] border-gray-300 rounded focus:ring-[#5F4AE8]"
                  />
                  <div className="flex-1">
                    <label htmlFor="immediateNotification" className="font-medium text-gray-900 cursor-pointer">
                      Immediate notification for critical values
                    </label>
                    <p className="text-sm text-gray-600 mt-1">
                      Notify immediately when any value exceeds critical threshold
                    </p>
                  </div>
                </div>

                {/* Batch Notifications */}
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <input
                    type="checkbox"
                    id="batchNotifications"
                    checked={physicianPrefs.batchNotifications}
                    onChange={(e) => setPhysicianPrefs({ ...physicianPrefs, batchNotifications: e.target.checked })}
                    className="mt-1 h-4 w-4 text-[#5F4AE8] border-gray-300 rounded focus:ring-[#5F4AE8]"
                  />
                  <div className="flex-1">
                    <label htmlFor="batchNotifications" className="font-medium text-gray-900 cursor-pointer">
                      Batch notifications for abnormal values
                    </label>
                    <p className="text-sm text-gray-600 mt-1">
                      Send email digest at scheduled times (9 AM, 2 PM, 5 PM)
                    </p>
                  </div>
                </div>

                {/* Trend-Based Alerts */}
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <input
                    type="checkbox"
                    id="trendBasedAlerts"
                    checked={physicianPrefs.trendBasedAlerts}
                    onChange={(e) => setPhysicianPrefs({ ...physicianPrefs, trendBasedAlerts: e.target.checked })}
                    className="mt-1 h-4 w-4 text-[#5F4AE8] border-gray-300 rounded focus:ring-[#5F4AE8]"
                  />
                  <div className="flex-1">
                    <label htmlFor="trendBasedAlerts" className="font-medium text-gray-900 cursor-pointer">
                      Trend-based alerts
                    </label>
                    <p className="text-sm text-gray-600 mt-1">
                      Notify for declining kidney function (eGFR decline &gt;10% or 3 consecutive creatinine increases)
                    </p>
                  </div>
                </div>
              </div>

              {/* Threshold Settings */}
              <div className="border-t border-gray-200 pt-6 space-y-4">
                <h4 className="text-base font-semibold text-gray-900">Threshold Settings</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Critical value count for immediate notification
                    </label>
                    <select
                      value={physicianPrefs.criticalValueCount}
                      onChange={(e) => setPhysicianPrefs({ ...physicianPrefs, criticalValueCount: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#5F4AE8] focus:border-[#5F4AE8]"
                    >
                      <option value="1">1 or more critical values</option>
                      <option value="2">2 or more critical values</option>
                      <option value="3">3 or more critical values</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Response timeout (for escalation)
                    </label>
                    <select
                      value={physicianPrefs.responseTimeout}
                      onChange={(e) => setPhysicianPrefs({ ...physicianPrefs, responseTimeout: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#5F4AE8] focus:border-[#5F4AE8]"
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">60 minutes</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3 rounded-b-2xl">
              <button
                onClick={handleClosePhysicianModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePhysicianPrefs}
                className="inline-flex items-center gap-2 px-6 py-2 bg-[#5F4AE8] text-white rounded-lg hover:bg-[#4E3BC7] transition-colors shadow-sm"
              >
                <CheckCircleIcon className="h-5 w-5" />
                {selectedPhysician ? 'Save Preferences' : 'Add Physician'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
