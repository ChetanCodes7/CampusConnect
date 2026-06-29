import React from 'react';
import AdminKPIGrid from './AdminKPIGrid';
import EnrollmentTrendChart from './EnrollmentTrendChart';
import DepartmentDistributionChart from './DepartmentDistributionChart';
import AttendanceOverviewChart from './AttendanceOverviewChart';
import RecentRegistrationsTable from './RecentRegistrationsTable';
import SystemAlertsPanel from './SystemAlertsPanel';
import AdminQuickActions from './AdminQuickActions';

export default function AdminDashboardContent() {
  return (
    <div className="p-5 lg:p-6 xl:p-8 max-w-screen-2xl mx-auto">
      {/* Page Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Campus Overview</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Dong-eui University · Spring Semester 2025 · 2026.06.29 · Last updated: 21:11 KST
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-success/10 border border-success/20 rounded-lg px-3 py-1.5">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-xs font-medium text-success">All Systems Operational</span>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <AdminKPIGrid />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-5 mt-5">
        <div className="lg:col-span-2">
          <EnrollmentTrendChart />
        </div>
        <div className="lg:col-span-1">
          <DepartmentDistributionChart />
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-5 mt-5">
        <div className="lg:col-span-2">
          <AttendanceOverviewChart />
        </div>
        <div className="lg:col-span-1">
          <SystemAlertsPanel />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-5">
        <AdminQuickActions />
      </div>

      {/* Recent Registrations Table */}
      <div className="mt-5">
        <RecentRegistrationsTable />
      </div>
    </div>
  );
}