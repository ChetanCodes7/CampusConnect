import React from 'react';
import {
  AcademicCapIcon,
  UsersIcon,
  UserGroupIcon,
  BookOpenIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/solid';
import Icon from '@/components/ui/AppIcon';


const kpis = [
  {
    id: 'admin-kpi-students',
    label: 'Total Students',
    value: '16,284',
    subValue: 'Enrolled Spring 2025',
    icon: AcademicCapIcon,
    trend: '+312 from last semester',
    trendUp: true,
    bgClass: 'bg-card border-border',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    detail: '94.1% re-enrollment rate',
    colSpan: 'col-span-1',
  },
  {
    id: 'admin-kpi-faculty',
    label: 'Faculty & Staff',
    value: '1,612',
    subValue: 'Active this semester',
    icon: UsersIcon,
    trend: '+28 new appointments',
    trendUp: true,
    bgClass: 'bg-card border-border',
    iconBg: 'bg-success/10',
    iconColor: 'text-success',
    detail: '412 full-time professors',
    colSpan: 'col-span-1',
  },
  {
    id: 'admin-kpi-clubs',
    label: 'Active Clubs',
    value: '47',
    subValue: '3,280 total members',
    icon: UserGroupIcon,
    trend: '+3 new clubs this sem',
    trendUp: true,
    bgClass: 'bg-card border-border',
    iconBg: 'bg-accent/15',
    iconColor: 'text-accent-foreground',
    detail: '12 events this month',
    colSpan: 'col-span-1',
  },
  {
    id: 'admin-kpi-books',
    label: 'LibraryBooks',
    value: '28,450',
    subValue: '2,140 currently issued',
    icon: BookOpenIcon,
    trend: '184 overdue returns',
    trendUp: false,
    bgClass: 'bg-warning/5 border-warning/20',
    iconBg: 'bg-warning/10',
    iconColor: 'text-warning',
    detail: '₩920,000 in pending fines',
    colSpan: 'col-span-1',
  },
  {
    id: 'admin-kpi-placement',
    label: 'Placement Rate',
    value: '94.2%',
    subValue: 'Class of 2024 graduates',
    icon: BriefcaseIcon,
    trend: '+1.8% from class of 2023',
    trendUp: true,
    bgClass: 'gradient-primary border-0',
    iconBg: 'bg-white/15',
    iconColor: 'text-white',
    detail: '#1 in Busan region 3 years',
    colSpan: 'col-span-1 md:col-span-2 xl:col-span-1',
    isHero: true,
  },
  {
    id: 'admin-kpi-colleges',
    label: 'Colleges',
    value: '8',
    subValue: '153 academic programs',
    icon: BuildingOfficeIcon,
    trend: 'ICT Engineering added',
    trendUp: true,
    bgClass: 'bg-card border-border',
    iconBg: 'bg-info/10',
    iconColor: 'text-info',
    detail: '7 graduate schools',
    colSpan: 'col-span-1',
  },
];

export default function AdminKPIGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 2xl:grid-cols-6 gap-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        const isHero = (kpi as { isHero?: boolean }).isHero;
        return (
          <div
            key={kpi.id}
            className={`card-base p-4 card-hover border ${kpi.bgClass} ${kpi.colSpan} ${isHero ? 'gradient-primary border-0' : ''}`}
          >
            <div className="flex items-start justify-between mb-3">
              <p className={`text-xs font-semibold uppercase tracking-wide ${isHero ? 'text-white/70' : 'text-muted-foreground'}`}>
                {kpi.label}
              </p>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${kpi.iconBg}`}>
                <Icon className={`w-4 h-4 ${kpi.iconColor}`} />
              </div>
            </div>
            <p className={`text-2xl font-bold font-tabular mb-0.5 ${isHero ? 'text-white' : 'text-foreground'}`}>
              {kpi.value}
            </p>
            <p className={`text-xs mb-2 ${isHero ? 'text-white/70' : 'text-muted-foreground'}`}>
              {kpi.subValue}
            </p>
            <div className="flex items-center gap-1 mb-2">
              {kpi.trendUp ? (
                <ArrowTrendingUpIcon className={`w-3 h-3 flex-shrink-0 ${isHero ? 'text-white/80' : 'text-success'}`} />
              ) : (
                <ArrowTrendingDownIcon className="w-3 h-3 flex-shrink-0 text-warning" />
              )}
              <p className={`text-[11px] font-medium ${isHero ? 'text-white/80' : kpi.trendUp ? 'text-muted-foreground' : 'text-warning'}`}>
                {kpi.trend}
              </p>
            </div>
            <div className={`pt-2 border-t ${isHero ? 'border-white/15' : 'border-border/50'}`}>
              <p className={`text-[11px] ${isHero ? 'text-white/60' : 'text-muted-foreground'}`}>{kpi.detail}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}