# Attri Lab Report Analyzer - Prototype v2

An AI-powered lab report analysis dashboard built for Renal Clinic of Houston. This is a clickable prototype with dummy data demonstrating the enhanced workflow based on feedback from clinic management.

## 🎯 Key Features (Based on Client Feedback)

### 1. **Automated Physician Notifications**
- Configurable alerts that notify physicians immediately when specific thresholds are met
- Multiple notification methods: SMS, Email, Phone escalation
- Reduces staff review time by automating critical value notifications

### 2. **Patient Trend Analysis**
- Historical comparison showing value changes over time
- Visual trend indicators (up/down/stable arrows with percentage changes)
- AI factors in patient history to drive actionable insights beyond basic critical value flagging

### 3. **End-to-End Fax Intake Simulation**
- Complete workflow demonstration from fax receipt through automated notification
- Real-time progress tracking showing all 6 stages of processing
- Shows how the system works 24/7 without staff intervention

### 4. **Sidebar Navigation**
- Clean dashboard-style layout with persistent sidebar
- Easy access to all main features
- No marketing content - pure application functionality

## 📋 Pages

### Dashboard (/)
- Overview statistics (pending reviews, critical alerts, total reports)
- Critical reports requiring immediate review
- Recent activity timeline
- Quick action cards

### Analyzer (/analyzer)
- **Fax Intake Simulation**: Demonstrates the complete end-to-end workflow
- **File Upload**: Upload lab reports for analysis (PDF, DOC, DOCX, TXT)
- Real-time progress modal showing all processing stages
- Automatic redirect to review page after analysis

### Review (/review)
- List of pending reviews with severity indicators
- Detailed patient information and CKD stage
- **Lab values table with trend analysis** showing:
  - Current vs previous values
  - Trend indicators (up/down/stable)
  - Percentage change calculations
  - Color-coded status badges
- AI clinical insights with recommendations
- Physician notification preview
- Approve/reject workflow

### Settings (/settings)
- **Notifications Tab**: Configure automated physician notification rules
  - Immediate notifications for critical values
  - Batch notifications for abnormal values
  - Trend-based alerts
  - Threshold and escalation settings
- **Thresholds Tab**: Manage lab test thresholds (normal ranges, critical values)
- **Physicians Tab**: Physician contact info and notification preferences by severity level

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3002](http://localhost:3002) in your browser.

## 🏗️ Tech Stack

- **Next.js 15** - App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Heroicons** - UI icons
- **Dummy Data** - All features fully interactive with realistic medical data

## 📊 Dummy Data

The prototype includes comprehensive dummy data for:
- **3 Patients** with various CKD stages
- **3 Lab Reports** with different severity levels
- **3 Physicians** with different notification preferences
- **Lab values** with trend analysis and historical comparisons
- **Notifications** showing automated physician alerts
- **Recent activity** timeline

## 🎨 Design System

Based on the original attri-lab-report project:
- Primary Color: `#5F4AE8` (Purple)
- Background: `#FAFAFA` (Light gray)
- Severity Colors: Critical (Red), Warning (Yellow), Success (Green)
- Clean, professional medical UI

## 📝 Key Enhancements from Client Feedback

1. **Physician-specific insights** - Goes beyond basic critical value flagging
2. **Automated notification workflow** - Configurable alerts reduce staff time
3. **Trend analysis** - Shows value changes over time for preventive care
4. **Fax intake demo** - Complete end-to-end workflow visualization
5. **Sidebar navigation** - Dashboard-focused layout instead of marketing website

## 🔄 Workflow Demonstrated

1. **Fax/Report Received** → Lab report arrives via fax or upload
2. **AI Analysis** → Automatic extraction and analysis (45 seconds)
3. **Critical Detection** → Flags values requiring immediate attention
4. **Physician Notification** → Automatic SMS/Email to assigned physician
5. **Staff Review** → Quick review and approval of AI-generated notifications
6. **Follow-up Tracking** → Monitor physician response and escalation if needed

## 📧 Client Context

Built for **Renal Clinic of Houston** based on:
- Meeting with Andy Verma (Practice Manager) on 11/18/24
- Feedback emphasizing need for physician-specific insights
- Requirement to show complete automated workflow
- Focus on time-saving automation for clinical staff

## 🎯 Use Cases Demonstrated

- **Critical Hyperkalemia** (John Smith) - Immediate physician notification
- **CKD Progression** (Maria Garcia) - Trend-based monitoring
- **Stage 5 CKD** (Robert Johnson) - Urgent dialysis evaluation alert

---

**Note**: This is a prototype with dummy data for demonstration purposes. All patient information is fictional.
