'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CloudArrowUpIcon,
  DocumentTextIcon,
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
    { name: 'Text Extraction', description: 'Extracting text from PDF' },
    { name: 'Data Parsing', description: 'Identifying patient info and lab values' },
    { name: 'Threshold Comparison', description: 'Comparing against medical standards' },
    { name: 'AI Analysis', description: 'Applying clinical reasoning' },
    { name: 'Report Generation', description: 'Creating detailed analysis report' },
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const analyzeFile = async () => {
    if (!selectedFile) return;

    setShowProgress(true);
    setIsAnalyzing(true);
    setCurrentStep(0);

    // Simulate analysis steps
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCurrentStep(i + 1);
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    router.push('/reports/1');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">Lab Report Analyzer</h1>
        {/* <p className="mt-2 text-[var(--text-secondary)]">Upload a lab report for AI-powered analysis</p> */}
      </div>

      {/* Main Content */}
      <div>
        {/* File Upload */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <div className="text-center">
            <div className="mx-auto h-20 w-20 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <CloudArrowUpIcon className="h-10 w-10 text-purple-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Upload Lab Report</h2>
            <p className="text-gray-600 mb-8">
              Upload a PDF, DOC, or TXT file for AI-powered analysis
            </p>

            {/* Dropzone */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 mb-6 hover:border-[#5F4AE8] transition-colors">
              <input
                type="file"
                id="fileInput"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileSelect}
                className="hidden"
              />
              <label htmlFor="fileInput" className="cursor-pointer">
                <DocumentTextIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <p className="text-sm text-gray-600 mb-2 font-medium">
                  {selectedFile ? selectedFile.name : 'Click to browse or drag and drop'}
                </p>
                <p className="text-xs text-gray-500">
                  PDF, DOC, DOCX, or TXT (Max 10MB)
                </p>
              </label>
            </div>

            {selectedFile && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left border border-gray-100">
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
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={analyzeFile}
                disabled={!selectedFile || isAnalyzing}
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-lg text-white bg-[#5F4AE8] hover:bg-[#4E3BC7] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                <CloudArrowUpIcon className="h-5 w-5" />
                {isAnalyzing ? 'Analyzing...' : 'Upload & Analyze'}
              </button>
            </div>
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
