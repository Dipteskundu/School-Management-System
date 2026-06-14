import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const grades = [
  { subject: "Mathematics", quiz: 85, assignment: 90, midterm: 82 },
  { subject: "English", quiz: 78, assignment: 85, midterm: 80 },
  { subject: "Physics", quiz: 82, assignment: 88, midterm: 79 },
  { subject: "Chemistry", quiz: 75, assignment: 80, midterm: 77 },
  { subject: "Biology", quiz: 88, assignment: 92, midterm: 85 },
];

export default function ParentGradesPage() {
  const getGrade = (marks) => {
    if (marks >= 90) return { label: "A+", color: "bg-green-100 text-green-700" };
    if (marks >= 80) return { label: "A", color: "bg-green-100 text-green-700" };
    if (marks >= 70) return { label: "B", color: "bg-blue-100 text-blue-700" };
    if (marks >= 60) return { label: "C", color: "bg-yellow-100 text-yellow-700" };
    return { label: "F", color: "bg-red-100 text-red-700" };
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Child&apos;s Grades</h2>
        <p className="text-muted-foreground">Academic performance of your child</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Semester - John Smith (Class 10-A)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-3 text-left bg-muted">Subject</th>
                  <th className="border p-3 text-center bg-muted">Quiz</th>
                  <th className="border p-3 text-center bg-muted">Assignment</th>
                  <th className="border p-3 text-center bg-muted">Midterm</th>
                  <th className="border p-3 text-center bg-muted">Average</th>
                </tr>
              </thead>
              <tbody>
                {grades.map((grade, index) => {
                  const avg = Math.round((grade.quiz + grade.assignment + grade.midterm) / 3);
                  const gradeInfo = getGrade(avg);
                  return (
                    <tr key={index}>
                      <td className="border p-3 font-medium">{grade.subject}</td>
                      <td className="border p-3 text-center">{grade.quiz}</td>
                      <td className="border p-3 text-center">{grade.assignment}</td>
                      <td className="border p-3 text-center">{grade.midterm}</td>
                      <td className="border p-3 text-center">
                        <Badge className={gradeInfo.color}>{gradeInfo.label} ({avg})</Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
