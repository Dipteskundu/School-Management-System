import StatsCard from "@/components/shared/StatsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, ClipboardCheck, BookOpen, DollarSign } from "lucide-react";

const stats = [
  { title: "Child's Attendance", value: "92%", icon: ClipboardCheck, description: "This semester" },
  { title: "Average Grade", value: "B+", icon: BookOpen, description: "Overall performance" },
  { title: "Pending Fees", value: "$150", icon: DollarSign, description: "Due by Jan 30" },
  { title: "Class Rank", value: "12/42", icon: Users, description: "In class 10-A" },
];

export default function ParentDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Parent Dashboard</h2>
        <p className="text-muted-foreground">Monitor your child&apos;s academic progress</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Child&apos;s Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold">
                  JS
                </div>
                <div>
                  <p className="font-medium text-lg">John Smith</p>
                  <p className="text-muted-foreground">Class 10-A | Roll No: 1</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">Student ID</p>
                  <p className="font-medium">STU-2024-001</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date of Birth</p>
                  <p className="font-medium">2008-05-15</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Blood Group</p>
                  <p className="font-medium">O+</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">+1 234 567 890</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates about your child</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Attendance marked present", date: "Today", type: "Attendance" },
                { action: "Math quiz score: 85/100", date: "Yesterday", type: "Grade" },
                { action: "Fee payment received", date: "2 days ago", type: "Fee" },
                { action: "Parent-teacher meeting scheduled", date: "3 days ago", type: "Event" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.date}</p>
                  </div>
                  <Badge variant="outline">{activity.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
