import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface DepartmentCardProps {
  name: string;
  icon: LucideIcon;
  onClick: () => void;
  description?: string;
}

export function DepartmentCard({ name, icon: Icon, onClick, description }: DepartmentCardProps) {
  return (
    <Card 
      className="cursor-pointer transition-all duration-200 hover:shadow-medium hover:scale-105 border-2 hover:border-primary/20" 
      onClick={onClick}
    >
      <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
        <div className="bg-gradient-to-br from-icici-orange to-primary text-primary-foreground rounded-full p-6">
          <Icon className="h-8 w-8" />
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-lg text-foreground">{name}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}