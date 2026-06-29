import React from 'react';
import Badge from '@/components/ui/Badge';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';

const events = [
  {
    id: 'evt-hackathon',
    title: 'DEU Tech Hackathon 2025',
    date: 'Jul 5',
    day: 'Sat',
    category: 'Competition',
    variant: 'primary' as const,
    location: 'IT Building Auditorium',
    registered: true,
  },
  {
    id: 'evt-samsung',
    title: 'Samsung Recruitment Info Session',
    date: 'Jul 3',
    day: 'Thu',
    category: 'Placement',
    variant: 'success' as const,
    location: 'Main Hall, Room 101',
    registered: false,
  },
  {
    id: 'evt-cultural',
    title: 'Cultural Exchange Festival',
    date: 'Jul 8',
    day: 'Tue',
    category: 'Club',
    variant: 'accent' as const,
    location: 'Campus Courtyard',
    registered: true,
  },
];

export default function UpcomingEvents() {
  return (
    <div className="card-base p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CalendarDaysIcon className="w-4 h-4 text-primary" />
          <h2 className="section-header text-sm">Upcoming Events</h2>
        </div>
      </div>

      <div className="space-y-2.5">
        {events.map((evt) => (
          <div key={evt.id} className="flex items-center gap-3 p-2.5 rounded-lg border border-border hover:bg-muted/40 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-primary/8 flex flex-col items-center justify-center flex-shrink-0">
              <p className="text-[10px] font-semibold text-primary uppercase">{evt.day}</p>
              <p className="text-sm font-bold text-primary leading-none">{evt.date.split(' ')[1]}</p>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground leading-snug truncate">{evt.title}</p>
              <p className="text-[11px] text-muted-foreground truncate">{evt.location}</p>
            </div>
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <Badge variant={evt.variant} className="text-[10px]">{evt.category}</Badge>
              {evt.registered && (
                <span className="text-[10px] text-success font-medium">✓ Registered</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-3 text-xs text-primary font-medium hover:underline text-center py-1">
        Browse all events →
      </button>
    </div>
  );
}