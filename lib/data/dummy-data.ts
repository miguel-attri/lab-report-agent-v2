// Dummy data for the lab report analyzer prototype

export const patients = [
  {
    id: 1,
    name: "John Smith",
    mrn: "MRN-2024-001",
    dob: "1965-03-15",
    age: 59,
    gender: "Male",
    lastVisit: "2024-11-18",
    ckdStage: "Stage 3b",
    physician: "Dr. Sarah Johnson"
  },
  {
    id: 2,
    name: "Maria Garcia",
    mrn: "MRN-2024-002",
    dob: "1972-07-22",
    age: 52,
    gender: "Female",
    lastVisit: "2024-11-19",
    ckdStage: "Stage 4",
    physician: "Dr. Michael Chen"
  },
  {
    id: 3,
    name: "Robert Johnson",
    mrn: "MRN-2024-003",
    dob: "1958-11-30",
    age: 65,
    gender: "Male",
    lastVisit: "2024-11-20",
    ckdStage: "Stage 5",
    physician: "Dr. Sarah Johnson"
  }
];

export const labReports = [
  {
    id: 1,
    patientId: 1,
    patientName: "John Smith",
    mrn: "MRN-2024-001",
    reportDate: "2024-11-20T09:30:00",
    status: "needs_review",
    severity: "critical",
    criticalValues: 3,
    abnormalValues: 2,
    normalValues: 8,
    labSource: "Quest Diagnostics",
    values: [
      {
        testName: "Potassium",
        value: 6.2,
        unit: "mEq/L",
        normalRange: "3.5-5.0",
        status: "critical",
        previousValue: 5.8,
        trend: "up",
        changePercent: 6.9
      },
      {
        testName: "Creatinine",
        value: 3.8,
        unit: "mg/dL",
        normalRange: "0.7-1.3",
        status: "critical",
        previousValue: 3.2,
        trend: "up",
        changePercent: 18.8
      },
      {
        testName: "eGFR",
        value: 18,
        unit: "mL/min/1.73m²",
        normalRange: ">60",
        status: "critical",
        previousValue: 22,
        trend: "down",
        changePercent: -18.2
      },
      {
        testName: "BUN",
        value: 48,
        unit: "mg/dL",
        normalRange: "7-20",
        status: "abnormal",
        previousValue: 42,
        trend: "up",
        changePercent: 14.3
      },
      {
        testName: "Sodium",
        value: 132,
        unit: "mEq/L",
        normalRange: "136-145",
        status: "abnormal",
        previousValue: 135,
        trend: "down",
        changePercent: -2.2
      },
      {
        testName: "Hemoglobin",
        value: 10.2,
        unit: "g/dL",
        normalRange: "13.5-17.5",
        status: "borderline",
        previousValue: 10.5,
        trend: "down",
        changePercent: -2.9
      }
    ],
    aiInsights: "Patient shows significant decline in kidney function with eGFR dropping from 22 to 18 mL/min/1.73m². Combined with elevated potassium (6.2 mEq/L) and rising creatinine (3.8 mg/dL), this indicates progression to Stage 5 CKD. Immediate physician notification recommended for potential dialysis evaluation and urgent potassium management.",
    recommendations: [
      "Immediate notification to nephrologist - Critical hyperkalemia",
      "Consider emergent dialysis evaluation given eGFR <20",
      "Dietary potassium restriction and medication review",
      "Follow-up labs within 24-48 hours"
    ]
  },
  {
    id: 2,
    patientId: 2,
    patientName: "Maria Garcia",
    mrn: "MRN-2024-002",
    reportDate: "2024-11-19T14:15:00",
    status: "reviewed",
    severity: "abnormal",
    criticalValues: 0,
    abnormalValues: 3,
    normalValues: 10,
    labSource: "LabCorp",
    values: [
      {
        testName: "Creatinine",
        value: 2.4,
        unit: "mg/dL",
        normalRange: "0.6-1.2",
        status: "abnormal",
        previousValue: 2.2,
        trend: "up",
        changePercent: 9.1
      },
      {
        testName: "eGFR",
        value: 28,
        unit: "mL/min/1.73m²",
        normalRange: ">60",
        status: "abnormal",
        previousValue: 31,
        trend: "down",
        changePercent: -9.7
      },
      {
        testName: "Potassium",
        value: 4.8,
        unit: "mEq/L",
        normalRange: "3.5-5.0",
        status: "normal",
        previousValue: 4.6,
        trend: "stable",
        changePercent: 4.3
      }
    ],
    aiInsights: "Gradual progression of CKD Stage 4. eGFR decline of ~10% warrants close monitoring but no immediate intervention required. Patient maintaining stable electrolyte balance.",
    recommendations: [
      "Continue current CKD management protocol",
      "Recheck labs in 4-6 weeks",
      "Monitor for symptoms of uremia"
    ]
  },
  {
    id: 3,
    patientId: 3,
    patientName: "Robert Johnson",
    mrn: "MRN-2024-003",
    reportDate: "2024-11-20T11:00:00",
    status: "needs_review",
    severity: "critical",
    criticalValues: 2,
    abnormalValues: 4,
    normalValues: 7,
    labSource: "Quest Diagnostics",
    values: [
      {
        testName: "Potassium",
        value: 6.5,
        unit: "mEq/L",
        normalRange: "3.5-5.0",
        status: "critical",
        previousValue: 5.2,
        trend: "up",
        changePercent: 25.0
      },
      {
        testName: "eGFR",
        value: 12,
        unit: "mL/min/1.73m²",
        normalRange: ">60",
        status: "critical",
        previousValue: 15,
        trend: "down",
        changePercent: -20.0
      }
    ],
    aiInsights: "URGENT: Severe hyperkalemia (6.5 mEq/L) in Stage 5 CKD patient. Immediate intervention required to prevent cardiac complications.",
    recommendations: [
      "STAT notification to physician",
      "Consider emergency department referral",
      "Immediate ECG and cardiac monitoring",
      "Urgent dialysis may be indicated"
    ]
  }
];

