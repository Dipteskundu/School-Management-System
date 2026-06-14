import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock } from "lucide-react";

const attendanceData = [
  { month: "January 2024", present: 20, absent: 2, late: 1 },
  { month: "December 2023", present: 18, absent: 3, late: 2 },
  { month: "November 2023", present: 21, absent: 1, late: 1 },
];

export default function ParentAttendancePage() {
  const totalDays = attendanceData.reduce((sum, m) => sum + m.present + m.absent + m.late, 0);
  const totalPresent = attendanceData.reduce((sum, m) => sum + m.present, 0);
  const attendancePercentage = Math.round((totalPresent / totalDays) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Child&apos;s Attendance</h2>
        <p className="text-muted-foreground">Attendance record of your child</p>
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
                {totalPresent} / {totalDays} days present
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

      <Card>
        <CardHeader>
          <CardTitle>Monthly Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {attendanceData.map((month, index) => (
              <div key={index} className="p-4 rounded-lg border">
                <p className="font-medium mb-3">{month.month}</p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">{month.present}</p>
                      <p className="text-xs text-muted-foreground">Present</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="font-medium">{month.absent}</p>
                      <p className="text-xs text-muted-foreground">Absent</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="font-medium">{month.late}</p>
                      <p className="text-xs text-muted-foreground">Late</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
