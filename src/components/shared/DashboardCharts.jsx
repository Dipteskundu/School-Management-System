"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function EnrollmentTrendChart() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const enrollmentData = [
    { month: "Jan", enrollment: 1180 },
    { month: "Feb", enrollment: 1195 },
    { month: "Mar", enrollment: 1210 },
    { month: "Apr", enrollment: 1225 },
    { month: "May", enrollment: 1230 },
    { month: "Jun", enrollment: 1234 },
  ];

  const minEnrollment = Math.min(...enrollmentData.map((d) => d.enrollment)) - 20;
  const maxEnrollment = Math.max(...enrollmentData.map((d) => d.enrollment)) + 20;
  const range = maxEnrollment - minEnrollment;

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-base">Enrollment Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-48">
          <svg className="w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
            <defs>
              <linearGradient id="enrollGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            
            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map((tick) => (
              <g key={tick}>
                <line
                  x1="0"
                  y1={150 - (tick / 100) * 140}
                  x2="400"
                  y2={150 - (tick / 100) * 140}
                  stroke="hsl(var(--border))"
                  strokeDasharray="4"
                  opacity="0.5"
                />
              </g>
            ))}

            {/* Area fill */}
            <path
              d={`M ${enrollmentData.map((d, i) => {
                const x = (i / (enrollmentData.length - 1)) * 380 + 10;
                const y = 150 - ((d.enrollment - minEnrollment) / range) * 140;
                return `${x},${y}`;
              }).join(" L ")} L 390,150 L 10,150 Z`}
              fill="url(#enrollGradient)"
            />
            
            {/* Line */}
            <polyline
              points={enrollmentData.map((d, i) => {
                const x = (i / (enrollmentData.length - 1)) * 380 + 10;
                const y = 150 - ((d.enrollment - minEnrollment) / range) * 140;
                return `${x},${y}`;
              }).join(" ")}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data points */}
            {enrollmentData.map((d, i) => {
              const x = (i / (enrollmentData.length - 1)) * 380 + 10;
              const y = 150 - ((d.enrollment - minEnrollment) / range) * 140;
              return (
                <g key={d.month}>
                  <circle
                    cx={x}
                    cy={y}
                    r="5"
                    fill="hsl(var(--background))"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                  />
                  <text
                    x={x}
                    y="165"
                    fill="hsl(var(--muted-foreground))"
                    fontSize="10"
                    textAnchor="middle"
                  >
                    {d.month}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        <div className="flex justify-center gap-6 mt-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Students Enrolled</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function RevenueOverviewChart() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const revenueData = [
    { month: "Jan", revenue: 45000 },
    { month: "Feb", revenue: 42000 },
    { month: "Mar", revenue: 48000 },
    { month: "Apr", revenue: 44000 },
    { month: "May", revenue: 46000 },
    { month: "Jun", revenue: 50000 },
  ];

  const maxRevenue = Math.max(...revenueData.map((d) => d.revenue));

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-base">Revenue Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between gap-2 h-48">
          {revenueData.map((data) => {
            const height = (data.revenue / maxRevenue) * 100;
            return (
              <div key={data.month} className="flex flex-col items-center flex-1">
                <div className="w-full flex flex-col items-center gap-1" style={{ height: "140px" }}>
                  <span className="text-xs font-medium">${(data.revenue / 1000).toFixed(0)}k</span>
                  <div className="w-full flex flex-col justify-end" style={{ height: "100%" }}>
                    <div
                      className="w-full bg-green-500 rounded-t transition-all duration-500 hover:bg-green-600"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs text-muted-foreground mt-2">{data.month}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export function StudentDistributionChart() {
  const gradeData = [
    { grade: "Grade 1-3", count: 320, color: "#22c55e" },
    { grade: "Grade 4-6", count: 410, color: "#3b82f6" },
    { grade: "Grade 7-8", count: 280, color: "#8b5cf6" },
    { grade: "Grade 9-10", count: 224, color: "#f59e0b" },
  ];

  const total = gradeData.reduce((sum, d) => sum + d.count, 0);
  const radius = 70;
  const strokeWidth = 25;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;
  const segments = gradeData.map((d) => {
    const percent = (d.count / total) * 100;
    const dash = (percent / 100) * circumference;
    const offset = circumference - dash;
    const rotation = (accumulatedPercent / 100) * 360 - 90;
    accumulatedPercent += percent;
    return { ...d, dash, offset, rotation, percent };
  });

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-base">Student Distribution</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative">
          <svg width="180" height="180" viewBox="0 0 180 180">
            <circle
              cx="90"
              cy="90"
              r={radius}
              fill="transparent"
              stroke="hsl(var(--muted))"
              strokeWidth={strokeWidth}
            />
            {segments.map((seg) => (
              <circle
                key={seg.grade}
                cx="90"
                cy="90"
                r={radius}
                fill="transparent"
                stroke={seg.color}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={seg.offset}
                transform={`rotate(${seg.rotation} 90 90)`}
                className="transition-all duration-700 ease-out"
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">{total}</span>
            <span className="text-sm text-muted-foreground">Total</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
          {gradeData.map((d) => (
            <div key={d.grade} className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
              <span className="text-xs">{d.grade}: {d.count}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function WeeklyAttendanceChart() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const attendanceData = [
    { day: "Mon", present: 92, absent: 8 },
    { day: "Tue", present: 88, absent: 12 },
    { day: "Wed", present: 95, absent: 5 },
    { day: "Thu", present: 90, absent: 10 },
    { day: "Fri", present: 87, absent: 13 },
  ];

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-base">Weekly Attendance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {attendanceData.map((data) => (
            <div key={data.day} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium w-10">{data.day}</span>
                <span className="text-muted-foreground">{data.present}%</span>
              </div>
              <div className="flex h-3 rounded-full overflow-hidden bg-muted">
                <div
                  className="bg-green-500 transition-all duration-500"
                  style={{ width: `${data.present}%` }}
                />
                <div
                  className="bg-red-500 transition-all duration-500"
                  style={{ width: `${data.absent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm text-muted-foreground">Present</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-sm text-muted-foreground">Absent</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
