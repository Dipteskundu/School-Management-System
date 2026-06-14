import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, CheckCircle, Clock } from "lucide-react";

const fees = [
  { id: 1, type: "Tuition", amount: 500, paid: true, paidDate: "2024-01-10", dueDate: "2024-01-15" },
  { id: 2, type: "Library", amount: 50, paid: true, paidDate: "2024-01-12", dueDate: "2024-01-15" },
  { id: 3, type: "Lab", amount: 100, paid: false, paidDate: null, dueDate: "2024-01-20" },
  { id: 4, type: "Sports", amount: 75, paid: false, paidDate: null, dueDate: "2024-01-25" },
];

export default function ParentFeesPage() {
  const totalAmount = fees.reduce((sum, f) => sum + f.amount, 0);
  const paidAmount = fees.filter((f) => f.paid).reduce((sum, f) => sum + f.amount, 0);
  const pendingAmount = totalAmount - paidAmount;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Child&apos;s Fees</h2>
        <p className="text-muted-foreground">Fee status and payment history</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Fees</p>
                <p className="text-2xl font-bold">${totalAmount}</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Paid</p>
                <p className="text-2xl font-bold text-green-600">${paidAmount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">${pendingAmount}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fee Details - John Smith</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-3 text-left bg-muted">Type</th>
                  <th className="border p-3 text-center bg-muted">Amount</th>
                  <th className="border p-3 text-center bg-muted">Due Date</th>
                  <th className="border p-3 text-center bg-muted">Paid Date</th>
                  <th className="border p-3 text-center bg-muted">Status</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((fee) => (
                  <tr key={fee.id}>
                    <td className="border p-3 font-medium">{fee.type}</td>
                    <td className="border p-3 text-center">${fee.amount}</td>
                    <td className="border p-3 text-center">{fee.dueDate}</td>
                    <td className="border p-3 text-center">{fee.paidDate || "-"}</td>
                    <td className="border p-3 text-center">
                      <Badge variant={fee.paid ? "default" : "destructive"}>
                        {fee.paid ? "Paid" : "Pending"}
                      </Badge>
                    </td>
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
