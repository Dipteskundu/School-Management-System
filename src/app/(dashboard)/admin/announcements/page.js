"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Bell, Calendar } from "lucide-react";

const initialAnnouncements = [
  {
    id: 1,
    title: "Annual Day Celebration",
    content: "The annual day celebration will be held on January 25th. All students are expected to participate.",
    author: "Principal",
    date: "2024-01-10",
    priority: "High",
    target: "ALL",
  },
  {
    id: 2,
    title: "Parent-Teacher Meeting",
    content: "Parent-teacher meeting scheduled for January 20th. Parents are requested to attend.",
    author: "Admin",
    date: "2024-01-08",
    priority: "Medium",
    target: "PARENT",
  },
  {
    id: 3,
    title: "Science Exhibition",
    content: "Science exhibition will be held next week. Students from classes 8-10 can participate.",
    author: "Science Dept",
    date: "2024-01-05",
    priority: "Medium",
    target: "STUDENT",
  },
];

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    priority: "",
    target: "",
  });

  const handleAddAnnouncement = () => {
    if (newAnnouncement.title && newAnnouncement.content) {
      setAnnouncements([
        ...announcements,
        {
          id: announcements.length + 1,
          ...newAnnouncement,
          author: "Admin",
          date: new Date().toISOString().split("T")[0],
        },
      ]);
      setNewAnnouncement({ title: "", content: "", priority: "", target: "" });
      setIsDialogOpen(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      case "Low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Announcements</h2>
          <p className="text-muted-foreground">Create and manage school announcements</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Announcement
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Announcement</DialogTitle>
              <DialogDescription>Post a new announcement to the school.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                  placeholder="Enter announcement title"
                />
              </div>
              <div className="space-y-2">
                <Label>Content</Label>
                <Textarea
                  value={newAnnouncement.content}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                  placeholder="Enter announcement content"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select value={newAnnouncement.priority} onValueChange={(v) => setNewAnnouncement({ ...newAnnouncement, priority: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Target Audience</Label>
                  <Select value={newAnnouncement.target} onValueChange={(v) => setNewAnnouncement({ ...newAnnouncement, target: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All</SelectItem>
                      <SelectItem value="STUDENT">Students</SelectItem>
                      <SelectItem value="TEACHER">Teachers</SelectItem>
                      <SelectItem value="PARENT">Parents</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddAnnouncement}>Post Announcement</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {announcements.map((announcement) => (
          <Card key={announcement.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    {announcement.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {announcement.date}
                    </span>
                    <span>By {announcement.author}</span>
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getPriorityColor(announcement.priority)}>
                    {announcement.priority}
                  </Badge>
                  <Badge variant="outline">{announcement.target}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{announcement.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
