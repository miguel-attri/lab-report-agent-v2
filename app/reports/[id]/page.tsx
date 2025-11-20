'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  MinusIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';
import { labReports, physicians } from '@/lib/data/dummy-data';

export default function ReportDetailPage() {
  const params = useParams();
  const router = useRouter();
  const reportId = parseInt(params.id as string);
  const report = labReports.find(r => r.id === reportId);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [selectedPhysician, setSelectedPhysician] = useState<number | null>(null);

  if (!report) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Report Not Found</h1>
          <p className="text-gray-600 mb-4">The requested report could not be found.</p>
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#5F4AE8] text-white rounded-lg hover:bg-[#4E3BC7] transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Back to Reports
          </button>
        </div>
      </div>
    );
  }

  const handleApproveAndNotify = () => {
    console.log('Approved and notifying physician:', selectedPhysician);
    setShowNotificationModal(false);
    // In real app, would update status and send notification
    router.push('/');
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => router.push('/')}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        Back to Reports
      </button>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">{report.patientName}</h1>
          <p className="mt-2 text-[var(--text-secondary)]">MRN: {report.mrn} • {new Date(report.reportDate).toLocaleString()}</p>
        </div>
        {report.status === 'needs_review' ? (
          <button
            onClick={() => setShowNotificationModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#5F4AE8] text-white rounded-lg hover:bg-[#4E3BC7] transition-colors shadow-sm"
          >
            <CheckCircleIcon className="h-5 w-5" />
            Approve & Notify Physician
          </button>
        ) : (
          (() => {
            // Map patient to physician based on patient data
            const physicianMap: { [key: string]: { name: string; notificationMethod: string } } = {
              'John Smith': { name: 'Dr. Sarah Johnson', notificationMethod: 'SMS + Email' },
              'Maria Garcia': { name: 'Dr. Michael Chen', notificationMethod: 'Email' },
              'Robert Davis': { name: 'Dr. Sarah Johnson', notificationMethod: 'SMS + Email + Phone' },
              'Patricia Williams': { name: 'Dr. Priya Patel', notificationMethod: 'SMS + Email + Phone' },
              'James Wilson': { name: 'Dr. Sarah Johnson', notificationMethod: 'SMS + Email' },
              'Linda Martinez': { name: 'Dr. Michael Chen', notificationMethod: 'Email' },
              'David Thompson': { name: 'Dr. Priya Patel', notificationMethod: 'SMS + Email' }
            };
            const physicianInfo = physicianMap[report.patientName] || { name: 'Dr. Sarah Johnson', notificationMethod: 'SMS + Email' };

            return (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 min-w-[400px]">
                <div className="flex items-center justify-between gap-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <CheckCircleIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Physician Notified</h4>
                      <p className="text-xs text-gray-600">
                        {physicianInfo.name} • {new Date(report.reportDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    {physicianInfo.notificationMethod.split(' + ').map((method) => (
                      <span key={method} className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-emerald-100 text-emerald-800">
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()
        )}
      </div>

      {/* Status Badges */}
      <div className="flex items-center gap-3">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
          report.severity === 'critical'
            ? 'bg-rose-100 text-rose-800 border border-rose-200'
            : report.severity === 'abnormal'
            ? 'bg-amber-100 text-amber-800 border border-amber-200'
            : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
        }`}>
          {report.severity === 'critical' ? 'CRITICAL' : report.severity === 'abnormal' ? 'ABNORMAL' : 'NORMAL'}
        </span>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
          report.status === 'needs_review'
            ? 'bg-amber-100 text-amber-800 border border-amber-200'
            : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
        }`}>
          {report.status === 'needs_review' ? 'NEEDS REVIEW' : 'REVIEWED'}
        </span>
        <span className="text-sm text-gray-500">
          Lab Source: {report.labSource}
        </span>
      </div>

      {/* AI Insights */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 text-sm font-bold">AI</span>
          Analysis & Insights
        </h4>
        <p className="text-gray-700 leading-relaxed">{report.aiInsights}</p>
      </div>

      {/* Recommendations */}
      {report.recommendations && report.recommendations.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h4 className="font-semibold text-gray-900 mb-4 text-lg">Recommendations</h4>
          <ul className="space-y-3">
            {report.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-700">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#5F4AE8] text-white text-xs font-bold flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Value Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
          <p className="text-3xl font-bold text-rose-700">{report.criticalValues}</p>
          <p className="text-sm text-gray-600 font-medium mt-2">Critical Values</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
          <p className="text-3xl font-bold text-amber-700">{report.abnormalValues}</p>
          <p className="text-sm text-gray-600 font-medium mt-2">Abnormal Values</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
          <p className="text-3xl font-bold text-emerald-700">{report.normalValues}</p>
          <p className="text-sm text-gray-600 font-medium mt-2">Normal Values</p>
        </div>
      </div>

      {/* Lab Values */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h4 className="font-semibold text-gray-900 mb-4 text-lg">Lab Values</h4>
        <div className="space-y-3">
          {report.values.map((value, index) => (
            <div key={index} className={`p-4 rounded-lg border ${
              value.status === 'critical' ? 'bg-rose-50 border-rose-200' :
              value.status === 'abnormal' ? 'bg-amber-50 border-amber-200' :
              'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium text-gray-900">{value.testName}</p>
                  <p className="text-xs text-gray-500">Normal Range: {value.normalRange}</p>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    value.status === 'critical' ? 'text-rose-700' :
                    value.status === 'abnormal' ? 'text-amber-700' :
                    'text-gray-900'
                  }`}>
                    {value.value} <span className="text-sm font-normal">{value.unit}</span>
                  </p>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    value.status === 'critical' ? 'bg-rose-100 text-rose-800' :
                    value.status === 'abnormal' ? 'bg-amber-100 text-amber-800' :
                    'bg-emerald-100 text-emerald-800'
                  }`}>
                    {value.status.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Trend Information */}
              {value.previousValue !== undefined && (
                <div className="flex items-center gap-4 text-sm mt-2 pt-2 border-t border-gray-200">
                  <div className="flex items-center gap-1.5">
                    {value.trend === 'up' && <ArrowTrendingUpIcon className="h-4 w-4 text-rose-600" />}
                    {value.trend === 'down' && <ArrowTrendingDownIcon className="h-4 w-4 text-blue-600" />}
                    {value.trend === 'stable' && <MinusIcon className="h-4 w-4 text-gray-600" />}
                    <span className="text-gray-600">
                      {value.trend === 'up' ? 'Increased' : value.trend === 'down' ? 'Decreased' : 'Stable'}
                    </span>
                  </div>
                  <span className="text-gray-500">
                    Previous: {value.previousValue} {value.unit}
                  </span>
                  <span className={`font-medium ${
                    value.trend === 'up' && value.status !== 'normal' ? 'text-rose-600' :
                    value.trend === 'down' && value.status !== 'normal' ? 'text-blue-600' :
                    'text-gray-600'
                  }`}>
                    {value.changePercent > 0 ? '+' : ''}{value.changePercent.toFixed(1)}%
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Notification Modal */}
      {showNotificationModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Approve & Notify Physician</h3>
              <p className="text-sm text-gray-500 mt-1">Select the physician to notify about this report</p>
            </div>

            <div className="p-6 space-y-4">
              {physicians.map((physician) => (
                <div
                  key={physician.id}
                  onClick={() => setSelectedPhysician(physician.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedPhysician === physician.id
                      ? 'border-[#5F4AE8] bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-[#5F4AE8] flex items-center justify-center text-white text-lg font-medium">
                      {physician.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{physician.name}</p>
                      <p className="text-sm text-gray-600">{physician.specialty}</p>
                      <p className="text-xs text-gray-500 mt-1">{physician.email}</p>
                    </div>
                    {selectedPhysician === physician.id && (
                      <CheckCircleIcon className="h-6 w-6 text-[#5F4AE8]" />
                    )}
                  </div>

                  {selectedPhysician === physician.id && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs font-medium text-gray-700 mb-2">Notification Methods:</p>
                      <div className="flex gap-2">
                        {report.severity === 'critical'
                          ? physician.notificationPreferences.critical.map((method) => (
                              <span key={method} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800">
                                {method}
                              </span>
                            ))
                          : physician.notificationPreferences.abnormal.map((method) => (
                              <span key={method} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                {method}
                              </span>
                            ))
                        }
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowNotificationModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleApproveAndNotify}
                disabled={!selectedPhysician}
                className="inline-flex items-center gap-2 px-6 py-2 bg-[#5F4AE8] text-white rounded-lg hover:bg-[#4E3BC7] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PaperAirplaneIcon className="h-5 w-5" />
                Send Notification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
