import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Sun, CloudRain } from "lucide-react";

type WeatherData = {
  temp: number;
  condition: string;
};

export default function WeatherWidget() {
  const { data: weather } = useQuery<WeatherData>({
    queryKey: ["weather"],
    queryFn: async () => {
      // For demo purposes, return mock weather data
      return {
        temp: 22,
        condition: "cloudy",
      };
    },
  });

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="h-8 w-8" />;
      case "rainy":
        return <CloudRain className="h-8 w-8" />;
      default:
        return <Cloud className="h-8 w-8" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {weather && getWeatherIcon(weather.condition)}
            <div>
              <p className="text-2xl font-bold">{weather?.temp}°C</p>
              <p className="text-sm text-muted-foreground capitalize">
                {weather?.condition}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
