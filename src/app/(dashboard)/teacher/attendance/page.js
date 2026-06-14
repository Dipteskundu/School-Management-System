"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock } from "lucide-react";

const students = [
  { id: 1, name: "John Smith", rollNo: 1, status: "PRESENT" },
  { id: 2, name: "Sarah Johnson", rollNo: 2, status: "PRESENT" },
  { id: 3, name: "Mike Davis", rollNo: 15, status: "ABSENT" },
  { id: 4, name: "Emily Brown", rollNo: 8, status: "LATE" },
  { id: 5, name: "Chris Wilson", rollNo: 12, status: "PRESENT" },
];

export default function AttendancePage() {
  const [attendance, setAttendance] = useState(students);
  const [selectedClass, setSelectedClass] = useState("10-A");

  const updateStatus = (id, status) => {
    setAttendance(
      attendance.map((s) => (s.id === id ? { ...s, status } : s))
    );
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "PRESENT":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "ABSENT":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "LATE":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const presentCount = attendance.filter((s) => s.status === "PRESENT").length;
  const absentCount = attendance.filter((s) => s.status === "ABSENT").length;
  const lateCount = attendance.filter((s) => s.status === "LATE").length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Attendance</h2>
        <p className="text-muted-foreground">Mark daily attendance for your classes</p>
      </div>

      <div className="flex items-center gap-4">
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10-A">Class 10-A</SelectItem>
            <SelectItem value="10-B">Class 10-B</SelectItem>
            <SelectItem value="9-A">Class 9-A</SelectItem>
            <SelectItem value="9-B">Class 9-B</SelectItem>
          </SelectContent>
        </Select>
        <Input type="date" className="w-48" defaultValue={new Date().toISOString().split("T")[0]} />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{presentCount}</p>
                <p className="text-sm text-muted-foreground">Present</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <XCircle className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-2xl font-bold">{absentCount}</p>
                <p className="text-sm text-muted-foreground">Absent</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{lateCount}</p>
                <p className="text-sm text-muted-foreground">Late</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mark Attendance - {selectedClass}</CardTitle>
          <CardDescription>{new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll No</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendance.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.rollNo}</TableCell>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        student.status === "PRESENT"
                          ? "default"
                          : student.status === "ABSENT"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant={student.status === "PRESENT" ? "default" : "outline"}
                        size="sm"
                        onClick={() => updateStatus(student.id, "PRESENT")}
                      >
                        Present
                      </Button>
                      <Button
                        variant={student.status === "ABSENT" ? "destructive" : "outline"}
                        size="sm"
                        onClick={() => updateStatus(student.id, "ABSENT")}
                      >
                        Absent
                      </Button>
                      <Button
                        variant={student.status === "LATE" ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => updateStatus(student.id, "LATE")}
                      >
                        Late
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 flex justify-end">
            <Button>Save Attendance</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
