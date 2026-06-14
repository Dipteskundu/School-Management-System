import StatsCard from "@/components/shared/StatsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, BookOpen, ClipboardCheck, DollarSign } from "lucide-react";

const stats = [
  { title: "Attendance", value: "92%", icon: ClipboardCheck, description: "This semester" },
  { title: "Subjects", value: "6", icon: BookOpen, description: "Enrolled subjects" },
  { title: "Average Grade", value: "B+", icon: BookOpen, description: "Overall performance" },
  { title: "Pending Fees", value: "$150", icon: DollarSign, description: "Due by Jan 30" },
];

const upcomingEvents = [
  { id: 1, event: "Math Quiz", date: "2024-01-18", type: "Exam" },
  { id: 2, event: "Science Lab", date: "2024-01-20", type: "Lab" },
  { id: 3, event: "Parent-Teacher Meeting", date: "2024-01-22", type: "Event" },
];

export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back, Student!</h2>
        <p className="text-muted-foreground">Here&apos;s your academic overview.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Your upcoming schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{event.event}</p>
                      <p className="text-sm text-muted-foreground">{event.date}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{event.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Grades</CardTitle>
            <CardDescription>Your latest results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { subject: "Mathematics", grade: "A", marks: 85 },
                { subject: "English", grade: "B+", marks: 78 },
                { subject: "Physics", grade: "A-", marks: 82 },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <p className="font-medium">{item.subject}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">{item.marks}/100</span>
                    <Badge>{item.grade}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
