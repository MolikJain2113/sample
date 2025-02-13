import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import ClothingGrid from "@/components/wardrobe/clothing-grid";
import ClothingUpload from "@/components/wardrobe/clothing-upload";
import ProfileSection from "@/components/wardrobe/profile-section";
import WeatherWidget from "@/components/weather-widget";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export default function HomePage() {
  const { logoutMutation } = useAuth();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Wardrobe</h1>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="outline" onClick={() => logoutMutation.mutate()}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <ClothingGrid />
            <div className="flex justify-center py-4">
              <ClothingUpload />
            </div>
          </div>

          <div className="space-y-8">
            <WeatherWidget />
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
            <ProfileSection />
          </div>
        </div>
      </main>
    </div>
  );
}