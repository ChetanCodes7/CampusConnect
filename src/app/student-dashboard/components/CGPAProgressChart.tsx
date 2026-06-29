'use client';
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

const cgpaData = [
  { semester: 'Spr 23', cgpa: 3.52, gpa: 3.45 },
  { semester: 'Fall 23', cgpa: 3.61, gpa: 3.75 },
  { semester: 'Spr 24', cgpa: 3.68, gpa: 3.80 },
  { semester: 'Fall 24', cgpa: 3.75, gpa: 3.90 },
  { semester: 'Spr 25', cgpa: 3.82, gpa: 3.95 },
];

interface TooltipPayload {
  value: number;
  name: string;
  color: string;
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: TooltipPayload[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-xl px-3 py-2.5 shadow-card-md text-xs">
        <p className="font-semibold text-foreground mb-1.5">{label}</p>
        {payload.map((p, i) => (
          <div key={`tt-line-${i}`} className="flex items-center gap-2 mb-0.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-muted-foreground">{p.name}:</span>
            <span className="font-bold text-foreground">{p.value.toFixed(2)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function CGPAProgressChart() {
  return (
    <div className="card-base p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="section-header">CGPA Progression</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Cumulative vs semester GPA over 5 semesters</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
            <span className="text-muted-foreground">CGPA</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-accent" />
            <span className="text-muted-foreground">Sem GPA</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={160}>
        <LineChart data={cgpaData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="semester"
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[3.2, 4.0]}
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={3.5} stroke="var(--muted-foreground)" strokeDasharray="3 3" strokeWidth={1} />
          <Line
            type="monotone"
            dataKey="cgpa"
            stroke="var(--primary)"
            strokeWidth={2.5}
            dot={{ fill: 'var(--primary)', r: 4, strokeWidth: 2, stroke: 'var(--card)' }}
            activeDot={{ r: 6 }}
            name="CGPA"
          />
          <Line
            type="monotone"
            dataKey="gpa"
            stroke="var(--accent)"
            strokeWidth={2}
            strokeDasharray="5 3"
            dot={{ fill: 'var(--accent)', r: 3, strokeWidth: 2, stroke: 'var(--card)' }}
            activeDot={{ r: 5 }}
            name="Sem GPA"
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-3 grid grid-cols-3 gap-3">
        {[
          { id: 'cgpa-curr', label: 'Current CGPA', value: '3.82', color: 'text-primary' },
          { id: 'cgpa-rank', label: 'Class Rank', value: '#14 / 120', color: 'text-success' },
          { id: 'cgpa-target', label: 'Target CGPA', value: '3.90', color: 'text-accent-foreground' },
        ].map((item) => (
          <div key={item.id} className="bg-muted/50 rounded-lg p-2.5 text-center">
            <p className={`text-base font-bold font-tabular ${item.color}`}>{item.value}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}