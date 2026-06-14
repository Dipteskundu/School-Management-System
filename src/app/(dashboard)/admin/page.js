import StatsCard from "@/components/shared/StatsCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, BookOpen, Calendar, DollarSign, TrendingUp } from "lucide-react";
import {
  EnrollmentTrendChart,
  RevenueOverviewChart,
  StudentDistributionChart,
  WeeklyAttendanceChart,
} from "@/components/shared/DashboardCharts";

const stats = [
  { title: "Total Students", value: "1,234", icon: Users, description: "+12% from last month" },
  { title: "Total Teachers", value: "56", icon: BookOpen, description: "+2 new this month" },
  { title: "Active Classes", value: "24", icon: Calendar, description: "Across all grades" },
  { title: "Revenue", value: "$45,678", icon: DollarSign, description: "98% collection rate" },
];

const recentActivities = [
  { id: 1, action: "New student enrolled", name: "John Smith", time: "2 hours ago" },
  { id: 2, action: "Fee payment received", name: "Sarah Johnson", time: "3 hours ago" },
  { id: 3, action: "Attendance marked", name: "Class 10-A", time: "5 hours ago" },
  { id: 4, action: "Report card generated", name: "Class 8-B", time: "1 day ago" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="animate-fade-in-up">
        <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
        <p className="text-muted-foreground">
          Here&apos;s what&apos;s happening at your school today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 stagger-children">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 stagger-children" style={{ animationDelay: '300ms' }}>
        <EnrollmentTrendChart />
        <RevenueOverviewChart />
        <StudentDistributionChart />
        <WeeklyAttendanceChart />
      </div>

      <div className="grid gap-4 md:grid-cols-2 stagger-children" style={{ animationDelay: '500ms' }}>
        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest actions in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0 animate-fade-in-up"
                  style={{ animationDelay: `${600 + index * 100}ms` }}
                >
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.name}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Attendance Overview</CardTitle>
            <CardDescription>Today&apos;s attendance summary</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Present</span>
                  <span className="text-sm text-green-600 font-medium">
                    89.2%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: "89.2%" }}
                  ></div>
                </div>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '700ms' }}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Absent</span>
                  <span className="text-sm text-red-600 font-medium">7.3%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div
                    className="bg-red-500 h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: "7.3%" }}
                  ></div>
                </div>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '800ms' }}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Late</span>
                  <span className="text-sm text-yellow-600 font-medium">
                    3.5%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: "3.5%" }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