export const notifications = [
  {
    id: 1,
    patientName: "John Smith",
    mrn: "MRN-2024-001",
    reportId: 1,
    type: "critical",
    title: "Critical Lab Values Detected",
    message: "Potassium: 6.2 mEq/L (Critical High), eGFR: 18 mL/min/1.73m²",
    timestamp: "2024-11-20T09:35:00",
    read: false,
    physicianNotified: true,
    physicianName: "Dr. Sarah Johnson",
    notificationMethod: "SMS + Email"
  },
  {
    id: 2,
    patientName: "Robert Johnson",
    mrn: "MRN-2024-003",
    reportId: 3,
    type: "critical",
    title: "Severe Hyperkalemia Alert",
    message: "Potassium: 6.5 mEq/L - Immediate intervention required",
    timestamp: "2024-11-20T11:05:00",
    read: false,
    physicianNotified: true,
    physicianName: "Dr. Sarah Johnson",
    notificationMethod: "SMS + Email + Phone"
  },
  {
    id: 3,
    patientName: "Maria Garcia",
    mrn: "MRN-2024-002",
    reportId: 2,
    type: "abnormal",
    title: "CKD Progression Noted",
    message: "eGFR declined from 31 to 28 mL/min/1.73m²",
    timestamp: "2024-11-19T14:20:00",
    read: true,
    physicianNotified: true,
    physicianName: "Dr. Michael Chen",
    notificationMethod: "Email"
  }
];

export const dashboardStats = {
  totalReports: 24,
  pendingReviews: 5,
  criticalAlerts: 2,
  reviewedToday: 12,
  averageProcessingTime: "45 seconds",
  physicianNotificationsSent: 18
};

export const physicians = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Nephrology",
    email: "sjohnson@renalclinic.com",
    phone: "+1 (713) 555-0101",
    notificationPreferences: {
      critical: ["SMS", "Email", "Phone"],
      abnormal: ["Email"],
      normal: []
    }
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Nephrology",
    email: "mchen@renalclinic.com",
    phone: "+1 (713) 555-0102",
    notificationPreferences: {
      critical: ["SMS", "Email"],
      abnormal: ["Email"],
      normal: []
    }
  },
  {
    id: 3,
    name: "Dr. Priya Patel",
    specialty: "Nephrology",
    email: "ppatel@renalclinic.com",
    phone: "+1 (713) 555-0103",
    notificationPreferences: {
      critical: ["SMS", "Email", "Phone"],
      abnormal: ["SMS", "Email"],
      normal: ["Email"]
    }
  }
];

export const thresholds = [
  {
    testName: "Potassium",
    unit: "mEq/L",
    category: "Electrolytes",
    normalMin: 3.5,
    normalMax: 5.0,
    criticalLow: 2.5,
    criticalHigh: 6.0,
    notifyPhysician: true,
    autoNotifyThreshold: "critical"
  },
  {
    testName: "Creatinine",
    unit: "mg/dL",
    category: "Nephrology",
    normalMin: 0.7,
    normalMax: 1.3,
    criticalLow: null,
    criticalHigh: 4.0,
    notifyPhysician: true,
    autoNotifyThreshold: "critical"
  },
  {
    testName: "eGFR",
    unit: "mL/min/1.73m²",
    category: "Nephrology",
    normalMin: 60,
    normalMax: null,
    criticalLow: 15,
    criticalHigh: null,
    notifyPhysician: true,
    autoNotifyThreshold: "critical"
  }
];

export const recentActivity = [
  {
    id: 1,
    type: "fax_received",
    message: "Lab report received via fax for John Smith",
    timestamp: "2024-11-20T09:30:00",
    details: "Quest Diagnostics - 3 pages"
  },
  {
    id: 2,
    type: "analysis_complete",
    message: "AI analysis completed for John Smith",
    timestamp: "2024-11-20T09:30:45",
    details: "3 critical values detected"
  },
  {
    id: 3,
    type: "notification_sent",
    message: "Critical alert sent to Dr. Sarah Johnson",
    timestamp: "2024-11-20T09:31:00",
    details: "SMS + Email notification"
  },
  {
    id: 4,
    type: "review_completed",
    message: "Report reviewed and approved by Staff",
    timestamp: "2024-11-20T09:45:00",
    details: "Notification sent to physician"
  }
];
