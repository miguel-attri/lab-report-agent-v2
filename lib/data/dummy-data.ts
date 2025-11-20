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
    name: "Robert Davis",
    mrn: "MRN-2024-003",
    dob: "1958-11-30",
    age: 65,
    gender: "Male",
    lastVisit: "2024-11-20",
    ckdStage: "Stage 5",
    physician: "Dr. Sarah Johnson"
  },
  {
    id: 4,
    name: "Patricia Williams",
    mrn: "MRN-2024-004",
    dob: "1968-05-12",
    age: 56,
    gender: "Female",
    lastVisit: "2024-11-18",
    ckdStage: "Stage 3a",
    physician: "Dr. Priya Patel"
  },
  {
    id: 5,
    name: "James Wilson",
    mrn: "MRN-2024-005",
    dob: "1961-09-08",
    age: 63,
    gender: "Male",
    lastVisit: "2024-11-17",
    ckdStage: "Stage 5",
    physician: "Dr. Sarah Johnson"
  },
  {
    id: 6,
    name: "Linda Martinez",
    mrn: "MRN-2024-006",
    dob: "1970-12-20",
    age: 53,
    gender: "Female",
    lastVisit: "2024-11-15",
    ckdStage: "Stage 3b",
    physician: "Dr. Michael Chen"
  },
  {
    id: 7,
    name: "David Thompson",
    mrn: "MRN-2024-007",
    dob: "1963-04-17",
    age: 61,
    gender: "Male",
    lastVisit: "2024-11-14",
    ckdStage: "Stage 4",
    physician: "Dr. Priya Patel"
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
    id: 4,
    patientId: 4,
    patientName: "Patricia Williams",
    mrn: "MRN-2024-004",
    reportDate: "2024-11-18T10:30:00",
    status: "reviewed",
    severity: "critical",
    criticalValues: 1,
    abnormalValues: 2,
    normalValues: 10,
    labSource: "Quest Diagnostics",
    values: [
      {
        testName: "Potassium",
        value: 6.1,
        unit: "mEq/L",
        normalRange: "3.5-5.0",
        status: "critical",
        previousValue: 5.7,
        trend: "up",
        changePercent: 7.0
      },
      {
        testName: "Creatinine",
        value: 3.2,
        unit: "mg/dL",
        normalRange: "0.7-1.3",
        status: "abnormal",
        previousValue: 2.9,
        trend: "up",
        changePercent: 10.3
      },
      {
        testName: "BUN",
        value: 52,
        unit: "mg/dL",
        normalRange: "7-20",
        status: "abnormal",
        previousValue: 48,
        trend: "up",
        changePercent: 8.3
      }
    ],
    aiInsights: "Critical hyperkalemia requiring immediate intervention. Patient was contacted and medication adjustments made. Potassium normalized with loop diuretic increase and dietary modifications.",
    recommendations: [
      "Increased furosemide dose to 80mg BID",
      "Dietary potassium restriction counseling completed",
      "Follow-up labs in 48 hours to confirm improvement",
      "Patient educated on high-potassium foods to avoid"
    ]
  },
  {
    id: 5,
    patientId: 5,
    patientName: "James Wilson",
    mrn: "MRN-2024-005",
    reportDate: "2024-11-17T08:45:00",
    status: "reviewed",
    severity: "critical",
    criticalValues: 2,
    abnormalValues: 3,
    normalValues: 8,
    labSource: "LabCorp",
    values: [
      {
        testName: "Potassium",
        value: 6.3,
        unit: "mEq/L",
        normalRange: "3.5-5.0",
        status: "critical",
        previousValue: 5.8,
        trend: "up",
        changePercent: 8.6
      },
      {
        testName: "BUN",
        value: 85,
        unit: "mg/dL",
        normalRange: "7-20",
        status: "abnormal",
        previousValue: 72,
        trend: "up",
        changePercent: 18.1
      },
      {
        testName: "Creatinine",
        value: 6.2,
        unit: "mg/dL",
        normalRange: "0.7-1.3",
        status: "abnormal",
        previousValue: 5.8,
        trend: "up",
        changePercent: 6.9
      },
      {
        testName: "eGFR",
        value: 9,
        unit: "mL/min/1.73m²",
        normalRange: ">60",
        status: "critical",
        previousValue: 11,
        trend: "down",
        changePercent: -18.2
      },
      {
        testName: "Bicarbonate",
        value: 16,
        unit: "mEq/L",
        normalRange: "22-28",
        status: "abnormal",
        previousValue: 18,
        trend: "down",
        changePercent: -11.1
      }
    ],
    aiInsights: "Critical hyperkalemia and severe kidney function decline (eGFR 9). Patient admitted for urgent hemodialysis initiation. Temporary catheter placed, first dialysis session completed successfully.",
    recommendations: [
      "Emergency hemodialysis initiated - completed first session",
      "Temporary dialysis catheter placed in IR",
      "AV fistula creation scheduled for next week",
      "Patient enrolled in dialysis education program",
      "Nephrology team coordinating ongoing care"
    ]
  },
  {
    id: 6,
    patientId: 6,
    patientName: "Linda Martinez",
    mrn: "MRN-2024-006",
    reportDate: "2024-11-15T13:20:00",
    status: "reviewed",
    severity: "normal",
    criticalValues: 0,
    abnormalValues: 0,
    normalValues: 13,
    labSource: "Quest Diagnostics",
    values: [
      {
        testName: "Hemoglobin",
        value: 11.5,
        unit: "g/dL",
        normalRange: "11.0-15.0",
        status: "normal",
        previousValue: 11.2,
        trend: "stable",
        changePercent: 2.7
      },
      {
        testName: "Calcium",
        value: 9.2,
        unit: "mg/dL",
        normalRange: "8.5-10.5",
        status: "normal",
        previousValue: 9.0,
        trend: "stable",
        changePercent: 2.2
      }
    ],
    aiInsights: "All values within normal limits. Anemia management effective with current ESA dosing. Calcium-phosphate balance well controlled.",
    recommendations: [
      "Continue current treatment plan",
      "Routine follow-up in 6 weeks"
    ]
  },
  {
    id: 7,
    patientId: 7,
    patientName: "David Thompson",
    mrn: "MRN-2024-007",
    reportDate: "2024-11-14T09:15:00",
    status: "reviewed",
    severity: "abnormal",
    criticalValues: 0,
    abnormalValues: 2,
    normalValues: 11,
    labSource: "LabCorp",
    values: [
      {
        testName: "Phosphorus",
        value: 5.8,
        unit: "mg/dL",
        normalRange: "2.5-4.5",
        status: "abnormal",
        previousValue: 5.2,
        trend: "up",
        changePercent: 11.5
      },
      {
        testName: "PTH",
        value: 185,
        unit: "pg/mL",
        normalRange: "15-65",
        status: "abnormal",
        previousValue: 165,
        trend: "up",
        changePercent: 12.1
      }
    ],
    aiInsights: "Elevated phosphorus and PTH levels indicating secondary hyperparathyroidism. Consider adjusting phosphate binders and vitamin D therapy.",
    recommendations: [
      "Increase phosphate binder dose",
      "Dietary phosphorus restriction reinforcement",
      "Recheck PTH in 4 weeks"
    ]
  },
  {
    id: 3,
    patientId: 3,
    patientName: "Robert Davis",
    mrn: "MRN-2024-003",
    reportDate: "2024-11-20T11:00:00",
    status: "needs_review",
    severity: "abnormal",
    criticalValues: 0,
    abnormalValues: 3,
    normalValues: 10,
    labSource: "Quest Diagnostics",
    values: [
      {
        testName: "Potassium",
        value: 5.3,
        unit: "mEq/L",
        normalRange: "3.5-5.0",
        status: "abnormal",
        previousValue: 4.9,
        trend: "up",
        changePercent: 8.2
      },
      {
        testName: "eGFR",
        value: 24,
        unit: "mL/min/1.73m²",
        normalRange: ">60",
        status: "abnormal",
        previousValue: 28,
        trend: "down",
        changePercent: -14.3
      },
      {
        testName: "Phosphorus",
        value: 5.2,
        unit: "mg/dL",
        normalRange: "2.5-4.5",
        status: "abnormal",
        previousValue: 4.8,
        trend: "up",
        changePercent: 8.3
      }
    ],
    aiInsights: "Moderate CKD progression with declining eGFR (24 mL/min) and elevated potassium (5.3 mEq/L). Close monitoring recommended to prevent further deterioration.",
    recommendations: [
      "Physician notification recommended",
      "Dietary potassium restriction counseling",
      "Consider adjusting medications",
      "Follow-up labs in 2 weeks"
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
    patientName: "Robert Davis",
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
    },
    notificationRules: {
      immediateNotification: true,
      batchNotifications: true,
      trendBasedAlerts: true,
      criticalValueCount: "1",
      responseTimeout: "15"
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
    },
    notificationRules: {
      immediateNotification: true,
      batchNotifications: true,
      trendBasedAlerts: false,
      criticalValueCount: "2",
      responseTimeout: "30"
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
    },
    notificationRules: {
      immediateNotification: true,
      batchNotifications: false,
      trendBasedAlerts: true,
      criticalValueCount: "1",
      responseTimeout: "15"
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
