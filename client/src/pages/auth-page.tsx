import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { insertUserSchema } from "@shared/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Redirect } from "wouter";
import { Loader2, Shirt } from "lucide-react";

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const { toast } = useToast();

  const loginForm = useForm({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 p-8 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Shirt className="h-6 w-6" /> 
              Welcome to Wardrobe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form
                  onSubmit={loginForm.handleSubmit((data) => loginMutation.mutate(data))}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" {...loginForm.register("username")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" id="password" {...loginForm.register("password")} />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Login
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form
                  onSubmit={registerForm.handleSubmit((data) => registerMutation.mutate(data))}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="reg-username">Username</Label>
                    <Input id="reg-username" {...registerForm.register("username")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Password</Label>
                    <Input
                      type="password"
                      id="reg-password"
                      {...registerForm.register("password")}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={registerMutation.isPending}
                  >
                    {registerMutation.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Register
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      <div className="hidden lg:block flex-1 bg-muted relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIG9wYWNpdHk9IjAuMDUiPgo8cGF0aCBkPSJNMTY2LjY2NyAxMDBDMTY2LjY2NyAxMzYuODE5IDEzNi44MTkgMTY2LjY2NyAxMDAgMTY2LjY2N0M2My4xODEgMTY2LjY2NyAzMy4zMzMzIDEzNi44MTkgMzMuMzMzMyAxMDBDMzMuMzMzMyA2My4xODEgNjMuMTgxIDMzLjMzMzMgMTAwIDMzLjMzMzNDMTM2LjgxOSAzMy4zMzMzIDE2Ni42NjcgNjMuMTgxIDE2Ni42NjcgMTAwWiIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiLz4KPHBhdGggZD0iTTEwMCAxMzMuMzMzQzExOC40MDkgMTMzLjMzMyAxMzMuMzMzIDExOC40MDkgMTMzLjMzMyAxMDBDMTMzLjMzMyA4MS41OTA1IDExOC40MDkgNjYuNjY2NyAxMDAgNjYuNjY2N0M4MS41OTA1IDY2LjY2NjcgNjYuNjY2NyA4MS41OTA1IDY2LjY2NjcgMTAwQzY2LjY2NjcgMTE4LjQwOSA4MS41OTA1IDEzMy4zMzMgMTAwIDEzMy4zMzNaIiBzdHJva2U9ImN1cnJlbnRDb2xvciIvPgo8L2c+Cjwvc3ZnPg==')] bg-repeat opacity-50"></div>
        </div>
        <div className="relative h-full flex items-center justify-center p-8">
          <div className="max-w-md space-y-4 text-center">
            <div className="flex justify-center">
              <div className="rounded-full bg-primary/10 p-4">
                <Shirt className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-primary">Your Personal Stylist</h1>
            <p className="text-lg text-muted-foreground">
              Manage your wardrobe digitally, get outfit recommendations, and track your style journey
              all in one place.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="space-y-2 text-center">
                <h3 className="text-2xl font-bold">Organize</h3>
                <p className="text-sm text-muted-foreground">
                  Keep track of your entire wardrobe digitally
                </p>
              </div>
              <div className="space-y-2 text-center">
                <h3 className="text-2xl font-bold">Style</h3>
                <p className="text-sm text-muted-foreground">
                  Get personalized outfit recommendations
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}