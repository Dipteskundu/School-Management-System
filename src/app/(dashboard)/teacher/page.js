import StatsCard from "@/components/shared/StatsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, ClipboardCheck, FileText } from "lucide-react";

const stats = [
  { title: "My Classes", value: "4", icon: BookOpen, description: "10-A, 10-B, 9-A, 9-B" },
  { title: "Total Students", value: "156", icon: Users, description: "Across all classes" },
  { title: "Pending Attendance", value: "2", icon: ClipboardCheck, description: "Classes pending" },
  { title: "Grades to Enter", value: "8", icon: FileText, description: "Pending entries" },
];

const todaySchedule = [
  { time: "8:00 AM - 9:00 AM", subject: "Mathematics", class: "10-A", room: "Room 101" },
  { time: "9:00 AM - 10:00 AM", subject: "Physics", class: "10-B", room: "Room 102" },
  { time: "11:00 AM - 12:00 PM", subject: "Mathematics", class: "9-A", room: "Room 103" },
  { time: "2:00 PM - 3:00 PM", subject: "Physics", class: "9-B", room: "Room 104" },
];

export default function TeacherDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back, Teacher!</h2>
        <p className="text-muted-foreground">Here&apos;s your schedule for today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Today&apos;s Schedule</CardTitle>
          <CardDescription>Your classes for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todaySchedule.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border"
              >
                <div className="flex items-center gap-4">
                  <div className="text-sm font-medium text-muted-foreground w-32">
                    {item.time}
                  </div>
                  <div>
                    <p className="font-medium">{item.subject}</p>
                    <p className="text-sm text-muted-foreground">Class {item.class}</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{item.room}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
