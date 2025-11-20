'use client';

import Link from 'next/link';
import {
  DocumentTextIcon,
  BellIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowUpIcon,
  ArrowRightIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { dashboardStats, labReports, recentActivity } from '@/lib/data/dummy-data';

export default function Dashboard() {
  const stats = [
    {
      name: 'Pending Reviews',
      value: dashboardStats.pendingReviews,
      icon: ClockIcon,
      change: '+2 from yesterday',
      trend: 'up',
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
      border: 'border-amber-200'
    },
    {
      name: 'Critical Alerts',
      value: dashboardStats.criticalAlerts,
      icon: BellIcon,
      change: 'Needs attention',
      trend: 'neutral',
      color: 'text-rose-500',
      bg: 'bg-rose-500/10',
      border: 'border-rose-200'
    },
    {
      name: 'Reviewed Today',
      value: dashboardStats.reviewedToday,
      icon: CheckCircleIcon,
      change: '+3 from yesterday',
      trend: 'up',
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-200'
    },
    {
      name: 'Total Reports',
      value: dashboardStats.totalReports,
      icon: DocumentTextIcon,
      change: 'This month',
      trend: 'up',
      color: 'text-indigo-500',
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-200'
    },
  ];

  const criticalReports = labReports.filter(r => r.severity === 'critical' && r.status === 'needs_review');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">Dashboard</h1>
          <p className="mt-2 text-[var(--text-secondary)]">Overview of lab report analysis and notifications</p>
        </div>
        <div className="text-sm text-[var(--text-secondary)] bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="h-6 w-6" />
              </div>
              {stat.trend === 'up' && (
                <span className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  <ArrowUpIcon className="h-3 w-3 mr-1" />
                  2.5%
                </span>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--text-secondary)] mb-1">{stat.name}</p>
              <h3 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">{stat.value}</h3>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-50">
              <p className="text-xs text-[var(--text-tertiary)] font-medium">{stat.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Critical Reports */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">Critical Reports</h2>
            <Link href="/review" className="text-sm font-medium text-[var(--primary)] hover:text-[var(--primary-dark)] flex items-center gap-1 transition-colors">
              View all <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {criticalReports.length === 0 ? (
              <div className="p-12 text-center">
                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircleIcon className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">All Caught Up</h3>
                <p className="text-gray-500 mt-1">No critical reports pending review</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {criticalReports.map((report) => (
                  <div key={report.id} className="p-6 hover:bg-gray-50/50 transition-colors group">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 ring-4 ring-rose-50">
                          <ExclamationTriangleIcon className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-base font-semibold text-gray-900 group-hover:text-[var(--primary)] transition-colors">
                            {report.patientName}
                          </h3>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800 border border-rose-200">
                            CRITICAL
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">MRN: {report.mrn} • {new Date(report.reportDate).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100 mb-3">
                          {report.aiInsights}
                        </p>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                            <span className="flex items-center gap-1.5 bg-rose-50 text-rose-700 px-2 py-1 rounded-md">
                              <BellIcon className="h-3.5 w-3.5" />
                              {report.criticalValues} critical values
                            </span>
                          </div>
                          <Link
                            href={`/review?reportId=${report.id}`}
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

        {/* Recent Activity & Quick Actions */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-4">
              <Link href="/analyzer" className="group relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:-translate-y-1 transition-all duration-300">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors"></div>
                <div className="relative z-10">
                  <div className="bg-white/20 w-10 h-10 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm">
                    <DocumentTextIcon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-1">Analyze New Report</h3>
                  <p className="text-indigo-100 text-sm">Upload or simulate fax intake</p>
                </div>
              </Link>

              <div className="grid grid-cols-2 gap-4">
                <Link href="/review" className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-amber-200 transition-all group">
                  <BellIcon className="h-8 w-8 text-amber-500 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-gray-900 text-sm">Notifications</h3>
                  <p className="text-xs text-gray-500 mt-1">{dashboardStats.pendingReviews} pending</p>
                </Link>

                <Link href="/settings" className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all group">
                  <CheckCircleIcon className="h-8 w-8 text-emerald-500 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-gray-900 text-sm">Settings</h3>
                  <p className="text-xs text-gray-500 mt-1">Configure</p>
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Recent Activity</h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="space-y-6">
                {recentActivity.map((activity, activityIdx) => (
                  <div key={activity.id} className="relative pl-6 group">
                    {activityIdx !== recentActivity.length - 1 && (
                      <span
                        className="absolute left-[11px] top-8 h-full w-0.5 bg-gray-100 group-hover:bg-gray-200 transition-colors"
                        aria-hidden="true"
                      />
                    )}
                    <div className="absolute left-0 top-1.5">
                      <div className={`h-6 w-6 rounded-full border-4 border-white shadow-sm ${activity.type === 'fax_received' ? 'bg-blue-500' :
                          activity.type === 'analysis_complete' ? 'bg-purple-500' :
                            activity.type === 'notification_sent' ? 'bg-amber-500' :
                              'bg-emerald-500'
                        }`}></div>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{activity.details}</p>
                      <p className="text-[10px] text-gray-400 mt-1 font-medium uppercase tracking-wide">
                        {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
