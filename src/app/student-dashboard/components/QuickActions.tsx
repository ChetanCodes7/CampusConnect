import React from 'react';
import {
  DocumentPlusIcon,
  QrCodeIcon,
  BookOpenIcon,
  BriefcaseIcon,
  MagnifyingGlassIcon,
  ChatBubbleOvalLeftIcon,
} from '@heroicons/react/24/outline';
import Icon from '@/components/ui/AppIcon';


const actions = [
  { id: 'qa-submit', label: 'Submit Assignment', icon: DocumentPlusIcon, color: 'bg-primary/10 text-primary hover:bg-primary/15', badge: '3' },
  { id: 'qa-attendance', label: 'Mark Attendance', icon: QrCodeIcon, color: 'bg-success/10 text-success hover:bg-success/15' },
  { id: 'qa-library', label: 'Search Books', icon: BookOpenIcon, color: 'bg-info/10 text-info hover:bg-info/15' },
  { id: 'qa-jobs', label: 'Browse Jobs', icon: BriefcaseIcon, color: 'bg-accent/15 text-accent-foreground hover:bg-accent/20' },
  { id: 'qa-search', label: 'Campus Search', icon: MagnifyingGlassIcon, color: 'bg-muted text-muted-foreground hover:bg-muted/70' },
  { id: 'qa-message', label: 'Message Faculty', icon: ChatBubbleOvalLeftIcon, color: 'bg-warning/10 text-warning hover:bg-warning/15' },
];

export default function QuickActions() {
  return (
    <div className="card-base p-4">
      <h2 className="section-header text-sm mb-3">Quick Actions</h2>
      <div className="grid grid-cols-3 gap-2">
        {actions?.map((action) => {
          const Icon = action?.icon;
          return (
            <button
              key={action?.id}
              className={`relative flex flex-col items-center gap-1.5 p-2.5 rounded-xl transition-all duration-150 active:scale-95 ${action?.color}`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium text-center leading-tight">{action?.label}</span>
              {action?.badge && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-danger text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {action?.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}