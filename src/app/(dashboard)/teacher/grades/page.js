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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil } from "lucide-react";

const students = [
  { id: 1, name: "John Smith", rollNo: 1, marks: 85, examType: "Quiz" },
  { id: 2, name: "Sarah Johnson", rollNo: 2, marks: 92, examType: "Assignment" },
  { id: 3, name: "Mike Davis", rollNo: 15, marks: 68, examType: "Midterm" },
  { id: 4, name: "Emily Brown", rollNo: 8, marks: 78, examType: "Quiz" },
  { id: 5, name: "Chris Wilson", rollNo: 12, marks: 95, examType: "Final" },
];

export default function GradesPage() {
  const [gradeList, setGradeList] = useState(students);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newGrade, setNewGrade] = useState({
    studentId: "",
    marks: "",
    examType: "",
  });

  const getGrade = (marks) => {
    if (marks >= 90) return { label: "A+", color: "bg-green-100 text-green-700" };
    if (marks >= 80) return { label: "A", color: "bg-green-100 text-green-700" };
    if (marks >= 70) return { label: "B", color: "bg-blue-100 text-blue-700" };
    if (marks >= 60) return { label: "C", color: "bg-yellow-100 text-yellow-700" };
    return { label: "F", color: "bg-red-100 text-red-700" };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Grades</h2>
          <p className="text-muted-foreground">Enter and manage student grades</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Grade
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Grade</DialogTitle>
              <DialogDescription>Enter marks for a student.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Student</Label>
                <Select value={newGrade.studentId} onValueChange={(v) => setNewGrade({ ...newGrade, studentId: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((s) => (
                      <SelectItem key={s.id} value={s.id.toString()}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Marks</Label>
                  <Input type="number" value={newGrade.marks} onChange={(e) => setNewGrade({ ...newGrade, marks: e.target.value })} placeholder="0-100" />
                </div>
                <div className="space-y-2">
                  <Label>Exam Type</Label>
                  <Select value={newGrade.examType} onValueChange={(v) => setNewGrade({ ...newGrade, examType: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Quiz">Quiz</SelectItem>
                      <SelectItem value="Assignment">Assignment</SelectItem>
                      <SelectItem value="Midterm">Midterm</SelectItem>
                      <SelectItem value="Final">Final</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsDialogOpen(false)}>Save Grade</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mathematics - Class 10-A</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll No</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Exam Type</TableHead>
                <TableHead>Marks</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gradeList.map((student) => {
                const grade = getGrade(student.marks);
                return (
                  <TableRow key={student.id}>
                    <TableCell>{student.rollNo}</TableCell>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.examType}</TableCell>
                    <TableCell>{student.marks}/100</TableCell>
                    <TableCell>
                      <Badge className={grade.color}>{grade.label}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
