import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar } from "lucide-react";

const announcements = [
  {
    id: 1,
    title: "Annual Day Celebration",
    content: "The annual day celebration will be held on January 25th. All staff are requested to attend.",
    author: "Principal",
    date: "2024-01-10",
    priority: "High",
  },
  {
    id: 2,
    title: "Staff Meeting",
    content: "Staff meeting scheduled for January 18th at 3 PM in the conference room.",
    author: "Admin",
    date: "2024-01-08",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Exam Schedule Released",
    content: "Final exam schedule has been released. Please check the academic portal.",
    author: "Academic Dept",
    date: "2024-01-05",
    priority: "Low",
  },
];

export default function AnnouncementsPage() {
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
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Announcements</h2>
        <p className="text-muted-foreground">Latest school announcements</p>
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
                <Badge className={getPriorityColor(announcement.priority)}>
                  {announcement.priority}
                </Badge>
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
