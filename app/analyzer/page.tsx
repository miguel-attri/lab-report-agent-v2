'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CloudArrowUpIcon,
  DocumentTextIcon,
  PaperAirplaneIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function AnalyzerPage() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { name: 'Fax Received', description: 'Lab report received via fax' },
    { name: 'Text Extraction', description: 'Extracting text from PDF' },
    { name: 'Data Parsing', description: 'Identifying patient info and lab values' },
    { name: 'Threshold Comparison', description: 'Comparing against medical standards' },
    { name: 'AI Analysis', description: 'Applying clinical reasoning' },
    { name: 'Notification', description: 'Sending alerts to physicians' },
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const simulateFaxIntake = async () => {
    setShowProgress(true);
    setIsAnalyzing(true);
    setCurrentStep(0);

    // Simulate each step of the process
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCurrentStep(i + 1);
    }

    // Wait a moment then redirect to review page
    await new Promise(resolve => setTimeout(resolve, 1000));
    router.push('/review?reportId=1&justAnalyzed=true');
  };

  const analyzeFile = async () => {
    if (!selectedFile) return;

    setShowProgress(true);
    setIsAnalyzing(true);
    setCurrentStep(1); // Skip fax received step for file upload

    // Simulate analysis steps (skip first step for file upload)
    for (let i = 1; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCurrentStep(i + 1);
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    router.push('/review?reportId=1&justAnalyzed=true');
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Lab Report Analyzer</h1>
        <p className="mt-2 text-gray-600">Upload a report or simulate end-to-end fax intake workflow</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Fax Intake Simulation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <div className="mx-auto h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <PaperAirplaneIcon className="h-10 w-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Fax Intake Simulation</h2>
            <p className="text-gray-600 mb-8">
              Simulate the complete end-to-end workflow from fax receipt through automated physician notification
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-semibold text-gray-900 mb-3">What happens:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Fax is received from lab (Quest Diagnostics)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>AI extracts and analyzes lab values automatically</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Critical values flagged with clinical insights</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Physician notified immediately via SMS/Email</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Staff reviews and approves notification</span>
                </li>
              </ul>
            </div>

            <button
              onClick={simulateFaxIntake}
              disabled={isAnalyzing}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-[#5F4AE8] hover:bg-[#4E3BC7] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
              {isAnalyzing ? 'Simulating...' : 'Simulate Fax Intake'}
            </button>

            <p className="mt-4 text-xs text-gray-500">
              Uses dummy data for patient: John Smith (MRN-2024-001)
            </p>
          </div>
        </div>

        {/* File Upload */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <div className="mx-auto h-20 w-20 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <CloudArrowUpIcon className="h-10 w-10 text-purple-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Upload Lab Report</h2>
            <p className="text-gray-600 mb-8">
              Upload a PDF, DOC, or TXT file for AI-powered analysis
            </p>

            {/* Dropzone */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 hover:border-[#5F4AE8] transition-colors">
              <input
                type="file"
                id="fileInput"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileSelect}
                className="hidden"
              />
              <label htmlFor="fileInput" className="cursor-pointer">
                <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-sm text-gray-600 mb-2">
                  {selectedFile ? selectedFile.name : 'Click to browse or drag and drop'}
                </p>
                <p className="text-xs text-gray-500">
                  PDF, DOC, DOCX, or TXT (Max 10MB)
                </p>
              </label>
            </div>

            {selectedFile && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <DocumentTextIcon className="h-8 w-8 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                      <p className="text-xs text-gray-500">
                        {(selectedFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={analyzeFile}
              disabled={!selectedFile || isAnalyzing}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <CloudArrowUpIcon className="h-5 w-5" />
              {isAnalyzing ? 'Analyzing...' : 'Upload & Analyze'}
            </button>
          </div>
        </div>
      </div>

      {/* Progress Modal */}
      {showProgress && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 p-8">
            <div className="text-center mb-8">
              <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <ClockIcon className="h-8 w-8 text-blue-600 animate-pulse" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                Processing Lab Report
              </h3>
              <p className="text-gray-600">
                AI-powered analysis in progress
              </p>
            </div>

            {/* Progress Steps */}
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                    index < currentStep
                      ? 'bg-green-50 border border-green-200'
                      : index === currentStep
                      ? 'bg-blue-50 border border-blue-200'
                      : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                    index < currentStep
                      ? 'bg-green-500'
                      : index === currentStep
                      ? 'bg-blue-500 animate-pulse'
                      : 'bg-gray-300'
                  }`}>
                    {index < currentStep ? (
                      <CheckCircleIcon className="h-5 w-5 text-white" />
                    ) : (
                      <span className="text-white text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${
                      index <= currentStep ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.name}
                    </p>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Step {currentStep} of {steps.length}
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {Math.round((currentStep / steps.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#5F4AE8] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(currentStep / steps.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
