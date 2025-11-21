'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  BellIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  PaperAirplaneIcon,
  ClockIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { labReports } from '@/lib/data/dummy-data';

export default function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showProgress, setShowProgress] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(0);
  const [criticalDetected, setCriticalDetected] = useState(false);
  const [newReport, setNewReport] = useState<any>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({ title: '', message: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null);
  const [approvedReport, setApprovedReport] = useState<any>(null);

  // Check for approval redirect
  useEffect(() => {
    if (searchParams.get('approved') === 'true') {
      const patient = searchParams.get('patient');
      const physician = searchParams.get('physician');
      const reportId = searchParams.get('reportId');

      // Find the report and mark it as reviewed
      const report = labReports.find(r => r.id === parseInt(reportId || '0'));
      if (report) {
        const approvedReportData = {
          ...report,
          status: 'reviewed'
        };
        setApprovedReport(approvedReportData);
      }

      setToastMessage({
        title: 'Report Approved Successfully',
        message: `${patient}'s lab results have been approved and ${physician} has been notified.`
      });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
      // Clean up URL
      router.replace('/');
    }
  }, [searchParams, router]);

  const allSteps = [
    { name: 'Fax Ingestion', description: 'Loading Lab report from Quest Diagnostics' },
    { name: 'Information Extraction', description: 'Identifying patient information' },
    { name: 'AI Analysis', description: 'Comparing against thresholds and patient history for Sarah Martinez' },
    { name: 'Physician Notification', description: 'Automatic SMS/Email sent to Dr. Michael Chen' },
  ];

  // Filter reports based on search and severity
  const filterReports = (reports: any[]) => {
    return reports.filter(report => {
      const matchesSearch = searchQuery === '' ||
        report.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.mrn.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSeverity = selectedSeverity === null || report.severity === selectedSeverity;

      return matchesSearch && matchesSeverity;
    });
  };

  // Filter out approved report from pending, exclude it from actioned if it's there
  const allPendingReports = labReports.filter(r =>
    r.status === 'needs_review' && (!approvedReport || r.id !== approvedReport.id)
  );

  // Add approved report to top of actioned list, or newReport from fax intake
  const allActionedReports = approvedReport
    ? [approvedReport, ...labReports.filter(r => r.status === 'reviewed' && r.id !== approvedReport.id)]
    : newReport
    ? [newReport, ...labReports.filter(r => r.status === 'reviewed')]
    : labReports.filter(r => r.status === 'reviewed');

  const pendingReports = filterReports(allPendingReports);
  const actionedReports = filterReports(allActionedReports);

  const simulateFaxIntake = async () => {
    setShowProgress(true);
    setCurrentStep(1); // Show first step immediately
    setCompletedSteps(0); // Start at 0%
    setCriticalDetected(false);
    setNewReport(null);

    // Step 1: Fax Received - complete it
    await new Promise(resolve => setTimeout(resolve, 2500));
    setCurrentStep(2);
    setCompletedSteps(1); // 25%

    // Step 2: Information Extraction - complete it
    await new Promise(resolve => setTimeout(resolve, 4500));
    setCurrentStep(3);
    setCompletedSteps(2); // 50%

    // Step 3: AI Analysis - complete it (twice as long)
    await new Promise(resolve => setTimeout(resolve, 7000));
    setCompletedSteps(3); // 75% - step 3 done immediately

    // Mark step 3 as complete (turn it green)
    setCurrentStep(4);
    await new Promise(resolve => setTimeout(resolve, 100));
    setCriticalDetected(true);

    // Wait before showing physician notification step 4
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Show step 4
    setCurrentStep(5);

    // Complete step 4
    await new Promise(resolve => setTimeout(resolve, 2500));
    setCompletedSteps(4); // 100%

    // Wait a bit at 100% before closing
    await new Promise(resolve => setTimeout(resolve, 1000));

    setShowProgress(false);

    // Create new reviewed report
    const newReviewedReport = {
      id: 999,
      patientId: 999,
      patientName: "Sarah Martinez",
      mrn: "MRN-2024-008",
      reportDate: new Date().toISOString(),
      status: "reviewed",
      severity: "critical",
      criticalValues: 2,
      abnormalValues: 1,
      normalValues: 10,
      labSource: "Quest Diagnostics",
      aiInsights: "Critical hyperkalemia (6.8 mEq/L) with severe cardiac risk. Immediate intervention required. Patient automatically notified physician per protocol. Recommend emergency potassium management and cardiac monitoring.",
    };

    setNewReport(newReviewedReport);

    // Show toast
    setToastMessage({
      title: 'Report Processed Successfully',
      message: `Sarah Martinez's critical lab results have been analyzed and Dr. Michael Chen has been notified via SMS and Email.`
    });
    setShowToast(true);

    // Auto-hide toast after 5 seconds
    setTimeout(() => setShowToast(false), 5000);
  };

  return (
    <div className="space-y-8">
      {/* Header with Search and Filters */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight flex-shrink-0">Lab Reports</h1>

        <div className="flex items-center gap-4 flex-1 max-w-2xl">
          {/* Search Bar */}
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by patient name or MRN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-colors"
            />
          </div>

          {/* Severity Filter Badges */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setSelectedSeverity(selectedSeverity === 'critical' ? null : 'critical')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedSeverity === 'critical'
                  ? 'bg-rose-100 text-rose-800 border-2 border-rose-300'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Critical
            </button>
            <button
              onClick={() => setSelectedSeverity(selectedSeverity === 'abnormal' ? null : 'abnormal')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedSeverity === 'abnormal'
                  ? 'bg-amber-100 text-amber-800 border-2 border-amber-300'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Abnormal
            </button>
            <button
              onClick={() => setSelectedSeverity(selectedSeverity === 'normal' ? null : 'normal')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedSeverity === 'normal'
                  ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-300'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Normal
            </button>
          </div>
        </div>

        <button
          onClick={simulateFaxIntake}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40 flex-shrink-0"
        >
          <PaperAirplaneIcon className="h-5 w-5" />
          Fax Intake Demo
        </button>
      </div>

      {/* Pending Reports */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Pending Review</h2>
          <span className="text-sm text-gray-500">{pendingReports.length} reports</span>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {pendingReports.length === 0 ? (
            <div className="p-12 text-center">
              <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">All Caught Up</h3>
              <p className="text-gray-500 mt-1">No reports pending review</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {pendingReports.map((report) => (
                <div key={report.id} className="p-6 hover:bg-gray-50/50 transition-colors group">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ring-4 ${
                        report.severity === 'critical'
                          ? 'bg-rose-100 text-rose-600 ring-rose-50'
                          : 'bg-amber-100 text-amber-600 ring-amber-50'
                      }`}>
                        <ExclamationTriangleIcon className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-base font-semibold text-gray-900 group-hover:text-[var(--primary)] transition-colors">
                          {report.patientName}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          report.severity === 'critical'
                            ? 'bg-rose-100 text-rose-800 border-rose-200'
                            : 'bg-amber-100 text-amber-800 border-amber-200'
                        }`}>
                          {report.severity === 'critical' ? 'CRITICAL' : 'ABNORMAL'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">MRN: {report.mrn} • {new Date(report.reportDate).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100 mb-3">
                        {report.aiInsights}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                          {report.criticalValues > 0 && (
                            <span className="flex items-center gap-1.5 bg-rose-50 text-rose-700 px-2 py-1 rounded-md">
                              <BellIcon className="h-3.5 w-3.5" />
                              {report.criticalValues} critical values
                            </span>
                          )}
                          {report.abnormalValues > 0 && (
                            <span className="flex items-center gap-1.5 bg-amber-50 text-amber-700 px-2 py-1 rounded-md">
                              {report.abnormalValues} abnormal values
                            </span>
                          )}
                        </div>
                        <Link
                          href={`/reports/${report.id}`}
                          className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-[var(--primary)] hover:bg-[var(--primary-dark)] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                        >
                          Review Report
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Reviewed Reports */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Actioned</h2>
          <span className="text-sm text-gray-500">{actionedReports.length} reports</span>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {actionedReports.length === 0 ? (
            <div className="p-12 text-center">
              <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No Actioned Reports</h3>
              <p className="text-gray-500 mt-1">Reviewed reports will appear here</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {actionedReports.map((report) => {
                // Map patient to physician based on patient data
                const physicianMap: { [key: string]: string } = {
                  'John Smith': 'Dr. Sarah Johnson',
                  'Maria Garcia': 'Dr. Michael Chen',
                  'Robert Davis': 'Dr. Sarah Johnson',
                  'Patricia Williams': 'Dr. Priya Patel',
                  'James Wilson': 'Dr. Sarah Johnson',
                  'Linda Martinez': 'Dr. Michael Chen',
                  'David Thompson': 'Dr. Priya Patel',
                  'Sarah Martinez': 'Dr. Michael Chen'
                };
                const notifiedPhysician = physicianMap[report.patientName] || 'Dr. Sarah Johnson';

                return (
                  <div key={report.id} className="p-6 hover:bg-gray-50/50 transition-colors group">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 ring-4 ring-emerald-50">
                          <CheckCircleIcon className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-base font-semibold text-gray-900 group-hover:text-[var(--primary)] transition-colors">
                            {report.patientName}
                          </h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                            report.severity === 'critical'
                              ? 'bg-rose-100 text-rose-800 border-rose-200'
                              : report.severity === 'abnormal'
                              ? 'bg-amber-100 text-amber-800 border-amber-200'
                              : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                          }`}>
                            {report.severity === 'critical' ? 'CRITICAL' : report.severity === 'abnormal' ? 'ABNORMAL' : 'NORMAL'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">
                          MRN: {report.mrn} • {new Date(report.reportDate).toLocaleDateString()} •
                          <span className="text-emerald-600 font-medium"> Notified: {notifiedPhysician}</span>
                        </p>
                        <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100 mb-3">
                          {report.aiInsights}
                        </p>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                            {report.criticalValues > 0 && (
                              <span className="flex items-center gap-1.5 bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                                {report.criticalValues} critical
                              </span>
                            )}
                            {report.abnormalValues > 0 && (
                              <span className="flex items-center gap-1.5 bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                                {report.abnormalValues} abnormal
                              </span>
                            )}
                            <span className="flex items-center gap-1.5 bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                              {report.normalValues} normal
                            </span>
                          </div>
                          <Link
                            href={`/reports/${report.id}`}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Fax Intake Progress Modal */}
      {showProgress && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
            <div className="text-center mb-8">
              <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <ClockIcon className="h-8 w-8 text-blue-600 animate-pulse" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                Processing Fax Intake
              </h3>
              <p className="text-gray-600">
                End-to-end workflow demonstration
              </p>
            </div>

            {/* Progress Steps */}
            <div className="space-y-4">
              {/* Steps 1-3 (before critical alert) */}
              {allSteps.slice(0, 3).map((step, index) => {
                const stepNumber = index + 1;
                const isCompleted = stepNumber < currentStep;
                const isActive = stepNumber === currentStep;
                const shouldShow = stepNumber <= currentStep;

                if (!shouldShow) return null;

                return (
                  <div
                    key={index}
                    className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                      isCompleted
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-blue-50 border border-blue-200'
                    }`}
                  >
                    <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                      isCompleted ? 'bg-green-500' : 'bg-blue-500'
                    }`}>
                      {isCompleted ? (
                        <CheckCircleIcon className="h-5 w-5 text-white" />
                      ) : (
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{step.name}</p>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                );
              })}

              {/* Critical Alert Card - only show after step 3 is complete */}
              {criticalDetected && currentStep > 3 && (
                <div className="bg-rose-50 border-2 border-rose-300 rounded-xl p-5 animate-in fade-in">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <ExclamationTriangleIcon className="h-8 w-8 text-rose-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-rose-900 text-lg mb-1">Critical Alert Triggered</h4>
                      <p className="text-rose-800 font-medium">
                        Potassium: 6.8 mEq/L detected - Immediate notification required to Dr. Michael Chen
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4 (Physician Notification - after critical alert) */}
              {currentStep >= 5 && (
                <div className="flex items-center gap-4 p-4 rounded-lg transition-all bg-blue-50 border border-blue-200">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-blue-500">
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{allSteps[3].name}</p>
                    <p className="text-sm text-gray-600">{allSteps[3].description}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Progress Bar */}
            <div className="mt-8">
              <div className="flex items-center justify-end mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {Math.round((completedSteps / allSteps.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(completedSteps / allSteps.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-4">
          <div className="bg-emerald-600 text-white rounded-xl shadow-2xl p-4 flex items-start gap-4 max-w-md">
            <div className="flex-shrink-0">
              <CheckCircleIcon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-1">{toastMessage.title}</h4>
              <p className="text-sm text-emerald-100">
                {toastMessage.message}
              </p>
            </div>
            <button
              onClick={() => setShowToast(false)}
              className="flex-shrink-0 text-emerald-200 hover:text-white transition-colors"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
