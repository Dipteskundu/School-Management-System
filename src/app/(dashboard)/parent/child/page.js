import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ChildProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Child Profile</h2>
        <p className="text-muted-foreground">Detailed information about your child</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold">
                  JS
                </div>
                <div>
                  <p className="font-medium text-xl">John Smith</p>
                  <p className="text-muted-foreground">Student ID: STU-2024-001</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Date of Birth</p>
                  <p className="font-medium">May 15, 2008</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gender</p>
                  <p className="font-medium">Male</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Blood Group</p>
                  <p className="font-medium">O+</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">+1 234 567 890</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">123 Main Street, City, Country</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Academic Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Class</p>
                  <p className="font-medium">10-A</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Roll Number</p>
                  <p className="font-medium">1</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Admission Date</p>
                  <p className="font-medium">April 1, 2023</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Academic Year</p>
                  <p className="font-medium">2024</p>
                </div>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">Current Subjects</p>
                <div className="flex flex-wrap gap-2">
                  {["Mathematics", "English", "Physics", "Chemistry", "Biology", "History"].map((subject) => (
                    <Badge key={subject} variant="secondary">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">Class Teacher</p>
                <p className="font-medium">Dr. Robert Wilson</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
