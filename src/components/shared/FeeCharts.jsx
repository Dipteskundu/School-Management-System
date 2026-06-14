"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FeeCollectionChart({ fees }) {
  const feeTypes = {};
  fees.forEach((fee) => {
    if (!feeTypes[fee.feeType]) {
      feeTypes[fee.feeType] = { paid: 0, pending: 0 };
    }
    if (fee.paid) {
      feeTypes[fee.feeType].paid += fee.amount;
    } else {
      feeTypes[fee.feeType].pending += fee.amount;
    }
  });

  const categories = Object.keys(feeTypes);
  const maxValue = Math.max(
    ...categories.map((cat) => feeTypes[cat].paid + feeTypes[cat].pending)
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Fee Collection by Type</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map((category) => {
            const paid = feeTypes[category].paid;
            const pending = feeTypes[category].pending;
            const total = paid + pending;
            const paidPercent = (paid / maxValue) * 100;
            const pendingPercent = (pending / maxValue) * 100;

            return (
              <div key={category} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{category}</span>
                  <span className="text-muted-foreground">${total}</span>
                </div>
                <div className="flex h-3 rounded-full overflow-hidden bg-muted">
                  <div
                    className="bg-green-500 transition-all duration-500"
                    style={{ width: `${paidPercent}%` }}
                  />
                  <div
                    className="bg-yellow-500 transition-all duration-500"
                    style={{ width: `${pendingPercent}%` }}
                  />
                </div>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    Paid: ${paid}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-yellow-500" />
                    Pending: ${pending}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export function PaymentStatusChart({ fees }) {
  const paid = fees.filter((f) => f.paid).length;
  const pending = fees.filter((f) => !f.paid).length;
  const total = fees.length;
  
  const paidPercent = total > 0 ? (paid / total) * 100 : 0;
  const pendingPercent = total > 0 ? (pending / total) * 100 : 0;
  
  const radius = 70;
  const strokeWidth = 20;
  const circumference = 2 * Math.PI * radius;
  const paidDash = (paidPercent / 100) * circumference;
  const pendingDash = (pendingPercent / 100) * circumference;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Payment Status</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative">
          <svg width="180" height="180" viewBox="0 0 180 180">
            <circle
              cx="90"
              cy="90"
              r={radius}
              fill="transparent"
              stroke="hsl(var(--muted))"
              strokeWidth={strokeWidth}
            />
            <circle
              cx="90"
              cy="90"
              r={radius}
              fill="transparent"
              stroke="#22c55e"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={circumference - paidDash}
              transform="rotate(-90 90 90)"
              className="transition-all duration-700 ease-out"
            />
            <circle
              cx="90"
              cy="90"
              r={radius}
              fill="transparent"
              stroke="#eab308"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={circumference - pendingDash}
              transform={`rotate(${(paidPercent / 100) * 360 - 90} 90 90)`}
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">{total}</span>
            <span className="text-sm text-muted-foreground">Total</span>
          </div>
        </div>
        <div className="flex gap-6 mt-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm">Paid ({paid})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="text-sm">Pending ({pending})</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function MonthlyTrendChart({ fees }) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const monthlyData = months.map((month, index) => {
    const monthFees = fees.filter((f) => {
      const dueDate = new Date(f.dueDate);
      return dueDate.getMonth() === index;
    });
    const collected = monthFees
      .filter((f) => f.paid)
      .reduce((sum, f) => sum + f.amount, 0);
    const pending = monthFees
      .filter((f) => !f.paid)
      .reduce((sum, f) => sum + f.amount, 0);
    return { month, collected, pending };
  });

  const maxValue = Math.max(
    ...monthlyData.map((d) => d.collected + d.pending),
    1
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Monthly Fee Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between gap-2 h-48">
          {monthlyData.map((data) => {
            const collectedHeight = (data.collected / maxValue) * 100;
            const pendingHeight = (data.pending / maxValue) * 100;
            
            return (
              <div key={data.month} className="flex flex-col items-center flex-1">
                <div className="w-full flex flex-col items-center gap-1" style={{ height: "140px" }}>
                  <div className="w-full flex flex-col justify-end" style={{ height: "100%" }}>
                    {data.pending > 0 && (
                      <div
                        className="w-full bg-yellow-500 rounded-t transition-all duration-500"
                        style={{ height: `${pendingHeight}%` }}
                      />
                    )}
                    {data.collected > 0 && (
                      <div
                        className="w-full bg-green-500 transition-all duration-500"
                        style={{ 
                          height: `${collectedHeight}%`,
                          borderRadius: data.pending === 0 ? "0.25rem 0.25rem 0 0" : "0"
                        }}
                      />
                    )}
                    {data.collected === 0 && data.pending === 0 && (
                      <div className="w-full bg-muted rounded h-1" />
                    )}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground mt-2">{data.month}</span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-green-500" />
            <span className="text-sm text-muted-foreground">Collected</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-yellow-500" />
            <span className="text-sm text-muted-foreground">Pending</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
