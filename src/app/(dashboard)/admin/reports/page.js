import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Download, FileText, Users, TrendingUp, DollarSign, GraduationCap, BookOpen } from "lucide-react";
import {
  EnrollmentByClassChart,
  AttendanceOverviewChart,
  GradeDistributionChart,
  FeeCollectionSummaryChart,
  TeacherPerformanceChart,
  ClassPerformanceChart,
} from "@/components/shared/ReportCharts";

const reports = [
  { id: 1, title: "Student Enrollment Report", description: "Total students enrolled by class and section", icon: Users, count: "1,234 students" },
  { id: 2, title: "Attendance Report", description: "Monthly attendance summary for all classes", icon: BarChart3, count: "89.2% average" },
  { id: 3, title: "Grade Distribution", description: "Exam results and grade distribution", icon: TrendingUp, count: "450 records" },
  { id: 4, title: "Fee Collection", description: "Fee payment status and collection summary", icon: DollarSign, count: "$45,678 collected" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Reports</h2>
        <p className="text-muted-foreground">Generate and download school reports</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      <CardDescription>{report.description}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{report.count}</span>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Analytics Overview</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <EnrollmentByClassChart />
          <AttendanceOverviewChart />
          <GradeDistributionChart />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <FeeCollectionSummaryChart />
        <TeacherPerformanceChart />
        <ClassPerformanceChart />
      </div>
    </div>
  );
}
