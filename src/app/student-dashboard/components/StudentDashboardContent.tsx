import React from 'react';
import StudentKPIGrid from './StudentKPIGrid';
import TodaySchedule from './TodaySchedule';
import AnnouncementsFeed from './AnnouncementsFeed';
import AttendanceTrendChart from './AttendanceTrendChart';
import CGPAProgressChart from './CGPAProgressChart';
import UpcomingEvents from './UpcomingEvents';
import QuickActions from './QuickActions';
import RecentActivity from './RecentActivity';

export default function StudentDashboardContent() {
  return (
    <div className="p-5 lg:p-6 xl:p-8 max-w-screen-2xl mx-auto">
      {/* Page Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Good afternoon, Ji-won 👋
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Spring Semester 2025 · Week 11 of 18 · 2026.06.29
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-warning/10 border border-warning/20 rounded-lg px-3 py-2">
          <span className="w-2 h-2 bg-warning rounded-full animate-pulse flex-shrink-0" />
          <span className="text-xs font-medium text-warning">Mid-terms in 8 days</span>
        </div>
      </div>

      {/* KPI Bento Grid */}
      <StudentKPIGrid />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-5 mt-5">
        {/* Left Column — Today's Schedule + Quick Actions */}
        <div className="lg:col-span-1 space-y-5">
          <TodaySchedule />
          <QuickActions />
        </div>

        {/* Center — Charts */}
        <div className="lg:col-span-2 xl:col-span-2 space-y-5">
          <AttendanceTrendChart />
          <CGPAProgressChart />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-3 xl:col-span-1 2xl:col-span-1 space-y-5">
          <AnnouncementsFeed />
          <UpcomingEvents />
        </div>
      </div>

      {/* Recent Activity — Full Width */}
      <div className="mt-5">
        <RecentActivity />
      </div>
    </div>
  );
}