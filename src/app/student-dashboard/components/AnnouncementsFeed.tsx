import React from 'react';
import Badge from '@/components/ui/Badge';
import { MegaphoneIcon, ClockIcon } from '@heroicons/react/24/outline';

const announcements = [
  {
    id: 'ann-midterm',
    title: 'Mid-term Exam Schedule Released',
    category: 'Academic',
    categoryVariant: 'primary' as const,
    time: '2 hours ago',
    preview: 'Mid-term examinations for Spring 2025 will be held from July 7–11. Check your department notice board for room assignments.',
    urgent: true,
  },
  {
    id: 'ann-scholarship',
    title: 'Scholarship Applications Open — Spring 2025',
    category: 'Financial',
    categoryVariant: 'success' as const,
    time: '1 day ago',
    preview: 'Merit-based scholarships are now open for applications. Deadline: July 15, 2025. Minimum CGPA 3.5 required.',
    urgent: false,
  },
  {
    id: 'ann-samsung',
    title: 'Campus Recruitment Drive — Samsung Electronics',
    category: 'Placement',
    categoryVariant: 'accent' as const,
    time: '2 days ago',
    preview: 'Samsung Electronics will conduct on-campus recruitment on July 3. CS, IT, and Engineering students eligible.',
    urgent: false,
  },
  {
    id: 'ann-library',
    title: 'Library Extended Hours During Finals',
    category: 'Campus',
    categoryVariant: 'info' as const,
    time: '3 days ago',
    preview: 'The main library will remain open until midnight from July 1–15 to support students during examination period.',
    urgent: false,
  },
  {
    id: 'ann-holiday',
    title: 'No Classes — University Foundation Day',
    category: 'Holiday',
    categoryVariant: 'warning' as const,
    time: '4 days ago',
    preview: 'In celebration of Dong-eui University Foundation Day, all classes are cancelled on July 2, 2025.',
    urgent: false,
  },
];

export default function AnnouncementsFeed() {
  return (
    <div className="card-base p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MegaphoneIcon className="w-4 h-4 text-primary" />
          <h2 className="section-header text-sm">Announcements</h2>
        </div>
        <span className="badge-danger text-[10px] px-2 py-0.5">5 new</span>
      </div>

      <div className="space-y-3">
        {announcements.map((ann) => (
          <div
            key={ann.id}
            className={`p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors ${
              ann.urgent ? 'border-warning/30 bg-warning/5' : 'border-border bg-card'
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <p className="text-xs font-semibold text-foreground leading-snug flex-1">{ann.title}</p>
              {ann.urgent && <span className="text-warning text-xs flex-shrink-0">🔔</span>}
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2 mb-2">
              {ann.preview}
            </p>
            <div className="flex items-center justify-between">
              <Badge variant={ann.categoryVariant} className="text-[10px]">{ann.category}</Badge>
              <div className="flex items-center gap-1">
                <ClockIcon className="w-3 h-3 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground">{ann.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-3 text-xs text-primary font-medium hover:underline text-center py-1">
        View all announcements →
      </button>
    </div>
  );
}