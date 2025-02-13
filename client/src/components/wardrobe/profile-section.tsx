import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function ProfileSection() {
  const { user } = useAuth();
  const { toast } = useToast();

  const updateProfileMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("PUT", "/api/profile", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData);
            updateProfileMutation.mutate(data);
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label>Nickname</Label>
            <Input
              name="nickname"
              defaultValue={user?.nickname}
              placeholder="Your nickname"
            />
          </div>

          <div className="space-y-2">
            <Label>Body Type</Label>
            <Select name="bodyType" defaultValue={user?.bodyType}>
              <SelectTrigger>
                <SelectValue placeholder="Select body type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inverted-triangle">Inverted Triangle</SelectItem>
                <SelectItem value="rectangle">Rectangle</SelectItem>
                <SelectItem value="triangle">Triangle</SelectItem>
                <SelectItem value="round">Round</SelectItem>
                <SelectItem value="unsure">I'm not sure</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Color Palette</Label>
            <Select name="colorPalette" defaultValue={user?.colorPalette}>
              <SelectTrigger>
                <SelectValue placeholder="Select color palette" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="warm-bright">Warm Bright</SelectItem>
                <SelectItem value="cool-soft">Cool Soft</SelectItem>
                <SelectItem value="warm-deep">Warm Deep</SelectItem>
                <SelectItem value="cool-vivid">Cool Vivid</SelectItem>
                <SelectItem value="unsure">I'm not sure</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={updateProfileMutation.isPending}
          >
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
