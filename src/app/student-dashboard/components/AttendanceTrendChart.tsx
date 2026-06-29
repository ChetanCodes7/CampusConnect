'use client';
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

const attendanceData = [
  { week: 'Wk 3', attendance: 92, threshold: 75 },
  { week: 'Wk 4', attendance: 88, threshold: 75 },
  { week: 'Wk 5', attendance: 95, threshold: 75 },
  { week: 'Wk 6', attendance: 73, threshold: 75 },
  { week: 'Wk 7', attendance: 80, threshold: 75 },
  { week: 'Wk 8', attendance: 85, threshold: 75 },
  { week: 'Wk 9', attendance: 91, threshold: 75 },
  { week: 'Wk 10', attendance: 87, threshold: 75 },
];

interface TooltipPayload {
  value: number;
  name: string;
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: TooltipPayload[]; label?: string }) => {
  if (active && payload && payload.length) {
    const val = payload[0].value;
    const isBelow = val < 75;
    return (
      <div className="bg-card border border-border rounded-xl px-3 py-2.5 shadow-card-md text-xs">
        <p className="font-semibold text-foreground mb-1">{label}</p>
        <p className={`font-bold text-sm ${isBelow ? 'text-danger' : 'text-success'}`}>
          {val}% attendance
        </p>
        {isBelow && (
          <p className="text-danger text-[11px] mt-0.5">⚠ Below 75% threshold</p>
        )}
      </div>
    );
  }
  return null;
};

export default function AttendanceTrendChart() {
  return (
    <div className="card-base p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="section-header">Attendance Trend</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Weekly attendance — Spring 2025</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
            <span className="text-muted-foreground">Attendance</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-0.5 bg-danger rounded" style={{ borderStyle: 'dashed' }} />
            <span className="text-muted-foreground">75% Min</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={attendanceData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="attendanceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2} />
              <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="week"
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[60, 100]}
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            y={75}
            stroke="var(--danger)"
            strokeDasharray="4 4"
            strokeWidth={1.5}
          />
          <Area
            type="monotone"
            dataKey="attendance"
            stroke="var(--primary)"
            strokeWidth={2.5}
            fill="url(#attendanceGrad)"
            dot={{ fill: 'var(--primary)', r: 4, strokeWidth: 2, stroke: 'var(--card)' }}
            activeDot={{ r: 6, fill: 'var(--primary)', strokeWidth: 2, stroke: 'var(--card)' }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Week 6 Warning Note */}
      <div className="mt-3 flex items-center gap-2 bg-warning/8 border border-warning/20 rounded-lg px-3 py-2">
        <span className="text-warning text-xs">⚠</span>
        <p className="text-xs text-warning font-medium">
          Week 6 dipped to 73% — below the 75% minimum threshold. Maintain consistent attendance to avoid academic penalty.
        </p>
      </div>
    </div>
  );
}