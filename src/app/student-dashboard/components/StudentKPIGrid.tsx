import React from 'react';

import {
  ClipboardDocumentCheckIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import Icon from '@/components/ui/AppIcon';


const kpis = [
  {
    id: 'kpi-attendance',
    label: 'Overall Attendance',
    value: '87.3%',
    subValue: 'This semester',
    icon: ClipboardDocumentCheckIcon,
    trend: '+2.1% from last month',
    trendUp: true,
    variant: 'good',
    bgClass: 'bg-success/5 border-success/20',
    iconBg: 'bg-success/10',
    iconColor: 'text-success',
    detail: '134 / 154 classes attended',
    colSpan: 'col-span-1 xl:col-span-1',
  },
  {
    id: 'kpi-cgpa',
    label: 'Current CGPA',
    value: '3.82',
    subValue: 'out of 4.00',
    icon: AcademicCapIcon,
    trend: '+0.07 from last semester',
    trendUp: true,
    variant: 'hero',
    bgClass: 'gradient-primary text-white',
    iconBg: 'bg-white/15',
    iconColor: 'text-white',
    detail: 'Top 12% in department',
    colSpan: 'col-span-1 md:col-span-2 xl:col-span-1',
  },
  {
    id: 'kpi-assignments',
    label: 'Pending Assignments',
    value: '3',
    subValue: '2 due this week',
    icon: DocumentTextIcon,
    trend: 'Algorithms due in 2 days',
    trendUp: false,
    variant: 'warning',
    bgClass: 'bg-warning/5 border-warning/20',
    iconBg: 'bg-warning/10',
    iconColor: 'text-warning',
    detail: '1 overdue — submit now',
    colSpan: 'col-span-1 xl:col-span-1',
  },
  {
    id: 'kpi-library',
    label: 'Library Books',
    value: '2',
    subValue: 'currently issued',
    icon: BookOpenIcon,
    trend: 'Due in 5 days',
    trendUp: true,
    variant: 'neutral',
    bgClass: 'bg-info/5 border-info/20',
    iconBg: 'bg-info/10',
    iconColor: 'text-info',
    detail: 'No outstanding fines',
    colSpan: 'col-span-1 xl:col-span-1',
  },
  {
    id: 'kpi-messages',
    label: 'Unread Messages',
    value: '7',
    subValue: '3 from faculty',
    icon: ChatBubbleLeftRightIcon,
    trend: '4 club notifications',
    trendUp: false,
    variant: 'danger',
    bgClass: 'bg-danger/5 border-danger/20',
    iconBg: 'bg-danger/10',
    iconColor: 'text-danger',
    detail: 'Prof. Kim sent an update',
    colSpan: 'col-span-1 xl:col-span-1',
  },
];

export default function StudentKPIGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 gap-4">
      {kpis?.map((kpi) => {
        const Icon = kpi?.icon;
        const isHero = kpi?.variant === 'hero';

        return (
          <div
            key={kpi?.id}
            className={`card-base p-4 card-hover border ${kpi?.bgClass} ${kpi?.colSpan} ${isHero ? 'gradient-primary border-0' : ''}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className={`text-xs font-semibold uppercase tracking-wide ${isHero ? 'text-white/70' : 'text-muted-foreground'}`}>
                  {kpi?.label}
                </p>
              </div>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${kpi?.iconBg}`}>
                <Icon className={`w-5 h-5 ${kpi?.iconColor}`} />
              </div>
            </div>
            <div className="mb-2">
              <p className={`text-3xl font-bold font-tabular ${isHero ? 'text-white' : 'text-foreground'}`}>
                {kpi?.value}
              </p>
              <p className={`text-xs mt-0.5 ${isHero ? 'text-white/70' : 'text-muted-foreground'}`}>
                {kpi?.subValue}
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {kpi?.trendUp ? (
                <ArrowTrendingUpIcon className={`w-3.5 h-3.5 flex-shrink-0 ${isHero ? 'text-white/80' : 'text-success'}`} />
              ) : (
                kpi?.variant === 'warning' || kpi?.variant === 'danger' ? (
                  <ExclamationTriangleIcon className={`w-3.5 h-3.5 flex-shrink-0 ${kpi?.variant === 'danger' ? 'text-danger' : 'text-warning'}`} />
                ) : (
                  <ArrowTrendingDownIcon className={`w-3.5 h-3.5 flex-shrink-0 ${isHero ? 'text-white/80' : 'text-muted-foreground'}`} />
                )
              )}
              <p className={`text-xs font-medium ${isHero ? 'text-white/80' : kpi?.variant === 'danger' ? 'text-danger' : kpi?.variant === 'warning' ? 'text-warning' : 'text-muted-foreground'}`}>
                {kpi?.trend}
              </p>
            </div>
            <div className={`mt-2 pt-2 border-t ${isHero ? 'border-white/15' : 'border-border/50'}`}>
              <p className={`text-[11px] ${isHero ? 'text-white/60' : 'text-muted-foreground'}`}>
                {kpi?.detail}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}