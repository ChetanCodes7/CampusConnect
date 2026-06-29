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
  Legend,
} from 'recharts';

const enrollmentData = [
  { year: '2020', undergraduate: 12840, graduate: 1820, exchange: 210 },
  { year: '2021', undergraduate: 13150, graduate: 1940, exchange: 95 },
  { year: '2022', undergraduate: 13620, graduate: 2080, exchange: 310 },
  { year: '2023', undergraduate: 14100, graduate: 2210, exchange: 420 },
  { year: '2024', undergraduate: 14780, graduate: 2310, exchange: 510 },
  { year: '2025', undergraduate: 15120, graduate: 2440, exchange: 580 },
];

interface TooltipPayload {
  value: number;
  name: string;
  color: string;
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: TooltipPayload[]; label?: string }) => {
  if (active && payload && payload.length) {
    const total = payload.reduce((sum, p) => sum + p.value, 0);
    return (
      <div className="bg-card border border-border rounded-xl px-4 py-3 shadow-card-md text-xs min-w-[160px]">
        <p className="font-semibold text-foreground mb-2">{label} Academic Year</p>
        {payload.map((p, i) => (
          <div key={`enroll-tt-${i}`} className="flex items-center justify-between gap-4 mb-1">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
              <span className="text-muted-foreground">{p.name}</span>
            </div>
            <span className="font-semibold text-foreground font-tabular">{p.value.toLocaleString()}</span>
          </div>
        ))}
        <div className="border-t border-border mt-2 pt-2 flex items-center justify-between">
          <span className="text-muted-foreground font-medium">Total</span>
          <span className="font-bold text-primary font-tabular">{total.toLocaleString()}</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function EnrollmentTrendChart() {
  return (
    <div className="card-base p-5 h-full">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="section-header">Enrollment Trend</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Student enrollment by category — 2020 to 2025</p>
        </div>
        <div className="hidden sm:flex items-center gap-1 bg-success/10 border border-success/20 rounded-lg px-2.5 py-1">
          <span className="text-[11px] font-semibold text-success">+17.8% since 2020</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={enrollmentData} margin={{ top: 5, right: 10, left: -5, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: '11px', paddingTop: '12px' }}
            iconType="circle"
            iconSize={8}
          />
          <Line
            type="monotone"
            dataKey="undergraduate"
            name="Undergraduate"
            stroke="var(--primary)"
            strokeWidth={2.5}
            dot={{ fill: 'var(--primary)', r: 4, strokeWidth: 2, stroke: 'var(--card)' }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="graduate"
            name="Graduate"
            stroke="var(--success)"
            strokeWidth={2}
            dot={{ fill: 'var(--success)', r: 3, strokeWidth: 2, stroke: 'var(--card)' }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="exchange"
            name="Exchange"
            stroke="var(--accent)"
            strokeWidth={2}
            strokeDasharray="5 3"
            dot={{ fill: 'var(--accent)', r: 3, strokeWidth: 2, stroke: 'var(--card)' }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}