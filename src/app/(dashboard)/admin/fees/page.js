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
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, DollarSign, CheckCircle, Clock } from "lucide-react";

const initialFees = [
  { id: 1, student: "John Smith", class: "10-A", feeType: "Tuition", amount: 500, paid: true, dueDate: "2024-01-15" },
  { id: 2, student: "Sarah Johnson", class: "10-A", feeType: "Tuition", amount: 500, paid: false, dueDate: "2024-01-15" },
  { id: 3, student: "Mike Davis", class: "9-B", feeType: "Library", amount: 50, paid: true, dueDate: "2024-01-20" },
  { id: 4, student: "Emily Brown", class: "8-A", feeType: "Lab", amount: 100, paid: false, dueDate: "2024-01-20" },
];

export default function FeesPage() {
  const [fees, setFees] = useState(initialFees);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newFee, setNewFee] = useState({
    student: "",
    class: "",
    feeType: "",
    amount: "",
    dueDate: "",
  });

  const filteredFees = fees.filter(
    (f) =>
      f.student.toLowerCase().includes(search.toLowerCase()) ||
      f.feeType.toLowerCase().includes(search.toLowerCase())
  );

  const totalRevenue = fees.reduce((sum, f) => sum + (f.paid ? f.amount : 0), 0);
  const pendingAmount = fees.reduce((sum, f) => sum + (!f.paid ? f.amount : 0), 0);
  const paidCount = fees.filter((f) => f.paid).length;

  const handleAddFee = () => {
    if (newFee.student && newFee.feeType && newFee.amount) {
      setFees([
        ...fees,
        { id: Date.now(), ...newFee, amount: parseFloat(newFee.amount), paid: false },
      ]);
      setNewFee({ student: "", class: "", feeType: "", amount: "", dueDate: "" });
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Fees</h2>
          <p className="text-muted-foreground">Manage fee collections and payments</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Fee
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Fee</DialogTitle>
              <DialogDescription>Create a new fee record.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Student Name</Label>
                <Input value={newFee.student} onChange={(e) => setNewFee({ ...newFee, student: e.target.value })} placeholder="Enter student name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Fee Type</Label>
                  <Select value={newFee.feeType} onValueChange={(v) => setNewFee({ ...newFee, feeType: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tuition">Tuition</SelectItem>
                      <SelectItem value="Library">Library</SelectItem>
                      <SelectItem value="Lab">Lab</SelectItem>
                      <SelectItem value="Sports">Sports</SelectItem>
                      <SelectItem value="Transport">Transport</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Amount ($)</Label>
                  <Input type="number" value={newFee.amount} onChange={(e) => setNewFee({ ...newFee, amount: e.target.value })} placeholder="0.00" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Due Date</Label>
                <Input type="date" value={newFee.dueDate} onChange={(e) => setNewFee({ ...newFee, dueDate: e.target.value })} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddFee}>Add Fee</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">${totalRevenue}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">${pendingAmount}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Paid</p>
                <p className="text-2xl font-bold">{paidCount}/{fees.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search fees..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFees.map((fee) => (
                <TableRow key={fee.id}>
                  <TableCell className="font-medium">{fee.student}</TableCell>
                  <TableCell>{fee.class}</TableCell>
                  <TableCell>{fee.feeType}</TableCell>
                  <TableCell>${fee.amount}</TableCell>
                  <TableCell>{fee.dueDate}</TableCell>
                  <TableCell>
                    <Badge variant={fee.paid ? "default" : "destructive"}>
                      {fee.paid ? "Paid" : "Pending"}
                    </Badge>
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
