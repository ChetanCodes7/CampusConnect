import React from 'react';
import Badge from '@/components/ui/Badge';
import { ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';

const todayClasses = [
  {
    id: 'class-ds',
    subject: 'Data Structures & Algorithms',
    code: 'CS3201',
    time: '09:00 – 10:30',
    room: 'IT Building 301',
    professor: 'Prof. Kim Tae-hyun',
    status: 'completed',
    color: 'bg-primary/15 border-l-primary',
  },
  {
    id: 'class-db',
    subject: 'Database Systems',
    code: 'CS3105',
    time: '11:00 – 12:30',
    room: 'Engineering Hall 204',
    professor: 'Prof. Park Ji-young',
    status: 'ongoing',
    color: 'bg-success/10 border-l-success',
  },
  {
    id: 'class-ml',
    subject: 'Machine Learning',
    code: 'CS4201',
    time: '14:00 – 15:30',
    room: 'ICT Building 102',
    professor: 'Dr. Lee Sung-woo',
    status: 'upcoming',
    color: 'bg-accent/10 border-l-accent',
  },
  {
    id: 'class-eng',
    subject: 'Technical English',
    code: 'ENG2001',
    time: '16:00 – 17:00',
    room: 'Language Center 205',
    professor: 'Prof. Choi Su-bin',
    status: 'upcoming',
    color: 'bg-muted border-l-muted-foreground',
  },
];

const statusBadgeMap: Record<string, { variant: 'success' | 'info' | 'neutral'; label: string }> = {
  completed: { variant: 'neutral', label: 'Done' },
  ongoing: { variant: 'success', label: 'Now' },
  upcoming: { variant: 'info', label: 'Soon' },
};

export default function TodaySchedule() {
  return (
    <div className="card-base p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ClockIcon className="w-4 h-4 text-primary" />
          <h2 className="section-header text-sm">Today&apos;s Schedule</h2>
        </div>
        <span className="text-xs text-muted-foreground">Mon, Jun 29</span>
      </div>

      <div className="space-y-2.5">
        {todayClasses.map((cls) => {
          const badge = statusBadgeMap[cls.status];
          return (
            <div
              key={cls.id}
              className={`p-3 rounded-lg border-l-4 ${cls.color} ${cls.status === 'completed' ? 'opacity-60' : ''}`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className={`text-xs font-semibold text-foreground leading-tight ${cls.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
                  {cls.subject}
                </p>
                <Badge variant={badge.variant} className="flex-shrink-0 text-[10px]">
                  {badge.label}
                </Badge>
              </div>
              <p className="text-[11px] text-muted-foreground font-mono mb-1">{cls.code} · {cls.time}</p>
              <div className="flex items-center gap-1">
                <MapPinIcon className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                <p className="text-[11px] text-muted-foreground">{cls.room}</p>
              </div>
            </div>
          );
        })}
      </div>

      <button className="w-full mt-3 text-xs text-primary font-medium hover:underline text-center py-1">
        View full timetable →
      </button>
    </div>
  );
}