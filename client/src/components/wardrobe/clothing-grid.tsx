import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Clothing } from "@shared/schema";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function ClothingGrid() {
  const { data: clothes, isLoading } = useQuery<Clothing[]>({
    queryKey: ["/api/clothes"],
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!clothes?.length) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <p className="text-muted-foreground text-lg">No clothes added yet.</p>
        <p className="text-sm text-muted-foreground mt-2">
          Click the "Add to Wardrobe" button to get started.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
    >
      {clothes.map((item) => (
        <motion.div
          key={item.id}
          variants={item}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Card className="overflow-hidden bg-card hover:shadow-lg transition-shadow">
            <CardContent className="p-2">
              <div className="aspect-square relative overflow-hidden rounded-md">
                <img
                  src={item.imageUrl}
                  alt={`${item.category} - ${item.color}`}
                  className="object-cover w-full h-full transform transition-transform hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <p className="text-sm font-medium">{item.category}</p>
                    <p className="text-xs opacity-90">{item.brand}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}