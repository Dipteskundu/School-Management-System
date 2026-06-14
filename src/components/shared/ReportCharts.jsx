"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function EnrollmentByClassChart() {
  const classData = [
    { class: "Class 1", students: 45 },
    { class: "Class 2", students: 52 },
    { class: "Class 3", students: 48 },
    { class: "Class 4", students: 61 },
    { class: "Class 5", students: 55 },
    { class: "Class 6", students: 43 },
    { class: "Class 7", students: 58 },
    { class: "Class 8", students: 47 },
  ];

  const maxStudents = Math.max(...classData.map((d) => d.students));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Student Enrollment by Class</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between gap-2 h-48">
          {classData.map((data) => {
            const height = (data.students / maxStudents) * 100;
            return (
              <div key={data.class} className="flex flex-col items-center flex-1">
                <div className="w-full flex flex-col items-center" style={{ height: "140px" }}>
                  <div className="w-full flex flex-col justify-end" style={{ height: "100%" }}>
                    <div
                      className="w-full bg-primary rounded-t transition-all duration-500 hover:bg-primary/80"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs text-muted-foreground mt-2">{data.class.replace("Class ", "C")}</span>
                <span className="text-xs font-medium">{data.students}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export function AttendanceOverviewChart() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const attendanceData = [
    { month: "Jan", present: 92, absent: 8 },
    { month: "Feb", present: 88, absent: 12 },
    { month: "Mar", present: 95, absent: 5 },
    { month: "Apr", present: 90, absent: 10 },
    { month: "May", present: 87, absent: 13 },
    { month: "Jun", present: 91, absent: 9 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Attendance Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-48">
          <svg className="w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
            <defs>
              <linearGradient id="attendanceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
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
                <text
                  x="-5"
                  y={150 - (tick / 100) * 140 + 4}
                  fill="hsl(var(--muted-foreground))"
                  fontSize="10"
                  textAnchor="end"
                >
                  {tick}%
                </text>
              </g>
            ))}

            {/* Area fill */}
            <path
              d={`M ${attendanceData.map((d, i) => `${(i / (attendanceData.length - 1)) * 380 + 10},${150 - (d.present / 100) * 140}`).join(" L ")} L 390,150 L 10,150 Z`}
              fill="url(#attendanceGradient)"
            />
            
            {/* Line */}
            <polyline
              points={attendanceData.map((d, i) => `${(i / (attendanceData.length - 1)) * 380 + 10},${150 - (d.present / 100) * 140}`).join(" ")}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data points */}
            {attendanceData.map((d, i) => (
              <g key={d.month}>
                <circle
                  cx={(i / (attendanceData.length - 1)) * 380 + 10}
                  cy={150 - (d.present / 100) * 140}
                  r="5"
                  fill="hsl(var(--background))"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                />
                <text
                  x={(i / (attendanceData.length - 1)) * 380 + 10}
                  y="165"
                  fill="hsl(var(--muted-foreground))"
                  fontSize="10"
                  textAnchor="middle"
                >
                  {d.month}
                </text>
              </g>
            ))}
          </svg>
        </div>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Attendance Rate</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function GradeDistributionChart() {
  const gradeData = [
    { grade: "A+", count: 85, color: "#22c55e" },
    { grade: "A", count: 120, color: "#3b82f6" },
    { grade: "B+", count: 95, color: "#8b5cf6" },
    { grade: "B", count: 75, color: "#f59e0b" },
    { grade: "C", count: 45, color: "#f97316" },
    { grade: "F", count: 30, color: "#ef4444" },
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
    return { ...d, dash, offset, rotation };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Grade Distribution</CardTitle>
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
            {segments.map((seg, i) => (
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
            <span className="text-sm text-muted-foreground">Students</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4">
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

export function FeeCollectionSummaryChart() {
  const feeData = [
    { month: "Jan", collected: 45000, pending: 8000 },
    { month: "Feb", collected: 42000, pending: 10000 },
    { month: "Mar", collected: 48000, pending: 6000 },
    { month: "Apr", collected: 44000, pending: 9000 },
    { month: "May", collected: 46000, pending: 7500 },
    { month: "Jun", collected: 50000, pending: 5000 },
  ];

  const maxValue = Math.max(...feeData.map((d) => d.collected + d.pending));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Fee Collection Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between gap-2 h-48">
          {feeData.map((data) => {
            const collectedHeight = (data.collected / maxValue) * 100;
            const pendingHeight = (data.pending / maxValue) * 100;
            return (
              <div key={data.month} className="flex flex-col items-center flex-1">
                <div className="w-full flex flex-col items-center gap-1" style={{ height: "140px" }}>
                  <div className="w-full flex flex-col justify-end" style={{ height: "100%" }}>
                    {data.pending > 0 && (
                      <div
                        className="w-full bg-yellow-500 rounded-t transition-all duration-500"
                        style={{ height: `${pendingHeight}%` }}
                      />
                    )}
                    {data.collected > 0 && (
                      <div
                        className="w-full bg-green-500 transition-all duration-500"
                        style={{
                          height: `${collectedHeight}%`,
                          borderRadius: data.pending === 0 ? "0.25rem 0.25rem 0 0" : "0",
                        }}
                      />
                    )}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground mt-2">{data.month}</span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-green-500" />
            <span className="text-sm text-muted-foreground">Collected</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-yellow-500" />
            <span className="text-sm text-muted-foreground">Pending</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function TeacherPerformanceChart() {
  const teacherData = [
    { name: "Mrs. Smith", rating: 4.8 },
    { name: "Mr. Johnson", rating: 4.6 },
    { name: "Ms. Brown", rating: 4.9 },
    { name: "Mr. Davis", rating: 4.5 },
    { name: "Mrs. Wilson", rating: 4.7 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Teacher Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teacherData.map((teacher) => {
            const width = (teacher.rating / 5) * 100;
            return (
              <div key={teacher.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{teacher.name}</span>
                  <span className="text-muted-foreground">{teacher.rating}/5.0</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${width}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export function ClassPerformanceChart() {
  const classData = [
    { class: "10-A", average: 85 },
    { class: "10-B", average: 78 },
    { class: "9-A", average: 82 },
    { class: "9-B", average: 75 },
    { class: "8-A", average: 88 },
    { class: "8-B", average: 80 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Class Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {classData.map((cls) => {
            const width = cls.average;
            let color = "bg-green-500";
            if (cls.average < 75) color = "bg-red-500";
            else if (cls.average < 80) color = "bg-yellow-500";
            
            return (
              <div key={cls.class} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{cls.class}</span>
                  <span className="text-muted-foreground">{cls.average}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${color}`}
                    style={{ width: `${width}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
