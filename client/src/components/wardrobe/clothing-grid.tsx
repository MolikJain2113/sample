import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Clothing } from "@shared/schema";
import { Loader2 } from "lucide-react";

export default function ClothingGrid() {
  const { data: clothes, isLoading } = useQuery<Clothing[]>({
    queryKey: ["/api/clothes"],
  });

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!clothes?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No clothes added yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {clothes.map((item) => (
        <Card key={item.id}>
          <CardContent className="p-2">
            <div className="aspect-square relative overflow-hidden rounded-md">
              <img
                src={item.imageUrl}
                alt={`${item.category} - ${item.color}`}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="mt-2 space-y-1">
              <p className="text-sm font-medium">{item.category}</p>
              <p className="text-xs text-muted-foreground">{item.brand}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
