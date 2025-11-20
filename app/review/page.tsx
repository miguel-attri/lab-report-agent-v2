'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  MinusIcon,
  BellAlertIcon,
  CheckCircleIcon,
  XCircleIcon,
  EnvelopeIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import { labReports, patients } from '@/lib/data/dummy-data';

export default function ReviewPage() {
  const searchParams = useSearchParams();
  const reportIdParam = searchParams?.get('reportId');
  const justAnalyzed = searchParams?.get('justAnalyzed');

  const [selectedReport, setSelectedReport] = useState(reportIdParam ? parseInt(reportIdParam) : null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    if (justAnalyzed) {
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 5000);
    }
  }, [justAnalyzed]);

  const report = labReports.find(r => r.id === selectedReport);
  const patient = report ? patients.find(p => p.id === report.patientId) : null;

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <ArrowTrendingUpIcon className="h-4 w-4 text-red-500" />;
    if (trend === 'down') return <ArrowTrendingDownIcon className="h-4 w-4 text-blue-500" />;
    return <MinusIcon className="h-4 w-4 text-gray-400" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'abnormal': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'borderline': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const handleApprove = () => {
    alert('Notification approved and sent to physician!');
    setSelectedReport(null);
  };

  const handleReject = () => {
    alert('Report marked for revision');
    setSelectedReport(null);
  };

  return (
    <div className="p-8">
      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed top-4 right-4 bg-green-50 border border-green-200 rounded-lg shadow-lg p-4 flex items-center gap-3 z-50 animate-slide-in">
          <CheckCircleIcon className="h-6 w-6 text-green-600" />
          <div>
            <p className="font-medium text-green-900">Analysis Complete!</p>
            <p className="text-sm text-green-700">Report ready for review</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Review Notifications</h1>
        <p className="mt-2 text-gray-600">Review lab reports and approve physician notifications</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reports List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">Pending Reviews</h2>
            </div>
            <div className="divide-y divide-gray-200 max-h-[calc(100vh-300px)] overflow-y-auto">
              {labReports.filter(r => r.status === 'needs_review').map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedReport(r.id)}
                  className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                    selectedReport === r.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{r.patientName}</p>
                      <p className="text-sm text-gray-600">{r.mrn}</p>
                    </div>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
                      r.severity === 'critical' ? 'bg-red-100 text-red-800 border-red-200' : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                    }`}>
                      {r.severity.toUpperCase()}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                    <BellAlertIcon className="h-4 w-4" />
                    <span>{r.criticalValues} critical</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Report Detail */}
        <div className="lg:col-span-2">
          {!report ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <BellAlertIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600">Select a report to review</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Patient Info */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium text-gray-900">{report.patientName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">MRN</p>
                    <p className="font-medium text-gray-900">{report.mrn}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">CKD Stage</p>
                    <p className="font-medium text-gray-900">{patient?.ckdStage}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Physician</p>
                    <p className="font-medium text-gray-900">{patient?.physician}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Report Date</p>
                    <p className="font-medium text-gray-900">
                      {new Date(report.reportDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Lab Source</p>
                    <p className="font-medium text-gray-900">{report.labSource}</p>
                  </div>
                </div>
              </div>

              {/* Lab Values with Trend Analysis */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Lab Values & Trend Analysis</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Test
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Current
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Previous
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Change
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Normal Range
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {report.values.map((value, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <p className="font-medium text-gray-900">{value.testName}</p>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <p className="font-semibold text-gray-900">
                              {value.value} {value.unit}
                            </p>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <p className="text-gray-600">
                              {value.previousValue ? `${value.previousValue} ${value.unit}` : 'N/A'}
                            </p>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center gap-1">
                              {getTrendIcon(value.trend || 'stable')}
                              <span className={`text-sm font-medium ${
                                value.trend === 'up' ? 'text-red-600' :
                                value.trend === 'down' ? 'text-blue-600' :
                                'text-gray-600'
                              }`}>
                                {value.changePercent ? `${value.changePercent > 0 ? '+' : ''}${value.changePercent.toFixed(1)}%` : 'N/A'}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                            {value.normalRange}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(value.status)}`}>
                              {value.status.toUpperCase()}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* AI Insights */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-blue-900 mb-3">AI Clinical Insights</h2>
                <p className="text-blue-800 mb-4">{report.aiInsights}</p>
                <div>
                  <p className="font-semibold text-blue-900 mb-2">Recommendations:</p>
                  <ul className="space-y-1">
                    {report.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-blue-800">
                        <CheckCircleIcon className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Physician Notification */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Physician Notification</h2>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-[#5F4AE8] flex items-center justify-center text-white font-medium">
                      SJ
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{patient?.physician}</p>
                      <p className="text-sm text-gray-600">Nephrologist</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <EnvelopeIcon className="h-4 w-4" />
                      <span>Email</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <PhoneIcon className="h-4 w-4" />
                      <span>SMS</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleApprove}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors"
                  >
                    <CheckCircleIcon className="h-5 w-5" />
                    Approve & Send Notification
                  </button>
                  <button
                    onClick={handleReject}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <XCircleIcon className="h-5 w-5" />
                    Mark for Revision
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
