import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = [
  "8:00 AM - 9:00 AM",
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 1:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
];

const schedule = {
  Monday: {
    "8:00 AM - 9:00 AM": { subject: "Mathematics", class: "10-A", room: "Room 101" },
    "11:00 AM - 12:00 PM": { subject: "Physics", class: "9-A", room: "Room 103" },
    "2:00 PM - 3:00 PM": { subject: "Mathematics", class: "9-B", room: "Room 104" },
  },
  Tuesday: {
    "9:00 AM - 10:00 AM": { subject: "Mathematics", class: "10-B", room: "Room 102" },
    "11:00 AM - 12:00 PM": { subject: "Physics", class: "10-A", room: "Room 101" },
  },
  Wednesday: {
    "8:00 AM - 9:00 AM": { subject: "Mathematics", class: "10-A", room: "Room 101" },
    "2:00 PM - 3:00 PM": { subject: "Physics", class: "9-A", room: "Room 103" },
  },
  Thursday: {
    "9:00 AM - 10:00 AM": { subject: "Mathematics", class: "10-B", room: "Room 102" },
    "11:00 AM - 12:00 PM": { subject: "Physics", class: "9-B", room: "Room 104" },
  },
  Friday: {
    "8:00 AM - 9:00 AM": { subject: "Mathematics", class: "10-A", room: "Room 101" },
    "9:00 AM - 10:00 AM": { subject: "Physics", class: "9-A", room: "Room 103" },
  },
};

export default function SchedulePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Schedule</h2>
        <p className="text-muted-foreground">Your weekly class schedule</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Weekly Timetable
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 text-left bg-muted">Time</th>
                  {days.map((day) => (
                    <th key={day} className="border p-2 text-left bg-muted">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((time) => (
                  <tr key={time}>
                    <td className="border p-2 text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        {time}
                      </div>
                    </td>
                    {days.map((day) => {
                      const classInfo = schedule[day]?.[time];
                      return (
                        <td key={`${day}-${time}`} className="border p-2">
                          {classInfo ? (
                            <div className="p-2 rounded-lg bg-primary/10 text-sm">
                              <p className="font-medium">{classInfo.subject}</p>
                              <p className="text-muted-foreground">
                                {classInfo.class} | {classInfo.room}
                              </p>
                            </div>
                          ) : null}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
