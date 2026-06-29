import React from 'react';
import Badge from '@/components/ui/Badge';
import {
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import Icon from '@/components/ui/AppIcon';


const alerts = [
  {
    id: 'alert-overdue',
    level: 'warning',
    icon: ExclamationTriangleIcon,
    iconBg: 'bg-warning/10',
    iconColor: 'text-warning',
    title: '184 Overdue Library Returns',
    detail: 'Students with books past due date — auto-fines applied at ₩500/day',
    time: '21:11',
    badgeVariant: 'warning' as const,
    badgeLabel: 'Library',
  },
  {
    id: 'alert-suspend',
    level: 'danger',
    icon: ExclamationCircleIcon,
    iconBg: 'bg-danger/10',
    iconColor: 'text-danger',
    title: '23 Students Below 75% Attendance',
    detail: 'Attendance penalty notices will be sent to students and guardians',
    time: '20:45',
    badgeVariant: 'danger' as const,
    badgeLabel: 'Academic',
  },
  {
    id: 'alert-pending',
    level: 'warning',
    icon: ExclamationTriangleIcon,
    iconBg: 'bg-warning/10',
    iconColor: 'text-warning',
    title: '2 Pending Club Approval Requests',
    detail: 'DEU Photography Club expansion and new Robotics Club awaiting admin approval',
    time: '18:30',
    badgeVariant: 'warning' as const,
    badgeLabel: 'Clubs',
  },
  {
    id: 'alert-placement',
    level: 'info',
    icon: InformationCircleIcon,
    iconBg: 'bg-info/10',
    iconColor: 'text-info',
    title: 'Samsung Recruitment Drive — July 3',
    detail: '312 students registered · Interview rooms need confirmation by June 30',
    time: '15:00',
    badgeVariant: 'info' as const,
    badgeLabel: 'Placement',
  },
  {
    id: 'alert-ok',
    level: 'success',
    icon: CheckCircleIcon,
    iconBg: 'bg-success/10',
    iconColor: 'text-success',
    title: 'System Backup Completed Successfully',
    detail: 'All database records backed up to DEU secure cloud at 03:00 KST',
    time: '03:00',
    badgeVariant: 'success' as const,
    badgeLabel: 'System',
  },
];

export default function SystemAlertsPanel() {
  return (
    <div className="card-base p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <h2 className="section-header">System Alerts</h2>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 bg-danger rounded-full animate-pulse" />
          <span className="text-xs font-semibold text-danger">2 critical</span>
        </div>
      </div>

      <div className="space-y-2.5 flex-1">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          return (
            <div
              key={alert.id}
              className="flex items-start gap-3 p-3 rounded-xl border border-border hover:bg-muted/40 transition-colors cursor-pointer"
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${alert.iconBg}`}>
                <Icon className={`w-4 h-4 ${alert.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-0.5">
                  <p className="text-xs font-semibold text-foreground leading-snug">{alert.title}</p>
                  <span className="text-[10px] text-muted-foreground flex-shrink-0 font-mono">{alert.time}</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">{alert.detail}</p>
                <div className="mt-1.5">
                  <Badge variant={alert.badgeVariant} className="text-[10px]">{alert.badgeLabel}</Badge>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button className="w-full mt-3 text-xs text-primary font-medium hover:underline text-center py-1 flex-shrink-0">
        View all system logs →
      </button>
    </div>
  );
}