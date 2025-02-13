import { Button } from "@/components/ui/button";
import ClothingGrid from "@/components/wardrobe/clothing-grid";
import ClothingUpload from "@/components/wardrobe/clothing-upload";
import WeatherWidget from "@/components/weather-widget";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Moon, Sun, Shirt, ShoppingBag, Palette } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import ProfileDropdown from "@/components/profile-dropdown";

export default function HomePage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]" />

      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Wardrobe</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <ProfileDropdown />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3 mb-4">
            <Shirt className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Your Digital Wardrobe</h2>
          <p className="text-muted-foreground">Organize, plan, and style your outfits with ease</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
                <Shirt className="h-8 w-8 mb-2 text-primary" />
                <h3 className="font-medium">Wardrobe Items</h3>
                <p className="text-sm text-muted-foreground">Track your clothing collection</p>
              </div>
              <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
                <Palette className="h-8 w-8 mb-2 text-primary" />
                <h3 className="font-medium">Style Analytics</h3>
                <p className="text-sm text-muted-foreground">Understand your style preferences</p>
              </div>
              <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
                <ShoppingBag className="h-8 w-8 mb-2 text-primary" />
                <h3 className="font-medium">Outfit Planning</h3>
                <p className="text-sm text-muted-foreground">Create perfect combinations</p>
              </div>
            </div>

            <ClothingGrid />
            <div className="flex justify-center py-4">
              <ClothingUpload />
            </div>
          </div>

          <div className="space-y-8">
            <WeatherWidget />
            <div className="p-4 bg-card rounded-lg border shadow-sm">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="w-full"
                classNames={{
                  months: "space-y-2",
                  month: "space-y-2",
                  caption: "flex justify-center pt-1 relative items-center mb-2",
                  caption_label: "text-sm font-medium",
                  nav: "flex items-center",
                  nav_button: "h-7 w-7 bg-transparent hover:bg-muted rounded-md flex items-center justify-center",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  table: "w-full border-collapse",
                  head_row: "grid grid-cols-7 mb-1",
                  head_cell: "text-muted-foreground text-[0.8rem] font-medium text-center",
                  row: "grid grid-cols-7",
                  cell: "h-8 w-8 text-center text-sm relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 p-0",
                  day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100 hover:bg-muted rounded-md flex items-center justify-center",
                  day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  day_today: "bg-accent text-accent-foreground",
                  day_outside: "text-muted-foreground opacity-50",
                  day_disabled: "text-muted-foreground opacity-50",
                  day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                  day_hidden: "invisible",
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}