'use client';
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from 'recharts';

const attendanceByCollege = [
  { id: 'att-ict', college: 'ICT Eng', rate: 88.4, target: 85 },
  { id: 'att-biz', college: 'Business', rate: 82.1, target: 85 },
  { id: 'att-eng', college: 'Engineering', rate: 90.2, target: 85 },
  { id: 'att-nurs', college: 'Nursing', rate: 95.8, target: 85 },
  { id: 'att-art', college: 'Art & Design', rate: 78.3, target: 85 },
  { id: 'att-hum', college: 'Humanities', rate: 74.9, target: 85 },
  { id: 'att-comp', college: 'Materials', rate: 86.1, target: 85 },
  { id: 'att-itc', college: 'IT Conv.', rate: 91.5, target: 85 },
];

interface TooltipPayload {
  value: number;
  payload: { college: string; rate: number };
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: TooltipPayload[]; label?: string }) => {
  if (active && payload && payload.length) {
    const rate = payload[0].value;
    const isBelow = rate < 85;
    return (
      <div className="bg-card border border-border rounded-xl px-3 py-2.5 shadow-card-md text-xs">
        <p className="font-semibold text-foreground mb-1">{label}</p>
        <p className={`font-bold text-base font-tabular ${isBelow ? 'text-danger' : rate >= 90 ? 'text-success' : 'text-primary'}`}>
          {rate}%
        </p>
        <p className={`text-[11px] mt-0.5 ${isBelow ? 'text-danger' : 'text-muted-foreground'}`}>
          {isBelow ? '⚠ Below 85% campus target' : '✓ Above target'}
        </p>
      </div>
    );
  }
  return null;
};

export default function AttendanceOverviewChart() {
  return (
    <div className="card-base p-5 h-full">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="section-header">Attendance by College</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Spring 2025 semester average · 85% campus target</p>
        </div>
        <div className="flex items-center gap-3 text-xs flex-shrink-0">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-primary" />
            <span className="text-muted-foreground">Above target</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-danger" />
            <span className="text-muted-foreground">Below target</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={attendanceByCollege} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="college"
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[65, 100]}
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--muted)', opacity: 0.5 }} />
          <ReferenceLine y={85} stroke="var(--warning)" strokeDasharray="4 4" strokeWidth={1.5} />
          <Bar dataKey="rate" radius={[4, 4, 0, 0]} maxBarSize={40}>
            {attendanceByCollege.map((entry) => (
              <Cell
                key={entry.id}
                fill={entry.rate < 85 ? 'var(--danger)' : entry.rate >= 90 ? 'var(--success)' : 'var(--primary)'}
                opacity={0.85}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Summary row */}
      <div className="mt-3 grid grid-cols-3 gap-3">
        {[
          { id: 'att-sum-avg', label: 'Campus Average', value: '85.9%', color: 'text-primary' },
          { id: 'att-sum-best', label: 'Best — Nursing', value: '95.8%', color: 'text-success' },
          { id: 'att-sum-alert', label: 'At Risk Colleges', value: '2', color: 'text-danger' },
        ].map((s) => (
          <div key={s.id} className="bg-muted/50 rounded-lg p-2.5 text-center">
            <p className={`text-base font-bold font-tabular ${s.color}`}>{s.value}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}