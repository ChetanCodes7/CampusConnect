'use client';
import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const collegeData = [
  { id: 'col-ict', name: 'ICT Engineering', shortName: 'ICT Eng', students: 3820, color: '#1B3A6B' },
  { id: 'col-biz', name: 'Business & Economics', shortName: 'Business', students: 2940, color: '#F5A623' },
  { id: 'col-eng', name: 'Engineering', shortName: 'Engineering', students: 2610, color: '#10B981' },
  { id: 'col-nurs', name: 'Nursing & Healthcare', shortName: 'Nursing', students: 1980, color: '#3B82F6' },
  { id: 'col-art', name: 'Art, Design & Sport', shortName: 'Art & Design', students: 1740, color: '#8B5CF6' },
  { id: 'col-hum', name: 'Humanities & Social', shortName: 'Humanities', students: 1620, color: '#F59E0B' },
  { id: 'col-comp', name: 'Components & Materials', shortName: 'Materials', students: 980, color: '#EF4444' },
  { id: 'col-it', name: 'IT Convergence', shortName: 'IT Conv.', students: 594, color: '#06B6D4' },
];

const total = collegeData.reduce((sum, c) => sum + c.students, 0);

interface TooltipPayload {
  payload: { name: string; students: number; color: string };
}

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-card border border-border rounded-xl px-3 py-2.5 shadow-card-md text-xs">
        <p className="font-semibold text-foreground mb-1">{d.name}</p>
        <p className="font-bold text-lg font-tabular" style={{ color: d.color }}>{d.students.toLocaleString()}</p>
        <p className="text-muted-foreground">{((d.students / total) * 100).toFixed(1)}% of campus</p>
      </div>
    );
  }
  return null;
};

export default function DepartmentDistributionChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="card-base p-5 h-full">
      <div className="mb-4">
        <h2 className="section-header">College Distribution</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Enrollment by college — {total.toLocaleString()} total</p>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={collegeData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
            dataKey="students"
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {collegeData.map((entry, index) => (
              <Cell
                key={entry.id}
                fill={entry.color}
                opacity={activeIndex === null || activeIndex === index ? 1 : 0.5}
                stroke="var(--card)"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="space-y-1.5 mt-2">
        {collegeData.map((college, index) => (
          <div
            key={college.id}
            className={`flex items-center justify-between py-1 px-2 rounded-lg transition-colors cursor-pointer ${activeIndex === index ? 'bg-muted' : 'hover:bg-muted/50'}`}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: college.color }} />
              <span className="text-xs text-foreground truncate">{college.shortName}</span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs font-semibold text-foreground font-tabular">{college.students.toLocaleString()}</span>
              <span className="text-[10px] text-muted-foreground w-9 text-right">
                {((college.students / total) * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}