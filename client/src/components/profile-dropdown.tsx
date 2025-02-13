import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ProfileSection from "@/components/wardrobe/profile-section";
import { User2 } from "lucide-react";

export default function ProfileDropdown() {
  const { user, logoutMutation } = useAuth();

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <User2 className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="font-medium">
            {user?.nickname || user?.username}
          </DropdownMenuItem>
          <DialogTrigger asChild>
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem onClick={() => logoutMutation.mutate()}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Profile Settings</DialogTitle>
        </DialogHeader>
        <ProfileSection />
      </DialogContent>
    </Dialog>
  );
}
