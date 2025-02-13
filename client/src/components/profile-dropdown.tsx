import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ProfileSection from "@/components/wardrobe/profile-section";
import { User2, Settings, LogOut } from "lucide-react";

export default function ProfileDropdown() {
  const { user, logoutMutation } = useAuth();

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <User2 className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem className="font-medium flex items-center gap-2">
            <User2 className="h-4 w-4" />
            {user?.nickname || user?.username}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Profile Settings
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem 
            onClick={() => logoutMutation.mutate()}
            className="flex items-center gap-2 text-red-500"
          >
            <LogOut className="h-4 w-4" />
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