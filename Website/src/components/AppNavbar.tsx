import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { CircleUserRound, Menu } from "lucide-react";
import { Card } from "./ui/card";
import { ThemeToggle } from "./ui/ThemeProvider";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { SignoutButton } from "./SignoutButton";
import { useAuthDialog } from "../hooks/useLoginDialog";
import { useUser } from "../contexts/AuthContext";
import { useEffect } from "react";

function MenuDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="ml-2">
          <CircleUserRound />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <ThemeToggle className="w-full" />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SignoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function HomeButton() {
  const { user } = useUser();

  return (
    <ul className="hidden md:flex items-center gap-10 text-card-foreground">
      <li className="text-primary font-medium">
        <Link to={user ? "/app" : "/"}>Home</Link>
      </li>
    </ul>
  );
}

export default function AppNavbar() {
  const { user } = useUser();
  const navigate = useNavigate();
  const { onOpen, setTitle } = useAuthDialog();

  useEffect(() => {
    if (user) {
      navigate("/app");
    }
  }, [user]);

  return (
    <Card className="container bg-card py-3 px-4 border-0 flex items-center justify-between gap-6 rounded-2xl mt-5">
      {user ? (
        <div className="flex flex-grow justify-between">
          <h1 className="text-xl content-center">
            {import.meta.env.VITE_APP_NAME}
          </h1>

          <MenuDropdown />
        </div>
      ) : (
        <div className="flex justify-between grow">
          <HomeButton />
          <div className="flex">
            <Button
              variant="secondary"
              className="hidden md:block ml-2 mr-2"
              onClick={() => {
                setTitle("Login");
                onOpen();
              }}
            >
              Login
            </Button>
            <Button
              className="hidden md:block ml-2 mr-2"
              onClick={() => {
                setTitle("Signup");
                onOpen();
              }}
            >
              Get Started
            </Button>
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-5 w-5 rotate-0 scale-100" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link to="/">Home</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button
                      variant="secondary"
                      className="w-full text-sm"
                      onClick={() => {
                        setTitle("Login");
                        onOpen();
                      }}
                    >
                      Login
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button
                      className="w-full text-sm"
                      onClick={() => {
                        setTitle("Signup");
                        onOpen();
                      }}
                    >
                      Get Started
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
