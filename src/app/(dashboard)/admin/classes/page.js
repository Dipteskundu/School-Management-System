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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Pencil, Trash2, Users } from "lucide-react";

const initialClasses = [
  { id: 1, name: "Class 10", section: "A", teacher: "Dr. Robert Wilson", students: 42, capacity: 45 },
  { id: 2, name: "Class 10", section: "B", teacher: "Ms. Jennifer Lee", students: 40, capacity: 45 },
  { id: 3, name: "Class 9", section: "A", teacher: "Mr. David Chen", students: 38, capacity: 45 },
  { id: 4, name: "Class 9", section: "B", teacher: "Mrs. Amanda Taylor", students: 41, capacity: 45 },
  { id: 5, name: "Class 8", section: "A", teacher: "Dr. Robert Wilson", students: 39, capacity: 45 },
];

export default function ClassesPage() {
  const [classes, setClasses] = useState(initialClasses);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newClass, setNewClass] = useState({
    name: "",
    section: "",
    teacher: "",
    capacity: "45",
  });

  const filteredClasses = classes.filter(
    (c) =>
      `${c.name}-${c.section}`.toLowerCase().includes(search.toLowerCase()) ||
      c.teacher.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddClass = () => {
    if (newClass.name && newClass.section) {
      setClasses([
        ...classes,
        {
          id: Date.now(),
          ...newClass,
          students: 0,
          capacity: parseInt(newClass.capacity),
        },
      ]);
      setNewClass({ name: "", section: "", teacher: "", capacity: "45" });
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Classes</h2>
          <p className="text-muted-foreground">Manage class sections and assignments</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Class
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Class</DialogTitle>
              <DialogDescription>
                Create a new class section.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Class Name</Label>
                  <Input
                    value={newClass.name}
                    onChange={(e) =>
                      setNewClass({ ...newClass, name: e.target.value })
                    }
                    placeholder="e.g., Class 10"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Section</Label>
                  <Input
                    value={newClass.section}
                    onChange={(e) =>
                      setNewClass({ ...newClass, section: e.target.value })
                    }
                    placeholder="e.g., A"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Class Teacher</Label>
                <Input
                  value={newClass.teacher}
                  onChange={(e) =>
                    setNewClass({ ...newClass, teacher: e.target.value })
                  }
                  placeholder="Enter teacher name"
                />
              </div>
              <div className="space-y-2">
                <Label>Capacity</Label>
                <Input
                  type="number"
                  value={newClass.capacity}
                  onChange={(e) =>
                    setNewClass({ ...newClass, capacity: e.target.value })
                  }
                  placeholder="Max students"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddClass}>Add Class</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search classes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Class Teacher</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClasses.map((cls) => (
                <TableRow key={cls.id}>
                  <TableCell className="font-medium">{cls.name}</TableCell>
                  <TableCell>{cls.section}</TableCell>
                  <TableCell>{cls.teacher}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {cls.students}/{cls.capacity}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        cls.students < cls.capacity ? "default" : "secondary"
                      }
                    >
                      {cls.students < cls.capacity ? "Available" : "Full"}
                    </Badge>
                  </TableCell>
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
