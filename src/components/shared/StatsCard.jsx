import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function StatsCard({ title, value, icon: Icon, description, className }) {
  return (
    <Card className={cn("transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover-lift", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
          {Icon && (
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:rotate-6">
              <Icon className="h-6 w-6 text-primary" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
