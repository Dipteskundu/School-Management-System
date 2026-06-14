import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock } from "lucide-react";

const attendanceData = [
  { month: "January 2024", present: 20, absent: 2, late: 1 },
  { month: "December 2023", present: 18, absent: 3, late: 2 },
  { month: "November 2023", present: 21, absent: 1, late: 1 },
];

const recentAttendance = [
  { date: "2024-01-15", status: "PRESENT" },
  { date: "2024-01-14", status: "PRESENT" },
  { date: "2024-01-13", status: "LATE" },
  { date: "2024-01-12", status: "PRESENT" },
  { date: "2024-01-11", status: "ABSENT" },
];

export default function StudentAttendancePage() {
  const totalDays = attendanceData.reduce((sum, m) => sum + m.present + m.absent + m.late, 0);
  const totalPresent = attendanceData.reduce((sum, m) => sum + m.present, 0);
  const attendancePercentage = Math.round((totalPresent / totalDays) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">My Attendance</h2>
        <p className="text-muted-foreground">Track your attendance record</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Overall Attendance</p>
              <p className="text-3xl font-bold">{attendancePercentage}%</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">
                {totalPresent} / {totalDays} days
              </p>
            </div>
          </div>
          <div className="mt-4 w-full bg-muted rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all"
              style={{ width: `${attendancePercentage}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {attendanceData.map((month, index) => (
                <div key={index} className="p-3 rounded-lg border">
                  <p className="font-medium mb-2">{month.month}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      {month.present}
                    </span>
                    <span className="flex items-center gap-1 text-red-600">
                      <XCircle className="h-4 w-4" />
                      {month.absent}
                    </span>
                    <span className="flex items-center gap-1 text-yellow-600">
                      <Clock className="h-4 w-4" />
                      {month.late}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAttendance.map((record, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <span className="text-sm">{record.date}</span>
                  <Badge
                    variant={
                      record.status === "PRESENT"
                        ? "default"
                        : record.status === "ABSENT"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {record.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
