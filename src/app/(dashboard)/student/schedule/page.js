import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = [
  "8:00 AM - 9:00 AM",
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
];

const schedule = {
  Monday: {
    "8:00 AM - 9:00 AM": { subject: "Mathematics", teacher: "Dr. Wilson", room: "Room 101" },
    "9:00 AM - 10:00 AM": { subject: "English", teacher: "Ms. Lee", room: "Room 105" },
    "10:00 AM - 11:00 AM": { subject: "Physics", teacher: "Mr. Chen", room: "Room 102" },
    "2:00 PM - 3:00 PM": { subject: "Chemistry", teacher: "Mrs. Taylor", room: "Room 103" },
  },
  Tuesday: {
    "8:00 AM - 9:00 AM": { subject: "English", teacher: "Ms. Lee", room: "Room 105" },
    "9:00 AM - 10:00 AM": { subject: "Mathematics", teacher: "Dr. Wilson", room: "Room 101" },
    "11:00 AM - 12:00 PM": { subject: "Biology", teacher: "Dr. Wilson", room: "Room 104" },
  },
  Wednesday: {
    "8:00 AM - 9:00 AM": { subject: "Physics", teacher: "Mr. Chen", room: "Room 102" },
    "10:00 AM - 11:00 AM": { subject: "Mathematics", teacher: "Dr. Wilson", room: "Room 101" },
    "2:00 PM - 3:00 PM": { subject: "English", teacher: "Ms. Lee", room: "Room 105" },
  },
  Thursday: {
    "8:00 AM - 9:00 AM": { subject: "Chemistry", teacher: "Mrs. Taylor", room: "Room 103" },
    "9:00 AM - 10:00 AM": { subject: "Physics", teacher: "Mr. Chen", room: "Room 102" },
    "11:00 AM - 12:00 PM": { subject: "Mathematics", teacher: "Dr. Wilson", room: "Room 101" },
  },
  Friday: {
    "8:00 AM - 9:00 AM": { subject: "Mathematics", teacher: "Dr. Wilson", room: "Room 101" },
    "9:00 AM - 10:00 AM": { subject: "English", teacher: "Ms. Lee", room: "Room 105" },
    "10:00 AM - 11:00 AM": { subject: "Biology", teacher: "Dr. Wilson", room: "Room 104" },
  },
};

export default function StudentSchedulePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">My Schedule</h2>
        <p className="text-muted-foreground">Your weekly class timetable</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Class 10-A Timetable
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
                              <p className="text-muted-foreground text-xs">
                                {classInfo.teacher}
                              </p>
                              <p className="text-muted-foreground text-xs">
                                {classInfo.room}
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
