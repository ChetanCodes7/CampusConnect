import React from 'react';
import Badge from '@/components/ui/Badge';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  BookOpenIcon,
  TrophyIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import Icon from '@/components/ui/AppIcon';


const activities = [
  {
    id: 'act-grade',
    type: 'grade',
    icon: CheckCircleIcon,
    iconBg: 'bg-success/10',
    iconColor: 'text-success',
    title: 'Grade Posted — Database Systems Midterm',
    detail: 'Score: 88/100 · Grade: A- · Rank: 8th in class',
    time: '1 hour ago',
    badge: { label: 'Academic', variant: 'primary' as const },
  },
  {
    id: 'act-assign',
    type: 'assignment',
    icon: ExclamationCircleIcon,
    iconBg: 'bg-danger/10',
    iconColor: 'text-danger',
    title: 'Assignment Overdue — Algorithms Problem Set 4',
    detail: 'Was due June 27 · Contact Prof. Kim Tae-hyun immediately',
    time: '2 days ago',
    badge: { label: 'Urgent', variant: 'danger' as const },
  },
  {
    id: 'act-club',
    type: 'club',
    icon: TrophyIcon,
    iconBg: 'bg-accent/15',
    iconColor: 'text-accent-foreground',
    title: 'DEU Tech Club — Hackathon Registration Confirmed',
    detail: 'Team: ByteForce · Category: AI/ML · Slot: July 5, 09:00',
    time: '3 days ago',
    badge: { label: 'Club', variant: 'accent' as const },
  },
  {
    id: 'act-library',
    type: 'library',
    icon: BookOpenIcon,
    iconBg: 'bg-info/10',
    iconColor: 'text-info',
    title: 'Book Issued — Introduction to Algorithms (3rd Ed.)',
    detail: 'Due: July 13, 2025 · Renew online before due date to avoid ₩500/day fine',
    time: '5 days ago',
    badge: { label: 'Library', variant: 'info' as const },
  },
  {
    id: 'act-placement',
    type: 'placement',
    icon: InformationCircleIcon,
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    title: 'Application Shortlisted — Kakao Frontend Developer Intern',
    detail: 'Technical interview scheduled for July 10, 14:00 · Prepare DSA and React',
    time: '1 week ago',
    badge: { label: 'Placement', variant: 'success' as const },
  },
  {
    id: 'act-doc',
    type: 'document',
    icon: DocumentTextIcon,
    iconBg: 'bg-muted',
    iconColor: 'text-muted-foreground',
    title: 'Enrollment Certificate Downloaded',
    detail: 'Spring 2025 enrollment certificate issued for visa application',
    time: '1 week ago',
    badge: { label: 'Document', variant: 'neutral' as const },
  },
];

export default function RecentActivity() {
  return (
    <div className="card-base p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-header">Recent Activity</h2>
        <button className="text-xs text-primary font-medium hover:underline">View all</button>
      </div>

      <div className="space-y-1">
        {activities.map((act, idx) => {
          const Icon = act.icon;
          return (
            <div
              key={act.id}
              className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer group"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${act.iconBg}`}>
                <Icon className={`w-4 h-4 ${act.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground leading-snug">{act.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{act.detail}</p>
              </div>
              <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                <Badge variant={act.badge.variant} className="text-[10px]">{act.badge.label}</Badge>
                <span className="text-[11px] text-muted-foreground">{act.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}