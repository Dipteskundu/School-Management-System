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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";

const initialSubjects = [
  { id: 1, name: "Mathematics", code: "MATH101", class: "10-A", teacher: "Dr. Robert Wilson", credits: 4 },
  { id: 2, name: "English", code: "ENG101", class: "10-A", teacher: "Ms. Jennifer Lee", credits: 3 },
  { id: 3, name: "Physics", code: "PHY101", class: "10-A", teacher: "Mr. David Chen", credits: 4 },
  { id: 4, name: "Chemistry", code: "CHEM101", class: "9-A", teacher: "Mrs. Amanda Taylor", credits: 3 },
  { id: 5, name: "Biology", code: "BIO101", class: "9-A", teacher: "Dr. Robert Wilson", credits: 3 },
];

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState(initialSubjects);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newSubject, setNewSubject] = useState({
    name: "",
    code: "",
    class: "",
    teacher: "",
    credits: "3",
  });

  const filteredSubjects = subjects.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddSubject = () => {
    if (newSubject.name && newSubject.code && newSubject.class) {
      setSubjects([
        ...subjects,
        { id: Date.now(), ...newSubject, credits: parseInt(newSubject.credits) },
      ]);
      setNewSubject({ name: "", code: "", class: "", teacher: "", credits: "3" });
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Subjects</h2>
          <p className="text-muted-foreground">Manage subjects and curriculum</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Subject
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Subject</DialogTitle>
              <DialogDescription>Add a new subject to the curriculum.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Subject Name</Label>
                  <Input
                    value={newSubject.name}
                    onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                    placeholder="e.g., Mathematics"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subject Code</Label>
                  <Input
                    value={newSubject.code}
                    onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })}
                    placeholder="e.g., MATH101"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Class</Label>
                <Select value={newSubject.class} onValueChange={(v) => setNewSubject({ ...newSubject, class: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10-A">10-A</SelectItem>
                    <SelectItem value="10-B">10-B</SelectItem>
                    <SelectItem value="9-A">9-A</SelectItem>
                    <SelectItem value="9-B">9-B</SelectItem>
                    <SelectItem value="8-A">8-A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Teacher</Label>
                <Input
                  value={newSubject.teacher}
                  onChange={(e) => setNewSubject({ ...newSubject, teacher: e.target.value })}
                  placeholder="Enter teacher name"
                />
              </div>
              <div className="space-y-2">
                <Label>Credits</Label>
                <Input
                  type="number"
                  value={newSubject.credits}
                  onChange={(e) => setNewSubject({ ...newSubject, credits: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddSubject}>Add Subject</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search subjects..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubjects.map((subject) => (
                <TableRow key={subject.id}>
                  <TableCell className="font-medium">{subject.name}</TableCell>
                  <TableCell>{subject.code}</TableCell>
                  <TableCell>{subject.class}</TableCell>
                  <TableCell>{subject.teacher}</TableCell>
                  <TableCell>{subject.credits}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
