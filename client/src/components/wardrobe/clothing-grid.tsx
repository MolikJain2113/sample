import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Clothing } from "@shared/schema";
import { Loader2, Shirt } from "lucide-react";

export default function ClothingGrid() {
  const { data: clothes, isLoading } = useQuery<Clothing[]>({
    queryKey: ["/api/clothes"],
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!clothes?.length) {
    return (
      <div className="text-center py-12 border rounded-lg bg-card">
        <Shirt className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-lg font-medium mb-2">No clothes added yet</p>
        <p className="text-sm text-muted-foreground">
          Start building your digital wardrobe by adding your first item
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {clothes.map((item) => (
        <Card key={item.id} className="group hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-2">
            <div className="aspect-square relative overflow-hidden rounded-md bg-muted">
              <img
                src={item.imageUrl}
                alt={`${item.category} - ${item.color}`}
                className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div className="mt-2 space-y-1">
              <p className="text-sm font-medium capitalize">{item.category}</p>
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color?.toLowerCase() }}
                />
                <p className="text-xs text-muted-foreground capitalize">
                  {item.brand || 'Unbranded'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}