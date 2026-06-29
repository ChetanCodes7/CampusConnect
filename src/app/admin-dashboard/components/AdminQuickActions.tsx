import React from 'react';
import {
  UserPlusIcon,
  DocumentArrowDownIcon,
  MegaphoneIcon,
  BuildingLibraryIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  CalendarDaysIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline';
import Icon from '@/components/ui/AppIcon';


const actions = [
  { id: 'aq-addstudent', label: 'Add Student', icon: UserPlusIcon, color: 'bg-primary/10 text-primary hover:bg-primary/15', desc: 'Register new student' },
  { id: 'aq-announce', label: 'Send Announcement', icon: MegaphoneIcon, color: 'bg-warning/10 text-warning hover:bg-warning/15', desc: 'Broadcast to campus' },
  { id: 'aq-report', label: 'Generate Report', icon: DocumentArrowDownIcon, color: 'bg-success/10 text-success hover:bg-success/15', desc: 'Export analytics' },
  { id: 'aq-library', label: 'Library Management', icon: BuildingLibraryIcon, color: 'bg-info/10 text-info hover:bg-info/15', desc: 'Books & fines' },
  { id: 'aq-analytics', label: 'View Analytics', icon: ChartBarIcon, color: 'bg-accent/15 text-accent-foreground hover:bg-accent/20', desc: 'Campus insights' },
  { id: 'aq-events', label: 'Schedule Event', icon: CalendarDaysIcon, color: 'bg-primary/8 text-primary hover:bg-primary/12', desc: 'Create campus event' },
  { id: 'aq-placement', label: 'Placement Drive', icon: BriefcaseIcon, color: 'bg-success/8 text-success hover:bg-success/12', desc: 'Manage recruitments' },
  { id: 'aq-settings', label: 'System Settings', icon: Cog6ToothIcon, color: 'bg-muted text-muted-foreground hover:bg-muted/70', desc: 'Configure platform' },
];

export default function AdminQuickActions() {
  return (
    <div className="card-base p-5">
      <h2 className="section-header mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {actions?.map((action) => {
          const Icon = action?.icon;
          return (
            <button
              key={action?.id}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-150 active:scale-95 ${action?.color}`}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/50">
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold leading-tight">{action?.label}</p>
                <p className="text-[10px] opacity-70 mt-0.5 leading-tight hidden sm:block">{action?.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}